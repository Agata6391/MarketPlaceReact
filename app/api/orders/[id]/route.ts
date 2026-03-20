// app/api/orders/[id]/route.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { apiSuccess, apiError } from "@/lib/api-helpers";

// ── GET /api/orders/[id] ─────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    const order = await OrderModel.findById(params.id)
      .populate("buyer",   "name email avatar")
      .populate("vendor",  "name email avatar")
      .populate("service", "title slug thumbnail tiers category")
      .lean();

    if (!order) return apiError("Order not found", 404);

    const o = order as any;

    // Access control
    if (
      user.role !== "admin" &&
      o.buyer?._id?.toString()  !== user.id &&
      o.vendor?._id?.toString() !== user.id
    ) {
      return apiError("Forbidden", 403);
    }

    return apiSuccess(order);
  } catch (err: any) {
    console.error("[ORDER GET]", err);
    return apiError("Internal server error", 500);
  }
}

// ── PATCH /api/orders/[id] ───────────────────────────────────────────────────
// Vendor can: add progress update, change status (in_progress → delivered)
// Admin can:  change any status, add notes, edit any field
// Buyer can:  mark as completed (delivered → completed)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user  = session.user as any;
    const body  = await req.json();
    await connectDB();

    const order = await OrderModel.findById(params.id);
    if (!order) return apiError("Order not found", 404);

    const isAdmin  = user.role === "admin";
    const isVendor = order.vendor?.toString() === user.id;
    const isBuyer  = order.buyer?.toString()  === user.id;

    if (!isAdmin && !isVendor && !isBuyer) {
      return apiError("Forbidden", 403);
    }

    // ── Progress update (vendor or admin) ─────────────────────────────────
    if (body.progressNote) {
      if (!isVendor && !isAdmin) return apiError("Only vendor or admin can post updates", 403);

      const note = {
        message:   body.progressNote,
        author:    user.name,
        authorRole: user.role,
        createdAt: new Date(),
      };

      (order as any).progressUpdates = [
        ...((order as any).progressUpdates ?? []),
        note,
      ];
    }

    // ── Status change ─────────────────────────────────────────────────────
    if (body.status) {
      const current = order.status;
      const next    = body.status;

      // Vendor: can move paid → in_progress → delivered
      if (isVendor && !isAdmin) {
        const allowed: Record<string, string[]> = {
          paid:        ["in_progress"],
          in_progress: ["delivered"],
        };
        if (!allowed[current]?.includes(next)) {
          return apiError(`Vendor cannot move order from ${current} to ${next}`, 403);
        }
      }

      // Buyer: can only mark delivered → completed
      if (isBuyer && !isAdmin) {
        if (current !== "delivered" || next !== "completed") {
          return apiError("Buyer can only mark delivered orders as completed", 403);
        }
        order.completedAt = new Date();
      }

      // Admin: any transition
      order.status = next;
      if (next === "delivered") order.deliveredAt = new Date();
    }

    // ── Admin-only fields ─────────────────────────────────────────────────
    if (isAdmin) {
      if (body.notes !== undefined) order.notes = body.notes;
    }

    await order.save();

    const updated = await OrderModel.findById(params.id)
      .populate("buyer",   "name email avatar")
      .populate("vendor",  "name email avatar")
      .populate("service", "title slug thumbnail tiers category")
      .lean();

    return apiSuccess(updated);
  } catch (err: any) {
    console.error("[ORDER PATCH]", err);
    return apiError("Internal server error", 500);
  }
}
