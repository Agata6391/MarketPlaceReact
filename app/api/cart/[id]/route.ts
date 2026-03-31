import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { CartModel } from "@/models/Cart";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ── DELETE /api/cart/[id] ── Remove single item ─────────
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    const cart = await CartModel.findOneAndUpdate(
      { user: user.id },
      { $pull: { items: { _id: id } } },
      { new: true }
    );

    return apiSuccess(cart);
  } catch (err: any) {
    return apiError("Internal server error", 500);
  }
}