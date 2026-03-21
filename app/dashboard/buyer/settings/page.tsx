// app/dashboard/buyer/settings/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { BUYER_NAV } from "@/components/dashboard/shared/navConfigs";
import { VendorSettings } from "@/components/dashboard/vendor/VendorSettings";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import "@/styles/dashboard/dashboard.css";

// Reutiliza el mismo componente de settings — mismas opciones para buyer
export default async function BuyerSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user   = session.user as any;
  const userId = user.id ?? user.sub;

  await connectDB();
  const dbUser = await UserModel.findById(userId).lean();

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={BUYER_NAV} title="My Account" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Settings</h1>
            <p className="dashboard__topbar-subtitle">Configura tu cuenta</p>
          </div>
        </div>

        <div className="dashboard__content">
          <VendorSettings user={JSON.parse(JSON.stringify(dbUser))} />
        </div>
      </div>
    </div>
  );
}
