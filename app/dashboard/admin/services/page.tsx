// app/dashboard/admin/services/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { ADMIN_NAV } from "@/components/dashboard/shared/navConfigs";
import { AdminServicesManager } from "@/components/dashboard/admin/AdminServicesManager";
import "@/styles/dashboard/dashboard.css";

export default async function AdminServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") redirect("/");

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={ADMIN_NAV} title="Admin Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Manage Services</h1>
            <p className="dashboard__topbar-subtitle">Todos los servicios de la plataforma</p>
          </div>
        </div>

        <div className="dashboard__content">
          <AdminServicesManager />
        </div>
      </div>
    </div>
  );
}
