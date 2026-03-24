// app/dashboard/buyer/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { BUYER_NAV } from "@/components/dashboard/shared/navConfigs";
import "@/styles/dashboard/dashboard.css";

async function getBuyerStats(buyerId: string) {
  await connectDB();
  const [total, active, completed] = await Promise.all([
    OrderModel.countDocuments({ buyer: buyerId }),
    OrderModel.countDocuments({ buyer: buyerId, status: { $in: ["paid","in_progress","delivered"] } }),
    OrderModel.countDocuments({ buyer: buyerId, status: "completed" }),
  ]);
  const spentAgg = await OrderModel.aggregate([
    { $match: { buyer: require("mongoose").Types.ObjectId.createFromHexString(buyerId), status: { $in: ["paid","completed"] } } },
    { $group: { _id: null, total: { $sum: "$tierPrice" } } },
  ]);
  return { total, active, completed, spent: spentAgg[0]?.total ?? 0 };
}

async function getRecentOrders(buyerId: string) {
  await connectDB();
  return OrderModel.find({ buyer: buyerId })
    .populate("vendor",  "name")
    .populate("service", "title category")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
}

export default async function BuyerOverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user   = session.user as any;
  const userId = user.id ?? user.sub;

  const [stats, recent] = await Promise.all([
    getBuyerStats(userId),
    getRecentOrders(userId),
  ]);

  const STATUS_COLORS: Record<string, string> = {
    pending: "status-badge--pending", paid: "status-badge--paid",
    in_progress: "status-badge--in_progress", completed: "status-badge--completed",
    cancelled: "status-badge--cancelled", delivered: "status-badge--delivered",
    cancellation_requested: "status-badge--cancellation_requested",
  };

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={BUYER_NAV} title="My Account" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Hola, {user.name?.split(" ")[0]} 👋</h1>
            <p className="dashboard__topbar-subtitle">Tu actividad en Octupus</p>
          </div>
          <div className="dashboard__topbar-actions">
            <a href="/services" className="btn btn--primary btn--sm">Explorar servicios</a>
          </div>
        </div>

        <div className="dashboard__content">
          <div className="stats-grid">
            <div className="stat-card stat-card--green">
              <div className="stat-card__icon">💸</div>
              <p className="stat-card__label">Total invertido</p>
              <p className="stat-card__value">${(stats.spent / 100).toLocaleString("es-ES", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="stat-card stat-card--gold">
              <div className="stat-card__icon">⚡</div>
              <p className="stat-card__label">Órdenes activas</p>
              <p className="stat-card__value">{stats.active}</p>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">✅</div>
              <p className="stat-card__label">Completadas</p>
              <p className="stat-card__value">{stats.completed}</p>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">📦</div>
              <p className="stat-card__label">Órdenes totales</p>
              <p className="stat-card__value">{stats.total}</p>
            </div>
          </div>

          <div className="data-table-wrapper">
            <div className="data-table-header">
              <h2 className="data-table-title">Órdenes recientes</h2>
              <a href="/dashboard/buyer/orders" style={{ fontSize: "0.8rem", color: "var(--color-primary)" }}>Ver todas →</a>
            </div>
            {recent.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">🛒</div>
                <p className="empty-state__title">Sin órdenes aún</p>
                <p className="empty-state__text">Explora el catálogo y contrata tu primer servicio.</p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr><th>Servicio</th><th>Vendor</th><th>Precio</th><th>Estado</th><th>Fecha</th></tr>
                </thead>
                <tbody>
                  {(recent as any[]).map(o => (
                    <tr key={o._id.toString()}>
                      <td style={{ fontWeight: 500 }}>{o.service?.title ?? "—"}</td>
                      <td style={{ color: "var(--color-text-2)" }}>{o.vendor?.name ?? "—"}</td>
                      <td style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>${(o.tierPrice / 100).toFixed(2)}</td>
                      <td><span className={`status-badge ${STATUS_COLORS[o.status] ?? ""}`}>{o.status}</span></td>
                      <td style={{ fontSize: "0.8rem", color: "var(--color-text-2)" }}>{new Date(o.createdAt).toLocaleDateString("es-ES")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
