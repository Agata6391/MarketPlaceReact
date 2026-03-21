// app/dashboard/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { ServiceModel } from "@/models/Service";
import { OrderModel } from "@/models/Order";
import { ReviewModel } from "@/models/Review";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { ADMIN_NAV } from "@/components/dashboard/shared/navConfigs";
import "@/styles/dashboard/dashboard.css";

async function getStats() {
  await connectDB();
  const [users, services, orders, reviews] = await Promise.all([
    UserModel.countDocuments(),
    ServiceModel.countDocuments({ isActive: true }),
    OrderModel.countDocuments(),
    ReviewModel.countDocuments(),
  ]);
  const revenueAgg = await OrderModel.aggregate([
    { $match: { status: { $in: ["paid", "completed"] } } },
    { $group: { _id: null, total: { $sum: "$tierPrice" } } },
  ]);
  const pendingOrders = await OrderModel.countDocuments({ status: { $in: ["paid", "in_progress"] } });
  return {
    users, services, orders, reviews,
    revenue: revenueAgg[0]?.total ?? 0,
    pendingOrders,
  };
}

async function getRecentOrders() {
  await connectDB();
  return OrderModel.find()
    .populate("buyer",   "name email")
    .populate("service", "title")
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();
}

export default async function AdminOverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") redirect("/");

  const [stats, recent] = await Promise.all([getStats(), getRecentOrders()]);

  const STATUS_COLORS: Record<string, string> = {
    pending: "status-badge--pending", paid: "status-badge--paid",
    in_progress: "status-badge--in_progress", delivered: "status-badge--delivered",
    completed: "status-badge--completed", cancelled: "status-badge--cancelled",
  };

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={ADMIN_NAV} title="Admin Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Overview</h1>
            <p className="dashboard__topbar-subtitle">Resumen general de la plataforma</p>
          </div>
        </div>

        <div className="dashboard__content">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card__icon">👥</div>
              <p className="stat-card__label">Usuarios</p>
              <p className="stat-card__value">{stats.users.toLocaleString()}</p>
            </div>
            <div className="stat-card stat-card--green">
              <div className="stat-card__icon">💰</div>
              <p className="stat-card__label">Revenue total</p>
              <p className="stat-card__value">${(stats.revenue / 100).toLocaleString()}</p>
            </div>
            <div className="stat-card stat-card--gold">
              <div className="stat-card__icon">📦</div>
              <p className="stat-card__label">Órdenes activas</p>
              <p className="stat-card__value">{stats.pendingOrders}</p>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">🛠️</div>
              <p className="stat-card__label">Servicios activos</p>
              <p className="stat-card__value">{stats.services.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">⭐</div>
              <p className="stat-card__label">Reseñas</p>
              <p className="stat-card__value">{stats.reviews.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">📦</div>
              <p className="stat-card__label">Órdenes totales</p>
              <p className="stat-card__value">{stats.orders.toLocaleString()}</p>
            </div>
          </div>

          {/* Recent orders */}
          <div className="data-table-wrapper">
            <div className="data-table-header">
              <h2 className="data-table-title">Órdenes recientes</h2>
              <a href="/dashboard/admin/orders" style={{ fontSize: "0.8rem", color: "var(--color-primary)" }}>
                Ver todas →
              </a>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Comprador</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {(recent as any[]).map(o => (
                  <tr key={o._id.toString()}>
                    <td style={{ fontWeight: 500 }}>{o.service?.title ?? "—"}</td>
                    <td style={{ color: "var(--color-text-2)" }}>{o.buyer?.name ?? "—"}</td>
                    <td style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                      ${(o.tierPrice / 100).toFixed(2)}
                    </td>
                    <td>
                      <span className={`status-badge ${STATUS_COLORS[o.status] ?? ""}`}>{o.status}</span>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--color-text-2)" }}>
                      {new Date(o.createdAt).toLocaleDateString("es-ES")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
