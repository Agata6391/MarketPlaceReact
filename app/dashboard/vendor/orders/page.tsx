// app/dashboard/vendor/orders/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { VENDOR_NAV } from "@/components/dashboard/shared/navConfigs";
import { OrdersManager } from "@/components/dashboard/shared/OrdersManager";
import "@/styles/dashboard/dashboard.css";

export default async function VendorOrdersPage() {
  const session = await getServerSession(authOptions);
  const user    = session?.user as any;
  if (!session || (user.role !== "vendor" && user.role !== "admin")) redirect("/");

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={VENDOR_NAV} title="Vendor Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Orders Received</h1>
            <p className="dashboard__topbar-subtitle">Trabajos que te han encargado</p>
          </div>
        </div>

        <div className="dashboard__content">
          <OrdersManager role="vendor" />
        </div>
      </div>
    </div>
  );
}
