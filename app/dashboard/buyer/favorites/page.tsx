// app/dashboard/buyer/favorites/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { BUYER_NAV } from "@/components/dashboard/shared/navConfigs";
import { FavoritesClient } from "@/components/dashboard/buyer/FavoritesClient";
import { connectDB } from "@/lib/db";
import { FavoriteModel } from "@/models/Favorite";
import "@/styles/dashboard/dashboard.css";

export default async function BuyerFavoritesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user   = session.user as any;
  const userId = user.id ?? user.sub;

  await connectDB();

  const favorites = await FavoriteModel.find({ user: userId })
    .populate({
      path: "service",
      select: "title slug thumbnail category tiers rating reviewCount isActive vendor",
      populate: { path: "vendor", select: "name" },
    })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="dashboard">
      <DashboardSidebar navItems={BUYER_NAV} title="My Account" />

      <div className="dashboard__main">
        <div className="dashboard__topbar">
          <div className="dashboard__topbar-left">
            <h1 className="dashboard__topbar-title">Favorites</h1>
            <p className="dashboard__topbar-subtitle">Servicios guardados · {favorites.length} elemento{favorites.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="dashboard__content">
          <FavoritesClient favorites={JSON.parse(JSON.stringify(favorites))} />
        </div>
      </div>
    </div>
  );
}
