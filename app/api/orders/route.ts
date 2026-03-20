// app/api/orders/route.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { apiSuccess, apiError } from "@/lib/api-helpers";

// ── GET /api/orders ──────────────────────────────────────────────────────────
// Admin: all orders + search/filter
// Vendor: own orders (where vendor = me)
// Buyer: own orders (where buyer = me)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    const { searchParams } = req.nextUrl;
    const status   = searchParams.get("status");
    const search   = searchParams.get("search");
    const page     = parseInt(searchParams.get("page") ?? "1");
    const limit    = parseInt(searchParams.get("limit") ?? "20");

    const filter: Record<string, any> = {};

    // Role-based scope
    if (user.role === "buyer")  filter.buyer  = user.id;
    if (user.role === "vendor") filter.vendor = user.id;
    // admin: no filter — sees everything

    if (status && status !== "all") filter.status = status;

    const skip = (page - 1) * limit;

    let query = OrderModel.find(filter)
      .populate("buyer",   "name email avatar")
      .populate("vendor",  "name email avatar")
      .populate("service", "title slug thumbnail tiers")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const [orders, total] = await Promise.all([
      query,
      OrderModel.countDocuments(filter),
    ]);

    // Text search on populated fields (post-query filter for simplicity)
    let filtered = orders as any[];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((o) =>
        o.service?.title?.toLowerCase().includes(q) ||
        o.buyer?.name?.toLowerCase().includes(q)    ||
        o.buyer?.email?.toLowerCase().includes(q)   ||
        o.vendor?.name?.toLowerCase().includes(q)   ||
        o._id.toString().includes(q)
      );
    }

    return apiSuccess({
      orders: filtered,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err: any) {
    console.error("[ORDERS GET]", err);
    return apiError("Internal server error", 500);
  }
}
