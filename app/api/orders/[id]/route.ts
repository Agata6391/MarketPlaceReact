// app/api/orders/[id]/route.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);
    const user = session.user as any;
    await connectDB();

    const order = await OrderModel.findById(id)
      .populate("buyer", "name email avatar")
      .populate("vendor", "name email avatar")
      .populate("service", "title slug thumbnail tiers category")
      .lean();

    if (!order) return apiError("Order not found", 404);
    const o = order as any;

    if (
      user.role !== "admin" &&
      o.buyer?._id?.toString() !== user.id &&
      o.vendor?._id?.toString() !== user.id
    ) return apiError("Forbidden", 403);

    return apiSuccess(order);
  } catch (err: any) {
    console.error("[ORDER GET]", err);
    return apiError("Internal server error", 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    const body = await req.json();
    await connectDB();

    const order = await OrderModel.findById(id);
    if (!order) return apiError("Order not found", 404);

    const isAdmin = user.role === "admin";
    const isVendor = order.vendor?.toString() === user.id;
    const isBuyer = order.buyer?.toString() === user.id;

    if (!isAdmin && !isVendor && !isBuyer) return apiError("Forbidden", 403);

    if (body.action === "request_cancellation") {
      if (!isBuyer && !isAdmin) return apiError("Solo el comprador puede solicitar cancelación", 403);
      const cancellable = ["pending", "paid", "in_progress", "cancellation_requested"];
      if (!cancellable.includes(order.status)) {
        return apiError("No se puede cancelar una orden en estado: " + order.status, 400);
      }
      if (order.status !== "cancellation_requested") {
        (order as any).statusBeforeCancellation = order.status;
      }
      order.status = "cancellation_requested" as any;
      (order as any).cancellationReason = body.reason ?? "";
      (order as any).progressUpdates = [
        ...((order as any).progressUpdates ?? []),
        { message: `Comprador solicitó cancelación. Motivo: "${body.reason ?? "Sin especificar"}"`, author: user.name, authorRole: "buyer", createdAt: new Date() },
      ];
    } else if (body.action === "accept_cancellation") {
      if (!isVendor && !isAdmin) return apiError("Solo vendor o admin", 403);
      if ((order as any).status !== "cancellation_requested") return apiError("No hay solicitud activa", 400);
      order.status = "cancelled" as any;
      (order as any).progressUpdates = [
        ...((order as any).progressUpdates ?? []),
        { message: "Vendor aceptó la cancelación. Orden cancelada.", author: user.name, authorRole: isAdmin ? "admin" : "vendor", createdAt: new Date() },
      ];
    } else if (body.action === "reject_cancellation") {
      if (!isVendor && !isAdmin) return apiError("Solo vendor o admin", 403);
      if ((order as any).status !== "cancellation_requested") return apiError("No hay solicitud activa", 400);
      const prevStatus = (order as any).statusBeforeCancellation ?? "paid";
      order.status = prevStatus as any;
      (order as any).cancellationReason = undefined;
      (order as any).progressUpdates = [
        ...((order as any).progressUpdates ?? []),
        { message: `Vendor rechazó la cancelación.${body.reason ? " Motivo: " + body.reason : " La orden continúa activa."}`, author: user.name, authorRole: isAdmin ? "admin" : "vendor", createdAt: new Date() },
      ];
    } else if (body.action === "admin_cancel") {
      if (!isAdmin) return apiError("Solo admin", 403);
      order.status = "cancelled" as any;
      (order as any).progressUpdates = [
        ...((order as any).progressUpdates ?? []),
        { message: `Admin canceló la orden.${body.reason ? " Motivo: " + body.reason : ""}`, author: user.name, authorRole: "admin", createdAt: new Date() },
      ];
    } else {
      if (body.progressNote) {
        if (!isVendor && !isAdmin) return apiError("Solo vendor o admin pueden publicar avances", 403);
        (order as any).progressUpdates = [
          ...((order as any).progressUpdates ?? []),
          { message: body.progressNote, author: user.name, authorRole: user.role, createdAt: new Date() },
        ];
      }

      if (body.status) {
        const cur = order.status;
        const next = body.status;

        if (isVendor && !isAdmin) {
          const allowed: Record<string, string[]> = { paid: ["in_progress"], in_progress: ["delivered"] };
          if (!allowed[cur]?.includes(next)) return apiError(`No puedes mover de ${cur} a ${next}`, 403);
          (order as any).statusBeforeCancellation = cur;
        }

        if (isBuyer && !isAdmin) {
          if (cur !== "delivered" || next !== "completed") return apiError("Solo puedes marcar como completado", 403);
          order.completedAt = new Date();
        }

        order.status = next;
        if (next === "delivered") order.deliveredAt = new Date();
      }

      if (isAdmin && body.notes !== undefined) order.notes = body.notes;
    }

    await order.save();

    const updated = await OrderModel.findById(id)
      .populate("buyer", "name email avatar")
      .populate("vendor", "name email avatar")
      .populate("service", "title slug thumbnail tiers category")
      .lean();

    return apiSuccess(updated);
  } catch (err: any) {
    console.error("[ORDER PATCH]", err);
    return apiError("Internal server error", 500);
  }
}