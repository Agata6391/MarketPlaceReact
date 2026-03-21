// app/dashboard/vendor/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { OrderModel } from "@/models/Order";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { VENDOR_NAV } from "@/components/dashboard/shared/navConfigs";
import "@/styles/dashboard/dashboard.css";

async function getVendorStats(vendorId: string) {
  await connectDB();
  const [services, totalOrders, completedOrders] = await Promise.all([
    ServiceModel.countDocuments({ vendor: vendorId, isActive: true }),
    OrderModel.countDocuments({ vendor: vendorId }),
    OrderModel.countDocuments({ vendor: vendorId, status: "completed" }),
  ]);
  const revenueAgg = await OrderModel.aggregate([
    { $match: { vendor: require("mongoose").Types.ObjectId.createFromHexString(vendorId), status: { $in: ["paid","completed"] } } },
    { $group: { _id: null, total: { $sum: "$tierPrice" } } },
  ]);
  const pendingAgg = await OrderModel.aggregate([
    { $match: { vendor: require("mongoose").Types.ObjectId.createFromHexString(vendorId), status: { $in: ["paid","in_progress"] } } },
    { $group: { _id: null, total: { $sum: "$tierPrice" } } },
  ]);
  return {
    services, totalOrders, completedOrders,
    revenue: revenueAgg[0]?.total ?? 0,
    pending: pendingAgg[0]?.total ?? 0,
  };
}

async function getRecentOrders(vendorId: string) {
  await connectDB();
  return OrderModel.find({ vendor: vendorId })
    .populate("buyer",   "name email")
    .populate("service", "title")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
}

export default async function VendorOverviewPage() {
  const session = await getServerSession(authOptions);
  const user    = session?.user as any;
  if (!session || (user.role !== "vendor" && user.role !== "admin")) redirect("/");

  const userId = user.id ?? user.sub;
  const [stats, recent] = await Promise.all([
    getVendorStats(userId),
    getRecentOrders(userId),
  ]);

  const STATUS_COLORS: Record<string, string> = {
    pending: "status-badge--pending", paid: "status-badge--paid",
    in_progress: "status-badge--in_progress", completed: "status-badge--completed",
    cancelled: "status-badge--cancelled", delivered: "status-badge--delivered",
  };

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={VENDOR_NAV} title="Vendor Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Overview</h1>
            <p className="dashboard__topbar-subtitle">Tu actividad como vendor</p>
          </div>
          <div className="dashboard__topbar-actions">
            <a href="/dashboard/vendor/services" className="btn btn--primary btn--sm">
              + Nuevo servicio
            </a>
          </div>
        </div>

        <div className="dashboard__content">
          <div className="stats-grid">
            <div className="stat-card stat-card--green">
              <div className="stat-card__icon">💰</div>
              <p className="stat-card__label">Revenue total</p>
              <p className="stat-card__value">${(stats.revenue / 100).toLocaleString()}</p>
            </div>
            <div className="stat-card stat-card--gold">
              <div className="stat-card__icon">⏳</div>
              <p className="stat-card__label">Pendiente cobro</p>
              <p className="stat-card__value">${(stats.pending / 100).toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">📦</div>
              <p className="stat-card__label">Órdenes totales</p>
              <p className="stat-card__value">{stats.totalOrders}</p>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">✅</div>
              <p className="stat-card__label">Completadas</p>
              <p className="stat-card__value">{stats.completedOrders}</p>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">🛠️</div>
              <p className="stat-card__label">Servicios activos</p>
              <p className="stat-card__value">{stats.services}</p>
            </div>
          </div>

          <div className="data-table-wrapper">
            <div className="data-table-header">
              <h2 className="data-table-title">Órdenes recientes</h2>
              <a href="/dashboard/vendor/orders" style={{ fontSize: "0.8rem", color: "var(--color-primary)" }}>Ver todas →</a>
            </div>
            <table className="data-table">
              <thead>
                <tr><th>Servicio</th><th>Comprador</th><th>Precio</th><th>Estado</th><th>Fecha</th></tr>
              </thead>
              <tbody>
                {(recent as any[]).map(o => (
                  <tr key={o._id.toString()}>
                    <td style={{ fontWeight: 500 }}>{o.service?.title ?? "—"}</td>
                    <td style={{ color: "var(--color-text-2)" }}>{o.buyer?.name ?? "—"}</td>
                    <td style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>${(o.tierPrice / 100).toFixed(2)}</td>
                    <td><span className={`status-badge ${STATUS_COLORS[o.status] ?? ""}`}>{o.status}</span></td>
                    <td style={{ fontSize: "0.8rem", color: "var(--color-text-2)" }}>{new Date(o.createdAt).toLocaleDateString("es-ES")}</td>
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
