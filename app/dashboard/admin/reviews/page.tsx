// app/dashboard/admin/reviews/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { ReviewModel } from "@/models/Review";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { ADMIN_NAV } from "@/components/dashboard/shared/navConfigs";
import { AdminReviewsTable } from "@/components/dashboard/admin/AdminReviewsTable";
import "@/styles/dashboard/dashboard.css";

async function getReviews() {
  await connectDB();
  return ReviewModel.find()
    .populate("reviewer", "name email")
    .populate("service",  "title category")
    .populate("vendor",   "name")
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
}

export default async function AdminReviewsPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") redirect("/");

  const reviews = await getReviews();

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={ADMIN_NAV} title="Admin Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Reseñas</h1>
            <p className="dashboard__topbar-subtitle">Modera las reseñas de la plataforma</p>
          </div>
        </div>

        <div className="dashboard__content">
          <AdminReviewsTable reviews={JSON.parse(JSON.stringify(reviews))} />
        </div>
      </div>
    </div>
  );
}
