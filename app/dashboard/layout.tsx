"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import "./dashboard.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <div className="position-fixed top-0 start-0 end-0" style={{ zIndex: 1030 }}>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <div className="d-flex flex-grow-1" style={{ marginTop: '72px', overflow: 'hidden' }}>
        <div style={{ height: '100%', overflow: 'auto' }}>
          <Sidebar isOpen={menuOpen} />
        </div>
        <div className="flex-grow-1 p-3 background" style={{ height: '100%', overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
 