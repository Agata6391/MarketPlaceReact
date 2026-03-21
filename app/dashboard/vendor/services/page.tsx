// app/dashboard/vendor/services/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { VENDOR_NAV } from "@/components/dashboard/shared/navConfigs";
import { VendorServicesManager } from "@/components/dashboard/vendor/VendorServicesManager";
import "@/styles/dashboard/dashboard.css";

export default async function VendorServicesPage() {
  const session = await getServerSession(authOptions);
  const user    = session?.user as any;
  if (!session || (user.role !== "vendor" && user.role !== "admin")) redirect("/");

  const userId = user.id ?? user.sub;

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={VENDOR_NAV} title="Vendor Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">My Services</h1>
            <p className="dashboard__topbar-subtitle">Gestiona y publica tus servicios</p>
          </div>
        </div>

        <div className="dashboard__content">
          <VendorServicesManager vendorId={userId} />
        </div>
      </div>
    </div>
  );
}
