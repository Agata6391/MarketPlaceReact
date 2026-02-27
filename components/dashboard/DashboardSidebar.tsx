"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import "@/styles/pages/dashboard.css";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  title?: string;
}

export function DashboardSidebar({ navItems, title = "Dashboard" }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as any;

  return (
    <aside className="dashboard__sidebar">
      <div className="dashboard__logo">
        <Link href="/">Skill<span>ora</span></Link>
      </div>

      <p className="dashboard__nav-label" style={{ paddingLeft: 24 }}>{title}</p>

      <nav className="dashboard__nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`dashboard__nav-item ${pathname === item.href ? "dashboard__nav-item--active" : ""}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <button
            className="dashboard__nav-item"
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{ width: "100%", color: "var(--color-accent)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </nav>

      {user && (
        <div className="dashboard__sidebar-footer">
          <div className="dashboard__sidebar-avatar">
            {user.image
              ? <Image src={user.image} alt={user.name ?? ""} width={36} height={36} />
              : (user.name?.[0] ?? "U").toUpperCase()
            }
          </div>
          <div>
            <p className="dashboard__sidebar-user-name">{user.name}</p>
            <p className="dashboard__sidebar-user-role">{user.role}</p>
          </div>
        </div>
      )}
    </aside>
  );
}
