// app/dashboard/admin/orders/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { OrdersManager } from "@/components/dashboard/shared/OrdersManager";
import "@/styles/pages/dashboard.css";

const ADMIN_NAV = [
  { label: "Overview",  href: "/dashboard/admin",          icon: "📊" },
  { label: "Services",  href: "/dashboard/admin/services", icon: "🛠️" },
  { label: "Users",     href: "/dashboard/admin/users",    icon: "👥" },
  { label: "Orders",    href: "/dashboard/admin/orders",   icon: "📦" },
];

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") redirect("/");

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={ADMIN_NAV} title="Admin Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <h1 className="dashboard__topbar-title">📦 Gestión de Órdenes</h1>
        </div>

        <div className="dashboard__content">
          <p style={{ color: "var(--color-text-2)", fontSize: "0.9rem", marginBottom: 24 }}>
            Visualiza y gestiona todas las órdenes de la plataforma. Puedes cambiar el estado, agregar notas internas y registrar avances.
          </p>
          <OrdersManager role="admin" />
        </div>
      </div>
    </div>
  );
}
