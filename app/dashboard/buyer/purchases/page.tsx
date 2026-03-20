// app/dashboard/buyer/purchases/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { OrdersManager } from "@/components/dashboard/shared/OrdersManager";
import "@/styles/pages/dashboard.css";

const BUYER_NAV = [
  { label: "Overview",   href: "/dashboard/buyer",            icon: "📊" },
  { label: "Purchases",  href: "/dashboard/buyer/purchases",  icon: "📦" },
  { label: "Reviews",    href: "/dashboard/buyer/reviews",    icon: "⭐" },
];

export default async function BuyerPurchasesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={BUYER_NAV} title="My Account" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <h1 className="dashboard__topbar-title">📦 Mis Compras</h1>
        </div>

        <div className="dashboard__content">
          <p style={{ color: "var(--color-text-2)", fontSize: "0.9rem", marginBottom: 24 }}>
            Aquí puedes ver el estado de todos tus pedidos, revisar los avances que comparte el vendor y confirmar la entrega cuando estés satisfecho con el trabajo.
          </p>
          <OrdersManager role="buyer" />
        </div>
      </div>
    </div>
  );
}
