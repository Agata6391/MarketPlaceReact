// app/api/orders/route.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user   = session.user as any;
    const userId = user.id ?? user.sub ?? null;

    await connectDB();

    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const as     = searchParams.get("as");
    const page   = parseInt(searchParams.get("page")  ?? "1");
    const limit  = parseInt(searchParams.get("limit") ?? "20");

    const filter: Record<string, any> = {};

    if (user.role === "admin") {
      // Sin filtro — ve todas las órdenes
    } else if (user.role === "vendor" && as === "buyer") {
      filter.buyer = userId;
    } else if (user.role === "vendor") {
      filter.vendor = userId;
    } else {
      filter.buyer = userId;
    }

    if (status && status !== "all") filter.status = status;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      OrderModel.find(filter)
        .populate("buyer",   "name email avatar")
        .populate("vendor",  "name email avatar")
        .populate("service", "title slug thumbnail tiers category")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      OrderModel.countDocuments(filter),
    ]);

    let filtered = orders as any[];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(o =>
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