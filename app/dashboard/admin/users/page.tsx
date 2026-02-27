// app/dashboard/admin/users/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import "@/styles/pages/dashboard.css";
import AdminUsersTable from "@/components/dashboard/admin/AdminUsersTable";

const ADMIN_NAV = [
  { label: "Overview", href: "/dashboard/admin", icon: "📊" },
  { label: "Services", href: "/dashboard/admin/services", icon: "🛠️" },
  { label: "Users", href: "/dashboard/admin/users", icon: "👥" },
  { label: "Orders", href: "/dashboard/admin/orders", icon: "📦" },
];

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "admin") redirect("/");

  await connectDB();

  const users = await UserModel.find({})
    .select("name email role provider status suspendedUntil bannedAt deletedAt createdAt avatar")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={ADMIN_NAV} title="Admin Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <h1 className="dashboard__topbar-title">Users</h1>
        </div>

        <div className="dashboard__content">
          <AdminUsersTable users={users as any[]} />
        </div>
      </div>
    </div>
  );
}