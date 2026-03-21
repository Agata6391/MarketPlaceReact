// components/dashboard/shared/navConfigs.ts
// Fuente única de verdad para los navs de cada rol.
// Importa esto en cada page.tsx del dashboard.

import type { NavItem } from "./DashboardSidebar";

export const ADMIN_NAV: NavItem[] = [
  { label: "Overview",   href: "/dashboard/admin",            icon: "📊" },
  { label: "Services",   href: "/dashboard/admin/services",   icon: "🛠️" },
  { label: "Orders",     href: "/dashboard/admin/orders",     icon: "📦" },
  { label: "Users",      href: "/dashboard/admin/users",      icon: "👥" },
  { label: "Reviews",    href: "/dashboard/admin/reviews",    icon: "⭐" },
  { label: "Analytics",  href: "/dashboard/admin/analytics",  icon: "📈" },
];

export const VENDOR_NAV: NavItem[] = [
  { label: "Overview",    href: "/dashboard/vendor",             icon: "📊" },
  { label: "My Services", href: "/dashboard/vendor/services",    icon: "🛠️" },
  { label: "Orders",      href: "/dashboard/vendor/orders",      icon: "📦" },
  { label: "Purchases",   href: "/dashboard/vendor/purchases",   icon: "🛒" },
  { label: "Earnings",    href: "/dashboard/vendor/earnings",    icon: "💰" },
  { label: "Settings",    href: "/dashboard/vendor/settings",    icon: "⚙️" },
];

export const BUYER_NAV: NavItem[] = [
  { label: "Overview",   href: "/dashboard/buyer",             icon: "📊" },
  { label: "My Orders",  href: "/dashboard/buyer/orders",      icon: "📦" },
  { label: "Favorites",  href: "/dashboard/buyer/favorites",   icon: "❤️" },
  { label: "Settings",   href: "/dashboard/buyer/settings",    icon: "⚙️" },
];
