// app/dashboard/vendor/purchases/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { OrdersManager } from "@/components/dashboard/shared/OrdersManager";
import "@/styles/pages/dashboard.css";

const VENDOR_NAV = [
  { label: "Overview",   href: "/dashboard/vendor",            icon: "📊" },
  { label: "Services",   href: "/dashboard/vendor/services",   icon: "🛠️" },
  { label: "Orders",     href: "/dashboard/vendor/orders",     icon: "📦" },
  { label: "Purchases",  href: "/dashboard/vendor/purchases",  icon: "🛒" },
];

export default async function VendorPurchasesPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!session || (user.role !== "vendor" && user.role !== "admin")) redirect("/");

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={VENDOR_NAV} title="Vendor Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <h1 className="dashboard__topbar-title">🛒 Mis Compras</h1>
        </div>

        <div className="dashboard__content">
          <p style={{ color: "var(--color-text-2)", fontSize: "0.9rem", marginBottom: 24 }}>
            Servicios que has contratado como comprador. Puedes revisar avances y confirmar entregas desde aquí.
          </p>
          <OrdersManager role="vendor" asBuyer={true} />
        </div>
      </div>
    </div>
  );
}
