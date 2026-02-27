import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { ServiceModel } from "@/models/Service";
import { OrderModel } from "@/models/Order";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { AdminServicesTable } from "@/components/dashboard/admin/AdminServicesTable";
import "@/styles/pages/dashboard.css";

const ADMIN_NAV = [
  { label: "Overview",  href: "/dashboard/admin",          icon: "📊" },
  { label: "Services",  href: "/dashboard/admin/services", icon: "🛠️" },
  { label: "Users",     href: "/dashboard/admin/users",    icon: "👥" },
  { label: "Orders",    href: "/dashboard/admin/orders",   icon: "📦" },
];

async function getStats() {
  await connectDB();
  const [users, services, orders] = await Promise.all([
    UserModel.countDocuments(),
    ServiceModel.countDocuments({ isActive: true }),
    OrderModel.countDocuments(),
  ]);
  const revenue = await OrderModel.aggregate([
    { $match: { status: { $in: ["paid", "completed"] } } },
    { $group: { _id: null, total: { $sum: "$tierPrice" } } },
  ]);

  return {
    users,
    services,
    orders,
    revenue: revenue[0]?.total ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") redirect("/");

  const stats = await getStats();

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={ADMIN_NAV} title="Admin Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <h1 className="dashboard__topbar-title">Overview</h1>
        </div>

        <div className="dashboard__content">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-card__label">Total Users</p>
              <p className="stat-card__value">{stats.users.toLocaleString()}</p>
              <span className="stat-card__icon">👥</span>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Active Services</p>
              <p className="stat-card__value">{stats.services.toLocaleString()}</p>
              <span className="stat-card__icon">🛠️</span>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Total Orders</p>
              <p className="stat-card__value">{stats.orders.toLocaleString()}</p>
              <span className="stat-card__icon">📦</span>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Revenue</p>
              <p className="stat-card__value">${(stats.revenue / 100).toLocaleString()}</p>
              <span className="stat-card__icon">💰</span>
            </div>
          </div>

          {/* Quick actions */}
          <AdminServicesTable />
        </div>
      </div>
    </div>
  );
}
