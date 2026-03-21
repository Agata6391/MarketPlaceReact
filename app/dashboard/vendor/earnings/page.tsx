// app/dashboard/vendor/earnings/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { VENDOR_NAV } from "@/components/dashboard/shared/navConfigs";
import mongoose from "mongoose";
import "@/styles/dashboard/dashboard.css";

const MONTHS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

async function getEarnings(vendorId: string) {
  await connectDB();
  const vid = new mongoose.Types.ObjectId(vendorId);

  // Total histórico
  const totalAgg = await OrderModel.aggregate([
    { $match: { vendor: vid, status: { $in: ["paid","completed"] } } },
    { $group: { _id: null, total: { $sum: "$tierPrice" }, count: { $sum: 1 } } },
  ]);

  // Pendientes de cobro
  const pendingOrders = await OrderModel.find({ vendor: vid, status: { $in: ["paid","in_progress"] } })
    .populate("buyer",   "name email")
    .populate("service", "title")
    .sort({ createdAt: -1 })
    .lean();

  // Ganancias por mes (últimos 6)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const byMonth = await OrderModel.aggregate([
    { $match: { vendor: vid, status: { $in: ["paid","completed"] }, createdAt: { $gte: sixMonthsAgo } } },
    { $group: {
      _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
      total: { $sum: "$tierPrice" },
      count: { $sum: 1 },
    }},
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  // Por servicio
  const byService = await OrderModel.aggregate([
    { $match: { vendor: vid, status: { $in: ["paid","completed"] } } },
    { $group: { _id: "$service", total: { $sum: "$tierPrice" }, count: { $sum: 1 } } },
    { $sort: { total: -1 } },
    { $limit: 8 },
    { $lookup: { from: "services", localField: "_id", foreignField: "_id", as: "svc" } },
    { $unwind: { path: "$svc", preserveNullAndEmptyArrays: true } },
  ]);

  return { totalAgg, pendingOrders, byMonth, byService };
}

export default async function VendorEarningsPage() {
  const session = await getServerSession(authOptions);
  const user    = session?.user as any;
  if (!session || (user.role !== "vendor" && user.role !== "admin")) redirect("/");

  const userId = user.id ?? user.sub;
  const { totalAgg, pendingOrders, byMonth, byService } = await getEarnings(userId);

  const total        = totalAgg[0]?.total ?? 0;
  const totalOrders  = totalAgg[0]?.count ?? 0;
  const pendingTotal = (pendingOrders as any[]).reduce((s, o) => s + o.tierPrice, 0);

  // Últimos 6 meses para el gráfico
  const last6 = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return { year: d.getFullYear(), month: d.getMonth() + 1, label: MONTHS[d.getMonth()] };
  });
  const monthData = last6.map(m => {
    const found = byMonth.find(b => b._id.year === m.year && b._id.month === m.month);
    return { label: m.label, value: found?.total ?? 0 };
  });
  const maxVal = Math.max(...monthData.map(d => d.value), 1);

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={VENDOR_NAV} title="Vendor Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Earnings</h1>
            <p className="dashboard__topbar-subtitle">Resumen de tus ingresos</p>
          </div>
        </div>

        <div className="dashboard__content">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card stat-card--green">
              <div className="stat-card__icon">💰</div>
              <p className="stat-card__label">Total histórico</p>
              <p className="stat-card__value">${(total / 100).toLocaleString("es-ES", { minimumFractionDigits: 2 })}</p>
              <p className="stat-card__delta">{totalOrders} órdenes completadas</p>
            </div>
            <div className="stat-card stat-card--gold">
              <div className="stat-card__icon">⏳</div>
              <p className="stat-card__label">Pendiente de cobro</p>
              <p className="stat-card__value">${(pendingTotal / 100).toLocaleString("es-ES", { minimumFractionDigits: 2 })}</p>
              <p className="stat-card__delta">{(pendingOrders as any[]).length} órdenes activas</p>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">📅</div>
              <p className="stat-card__label">Este mes</p>
              <p className="stat-card__value">${(monthData[5].value / 100).toFixed(2)}</p>
            </div>
          </div>

          <div className="earnings-grid">
            {/* Gráfico por mes */}
            <div className="chart-card">
              <p className="chart-card__title">Ganancias por mes (USD)</p>
              <div className="bar-chart">
                {monthData.map(d => (
                  <div key={d.label} className="bar-chart__bar-wrap">
                    <span style={{ fontSize: "0.65rem", color: "var(--color-text-2)" }}>
                      ${(d.value / 100).toFixed(0)}
                    </span>
                    <div
                      className="bar-chart__bar bar-chart__bar--green"
                      style={{ height: `${Math.max((d.value / maxVal) * 100, 4)}%` }}
                    />
                    <span className="bar-chart__label">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Por servicio */}
            <div className="section-card" style={{ marginBottom: 0 }}>
              <div className="section-card__header">
                <h3 className="section-card__title">Por servicio</h3>
              </div>
              <div style={{ padding: "var(--space-4)" }}>
                {(byService as any[]).length === 0 ? (
                  <p style={{ color: "var(--color-text-2)", fontSize: "0.875rem", textAlign: "center", padding: "var(--space-8)" }}>
                    Sin datos aún
                  </p>
                ) : (byService as any[]).map(s => {
                  const pct = total > 0 ? (s.total / total) * 100 : 0;
                  return (
                    <div key={s._id.toString()} style={{ marginBottom: "var(--space-4)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: "0.8rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "65%" }}>
                          {s.svc?.title ?? "Servicio eliminado"}
                        </span>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-green)" }}>
                          ${(s.total / 100).toFixed(2)}
                        </span>
                      </div>
                      <div style={{ height: 6, background: "var(--color-bg-3)", borderRadius: 999 }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: "var(--color-green)", borderRadius: 999, transition: "width 0.5s ease" }} />
                      </div>
                      <p style={{ fontSize: "0.7rem", color: "var(--color-text-2)", marginTop: 3 }}>{s.count} orden{s.count !== 1 ? "es" : ""}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pendientes de cobro */}
          {(pendingOrders as any[]).length > 0 && (
            <div className="data-table-wrapper" style={{ marginTop: "var(--space-6)" }}>
              <div className="data-table-header">
                <h2 className="data-table-title">⏳ Órdenes pendientes de cobro</h2>
                <span style={{ fontSize: "0.8rem", color: "var(--color-gold)" }}>
                  Total: ${(pendingTotal / 100).toFixed(2)}
                </span>
              </div>
              <div className="earnings-pending-list" style={{ padding: "var(--space-4)" }}>
                {(pendingOrders as any[]).map(o => (
                  <div key={o._id.toString()} className="earnings-pending-item">
                    <div className="earnings-pending-item__info">
                      <p className="earnings-pending-item__title">{o.service?.title ?? "—"}</p>
                      <p className="earnings-pending-item__meta">
                        {o.buyer?.name} · {o.tierName} ·
                        <span className={`status-badge status-badge--${o.status}`} style={{ marginLeft: 6 }}>{o.status}</span>
                      </p>
                    </div>
                    <span className="earnings-pending-item__amount">${(o.tierPrice / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
