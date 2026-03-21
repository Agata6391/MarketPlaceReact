// app/dashboard/vendor/settings/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { VENDOR_NAV } from "@/components/dashboard/shared/navConfigs";
import { VendorSettings } from "@/components/dashboard/vendor/VendorSettings";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import "@/styles/dashboard/dashboard.css";

export default async function VendorSettingsPage() {
  const session = await getServerSession(authOptions);
  const user    = session?.user as any;
  if (!session || (user.role !== "vendor" && user.role !== "admin")) redirect("/");

  await connectDB();
  const dbUser = await UserModel.findById(user.id ?? user.sub).lean();

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={VENDOR_NAV} title="Vendor Panel" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Settings</h1>
            <p className="dashboard__topbar-subtitle">Configura tu perfil y preferencias</p>
          </div>
        </div>

        <div className="dashboard__content">
          <VendorSettings user={JSON.parse(JSON.stringify(dbUser))} />
        </div>
      </div>
    </div>
  );
}
