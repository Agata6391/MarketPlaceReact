// app/dashboard/admin/analytics/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { UserModel } from "@/models/User";
import { ServiceModel } from "@/models/Service";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { ADMIN_NAV } from "@/components/dashboard/shared/navConfigs";
import "@/styles/dashboard/dashboard.css";

async function getAnalytics() {
  await connectDB();

  // Revenue por mes (últimos 6 meses)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const revenueByMonth = await OrderModel.aggregate([
    { $match: { status: { $in: ["paid", "completed"] }, createdAt: { $gte: sixMonthsAgo } } },
    { $group: {
      _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
      total: { $sum: "$tierPrice" },
      count: { $sum: 1 },
    }},
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  // Usuarios nuevos por mes
  const usersByMonth = await UserModel.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    { $group: {
      _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
      count: { $sum: 1 },
    }},
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  // Órdenes por estado
  const ordersByStatus = await OrderModel.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Top 5 servicios más vendidos
  const topServices = await OrderModel.aggregate([
    { $group: { _id: "$service", count: { $sum: 1 }, revenue: { $sum: "$tierPrice" } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $lookup: { from: "services", localField: "_id", foreignField: "_id", as: "service" } },
    { $unwind: "$service" },
  ]);

  return { revenueByMonth, usersByMonth, ordersByStatus, topServices };
}

const MONTHS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

const STATUS_COLORS: Record<string, string> = {
  paid: "#06d6a0", completed: "#6c63ff", in_progress: "#06d6a0",
  pending: "#ffd166", cancelled: "#ff6b6b", delivered: "#9c63ff",
};

export default async function AdminAnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") redirect("/");

  const { revenueByMonth, usersByMonth, ordersByStatus, topServices } = await getAnalytics();

  // Preparar datos de barras para los últimos 6 meses
  const last6 = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return { year: d.getFullYear(), month: d.getMonth() + 1, label: MONTHS[d.getMonth()] };
  });

  const revenueData = last6.map(m => {
    const found = revenueByMonth.find(r => r._id.year === m.year && r._id.month === m.month);
    return { label: m.label, value: found?.total ?? 0, count: found?.count ?? 0 };
  });

  const usersData = last6.map(m => {
    const found = usersByMonth.find(r => r._id.year === m.year && r._id.month === m.month);
    return { label: m.label, value: found?.count ?? 0 };
  });

  const maxRevenue = Math.max(...revenueData.map(d => d.value), 1);
  const maxUsers   = Math.max(...usersData.map(d => d.value), 1);
  const totalOrders = ordersByStatus.reduce((s, o) => s + o.count, 0);

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={ADMIN_NAV} title="Admin Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Analytics</h1>
            <p className="dashboard__topbar-subtitle">Métricas de la plataforma — últimos 6 meses</p>
          </div>
        </div>

        <div className="dashboard__content">

          {/* Revenue chart */}
          <div className="chart-grid">
            <div className="chart-card">
              <p className="chart-card__title">Ingresos por mes (USD)</p>
              <div className="bar-chart">
                {revenueData.map(d => (
                  <div key={d.label} className="bar-chart__bar-wrap">
                    <span style={{ fontSize: "0.65rem", color: "var(--color-text-2)" }}>
                      ${(d.value / 100).toFixed(0)}
                    </span>
                    <div
                      className="bar-chart__bar bar-chart__bar--green"
                      style={{ height: `${Math.max((d.value / maxRevenue) * 100, 4)}%` }}
                      title={`${d.label}: $${(d.value / 100).toFixed(2)}`}
                    />
                    <span className="bar-chart__label">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders by status donut */}
            <div className="chart-card">
              <p className="chart-card__title">Órdenes por estado</p>
              <div className="donut-wrap">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {(() => {
                    let offset = 0;
                    const r = 45, cx = 60, cy = 60, circ = 2 * Math.PI * r;
                    return ordersByStatus.map((s, i) => {
                      const pct  = s.count / totalOrders;
                      const dash = pct * circ;
                      const el   = (
                        <circle
                          key={s._id}
                          cx={cx} cy={cy} r={r}
                          fill="none"
                          stroke={Object.values(STATUS_COLORS)[i % 6]}
                          strokeWidth="18"
                          strokeDasharray={`${dash} ${circ - dash}`}
                          strokeDashoffset={-offset * circ + circ * 0.25}
                          opacity="0.85"
                        />
                      );
                      offset += pct;
                      return el;
                    });
                  })()}
                  <text x="60" y="58" textAnchor="middle" fill="var(--color-text)" fontSize="16" fontWeight="700" fontFamily="var(--font-heading)">
                    {totalOrders}
                  </text>
                  <text x="60" y="72" textAnchor="middle" fill="var(--color-text-2)" fontSize="9">
                    órdenes
                  </text>
                </svg>
                <div className="donut-legend">
                  {ordersByStatus.map((s, i) => (
                    <div key={s._id} className="donut-legend__item">
                      <div className="donut-legend__dot" style={{ background: Object.values(STATUS_COLORS)[i % 6] }} />
                      <span className="donut-legend__label">{s._id}</span>
                      <span className="donut-legend__value">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Users by month */}
          <div className="chart-card" style={{ marginBottom: "var(--space-6)" }}>
            <p className="chart-card__title">Usuarios nuevos por mes</p>
            <div className="bar-chart">
              {usersData.map(d => (
                <div key={d.label} className="bar-chart__bar-wrap">
                  <span style={{ fontSize: "0.65rem", color: "var(--color-text-2)" }}>{d.value}</span>
                  <div
                    className="bar-chart__bar"
                    style={{ height: `${Math.max((d.value / maxUsers) * 100, 4)}%` }}
                    title={`${d.label}: ${d.value} usuarios`}
                  />
                  <span className="bar-chart__label">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top services */}
          <div className="data-table-wrapper">
            <div className="data-table-header">
              <h2 className="data-table-title">🏆 Servicios más vendidos</h2>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Servicio</th>
                  <th>Categoría</th>
                  <th>Órdenes</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {(topServices as any[]).map((s, i) => (
                  <tr key={s._id.toString()}>
                    <td style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-text-2)" }}>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                    </td>
                    <td style={{ fontWeight: 500 }}>{s.service?.title}</td>
                    <td><span className="status-badge status-badge--paid">{s.service?.category}</span></td>
                    <td style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>{s.count}</td>
                    <td style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-green)" }}>
                      ${(s.revenue / 100).toFixed(2)}
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
