import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { OrderModel } from "@/models/Order";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { VendorServicesManager } from "@/components/dashboard/vendor/VendorServicesManager";
import "@/styles/pages/dashboard.css";

const VENDOR_NAV = [
  { label: "Overview",  href: "/dashboard/vendor",          icon: "📊" },
  { label: "Services",  href: "/dashboard/vendor/services", icon: "🛠️" },
  { label: "Orders",    href: "/dashboard/vendor/orders",   icon: "📦" },
];

export default async function VendorDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = session.user as any;
  if (user.role === "buyer") redirect("/dashboard/buyer");

  await connectDB();

  const [services, orders] = await Promise.all([
    ServiceModel.countDocuments({ vendor: user.id, isActive: true }),
    OrderModel.countDocuments({ vendor: user.id }),
  ]);

  const revenue = await OrderModel.aggregate([
    { $match: { vendor: user.id, status: { $in: ["paid", "completed"] } } },
    { $group: { _id: null, total: { $sum: "$tierPrice" } } },
  ]);

  const stats = {
    services,
    orders,
    revenue: revenue[0]?.total ?? 0,
  };

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={VENDOR_NAV} title="Vendor Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <h1 className="dashboard__topbar-title">My Services</h1>
        </div>

        <div className="dashboard__content">
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-card__label">Active Services</p>
              <p className="stat-card__value">{stats.services}</p>
              <span className="stat-card__icon">🛠️</span>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Total Orders</p>
              <p className="stat-card__value">{stats.orders}</p>
              <span className="stat-card__icon">📦</span>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Earnings</p>
              <p className="stat-card__value">${(stats.revenue / 100).toLocaleString()}</p>
              <span className="stat-card__icon">💰</span>
            </div>
          </div>

          <VendorServicesManager vendorId={user.id} />
        </div>
      </div>
    </div>
  );
}
