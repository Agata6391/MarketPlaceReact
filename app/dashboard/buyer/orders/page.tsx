// app/dashboard/buyer/orders/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { BUYER_NAV } from "@/components/dashboard/shared/navConfigs";
import { OrdersManager } from "@/components/dashboard/shared/OrdersManager";
import "@/styles/dashboard/dashboard.css";

export default async function BuyerOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={BUYER_NAV} title="My Account" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">My Orders</h1>
            <p className="dashboard__topbar-subtitle">Historial completo de tus compras</p>
          </div>
        </div>

        <div className="dashboard__content">
          <OrdersManager role="buyer" />
        </div>
      </div>
    </div>
  );
}
