"use client";

// components/dashboard/shared/DashboardSidebar.tsx

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import "@/styles/dashboard/dashboard.css";

export interface NavItem {
  label: string;
  href:  string;
  icon:  string;
  badge?: number;
}

interface Props {
  navItems: NavItem[];
  title:    string;
}

export function DashboardSidebar({ navItems, title }: Props) {
  const pathname           = usePathname();
  const { data: session }  = useSession();
  const user               = session?.user as any;

  return (
    <aside className="dashboard__sidebar">

      {/* Logo */}
      <Link href="/" className="sidebar__logo">
        Skill<span>ora</span>
      </Link>

      {/* Nav */}
      <nav className="sidebar__nav" style={{ paddingTop: "var(--space-4)" }}>
        <p className="sidebar__section-label">{title}</p>

        {navItems.map(item => {
          const isActive = pathname === item.href ||
            (item.href !== `/dashboard/${user?.role}` && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar__link${isActive ? " sidebar__link--active" : ""}`}
            >
              <span className="sidebar__link-icon">{item.icon}</span>
              {item.label}
              {item.badge != null && item.badge > 0 && (
                <span className="sidebar__badge">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        {user && (
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {user.image
                ? <Image src={user.image} alt={user.name ?? ""} width={36} height={36} style={{ objectFit: "cover" }} />
                : (user.name?.[0] ?? "U").toUpperCase()
              }
            </div>
            <div style={{ minWidth: 0 }}>
              <p className="sidebar__user-name">{user.name}</p>
              <p className="sidebar__user-role">{user.role}</p>
            </div>
          </div>
        )}

        <button
          className="sidebar__signout"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
