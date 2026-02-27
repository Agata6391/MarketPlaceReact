import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ── GET /api/orders/my ───────────────────────────────────
export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    const orders = await OrderModel.find({ buyer: user.id })
      .populate("service", "title thumbnail")
      .populate("vendor", "name avatar")
      .sort({ createdAt: -1 })
      .lean();

    return apiSuccess(orders);
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}
