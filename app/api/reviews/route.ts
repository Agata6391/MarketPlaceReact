import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { ReviewModel } from "@/models/Review";
import { OrderModel } from "@/models/Order";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ── GET /api/reviews?service=id ──────────────────────────
export async function GET(req: NextRequest) {
  try {
    const serviceId = req.nextUrl.searchParams.get("service");
    if (!serviceId) return apiError("service query param required");

    await connectDB();

    const reviews = await ReviewModel.find({ service: serviceId })
      .populate("reviewer", "name avatar")
      .sort({ createdAt: -1 })
      .lean();

    return apiSuccess(reviews);
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}

// ── POST /api/reviews ─────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    const { orderId, rating, comment } = await req.json();

    if (!orderId || !rating || !comment) {
      return apiError("orderId, rating and comment are required");
    }

    // Ensure buyer actually ordered this service
    const order = await OrderModel.findOne({
      _id: orderId,
      buyer: user.id,
      status: "completed",
    });

    if (!order) {
      return apiError("You can only review completed orders");
    }

    // Prevent double reviews
    const existing = await ReviewModel.findOne({ order: orderId });
    if (existing) return apiError("You already reviewed this order", 409);

    const review = await ReviewModel.create({
      service: order.service,
      order: orderId,
      reviewer: user.id,
      vendor: order.vendor,
      rating,
      comment,
    });

    return apiSuccess(review, 201);
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}
