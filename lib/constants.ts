// Shared role-to-paths mapping used in both middleware and sidebar
export const ROLE_PATHS: Record<string, string[]> = {
  admin: ["/dashboard/registration", "/dashboard/visitor-list", "/dashboard/security-list", "/dashboard/report"],
  guard: ["/dashboard/registration", "/dashboard/visitor-list"],
  manager: ["/dashboard/security-list", "/dashboard/report"],
};
