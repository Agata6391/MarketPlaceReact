import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { BuyerOrdersList } from "@/components/dashboard/buyer/BuyerOrdersList";
import "@/styles/pages/dashboard.css";

const BUYER_NAV = [
  { label: "My Purchases", href: "/dashboard/buyer",          icon: "🛒" },
  { label: "Reviews",      href: "/dashboard/buyer/reviews",  icon: "⭐" },
];

export default async function BuyerDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = session.user as any;
  await connectDB();

  const orders = await OrderModel.countDocuments({ buyer: user.id });
  const completed = await OrderModel.countDocuments({ buyer: user.id, status: "completed" });

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={BUYER_NAV} title="My Account" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <h1 className="dashboard__topbar-title">My Purchases</h1>
        </div>

        <div className="dashboard__content">
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-card__label">Total Orders</p>
              <p className="stat-card__value">{orders}</p>
              <span className="stat-card__icon">📦</span>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Completed</p>
              <p className="stat-card__value">{completed}</p>
              <span className="stat-card__icon">✅</span>
            </div>
          </div>

          <BuyerOrdersList />
        </div>
      </div>
    </div>
  );
}
