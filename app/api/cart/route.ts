//app\api\cart\route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { CartModel } from "@/models/Cart";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ── GET /api/cart ────────────────────────────────────────
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    const cart = await CartModel.findOne({ user: user.id })
      .populate({ path: "items.service", select: "title thumbnail slug vendor" })
      .lean();

    return apiSuccess(cart ?? { items: [] });
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}

// ── POST /api/cart ── Add item ───────────────────────────
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    const { serviceId, tierName, tierPrice, deliveryDays } = await req.json();

    if (!serviceId || !tierName || tierPrice == null) {
      return apiError("serviceId, tierName and tierPrice are required");
    }

    const cart = await CartModel.findOneAndUpdate(
      { user: user.id },
      {
        $push: {
          items: { service: serviceId, tierName, tierPrice, deliveryDays },
        },
      },
      { new: true, upsert: true }
    ).populate({ path: "items.service", select: "title thumbnail slug" });

    return apiSuccess(cart, 201);
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}

// ── DELETE /api/cart ── Clear cart ───────────────────────
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    await CartModel.findOneAndUpdate({ user: user.id }, { $set: { items: [] } });

    return apiSuccess({ message: "Cart cleared" });
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}
