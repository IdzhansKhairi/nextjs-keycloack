import NextAuth, { type NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import CredentialsProvider from "next-auth/providers/credentials";
import { createRemoteJWKSet, jwtVerify } from "jose";

const KEYCLOAK_ISSUER = process.env.KEYCLOAK_ISSUER!;   // e.g. http://localhost:8080/realms/myrealm
const KEYCLOAK_ID = process.env.KEYCLOAK_ID!;           // e.g. nextjs-client
const KEYCLOAK_SECRET = process.env.KEYCLOAK_SECRET!;   // omit if public client
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;

// JWKS endpoint (Keycloak exposes a certificate/JWKS endpoint for OIDC).
// You can also read jwks_uri from the realm's .well-known config.
// Keycloak standard: /realms/{realm}/protocol/openid-connect/certs
const JWKS = createRemoteJWKSet(
  new URL(`${KEYCLOAK_ISSUER}/protocol/openid-connect/certs`)
);

// Direct Access Grant (password) exchange against Keycloak’s token endpoint
async function ropcLogin(username: string, password: string) {
  const tokenUrl = `${KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

  const body = new URLSearchParams();
  body.set("grant_type", "password");
  body.set("client_id", KEYCLOAK_ID);
  if (KEYCLOAK_SECRET) body.set("client_secret", KEYCLOAK_SECRET);
  body.set("username", username);
  body.set("password", password);
  body.set("scope", "openid profile email");

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const json = await res.json();

  if (!res.ok) {
    // Typical: invalid_grant when credentials are wrong or Direct Access Grants disabled
    throw new Error(json.error_description || json.error || "login_failed");
  }

  return json as {
    access_token: string;
    id_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    scope?: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Keep Keycloak provider available (useful later; not used by your custom form)
    KeycloakProvider({
      clientId: KEYCLOAK_ID,
      clientSecret: KEYCLOAK_SECRET,
      issuer: KEYCLOAK_ISSUER, // issuer must include /realms/<realm>
    }),
    // Your custom username/password form → Credentials provider → calls ROPC
    CredentialsProvider({
      id: "credentials",
      name: "Username/Password",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.username || !creds?.password) return null;
        try {
          // 1) Ask Keycloak for tokens (password grant)
          const t = await ropcLogin(creds.username, creds.password);

          // 2) VERIFY the ID token signature & claims using JOSE (issuer/audience)
          const { payload } = await jwtVerify(t.id_token, JWKS, {
            issuer: KEYCLOAK_ISSUER,
            audience: KEYCLOAK_ID, // Keycloak sets aud to your clientId
          });

          const roles =
            (payload as any)?.realm_access?.roles ??
            (payload as any)?.roles ??
            [];

          // 3) Return the "user" object used to seed the NextAuth JWT
          return {
            id: (payload as any)?.sub || creds.username,
            name: (payload as any)?.preferred_username || creds.username,
            email: (payload as any)?.email,
            firstName: (payload as any)?.given_name,
            lastName: (payload as any)?.family_name,
            accessToken: t.access_token,
            refreshToken: t.refresh_token,
            idToken: t.id_token,
            expiresIn: t.expires_in,
            roles,
          };
        } catch (e) {
          console.error('Credentials authorize error: ', e)
          return null
        }
        
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
    error: "/unauthorized", // NextAuth error redirection
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.idToken = (user as any).idToken;
        token.roles = (user as any).roles || [];
        token.expiresIn = (user as any).expiresIn;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.email = (user as any).email;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session as any).roles = token.roles || [];
      (session as any).firstName = token.firstName;
      (session as any).lastName = token.lastName;
      (session as any).email = token.email;
      return session;
    },
    async redirect({ url, baseUrl }) {
      try {
        const u = new URL(url, baseUrl);
        if (u.origin === baseUrl) {
          return u.pathname === "/" ? `${baseUrl}/dashboard` : u.toString();
        }
        return `${baseUrl}/dashboard`;
      } catch {
        return `${baseUrl}/dashboard`;
      }
    },
  },

  secret: NEXTAUTH_SECRET,
};

// App Router export style
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };