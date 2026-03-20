// app/api/checkout-dummy/route.ts
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { CartModel } from "@/models/Cart";
import { OrderModel } from "@/models/Order";
import { ServiceModel } from "@/models/Service";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    const body = await req.json();
    const { method } = body; // "card" | "paypal" | "vendor"

    await connectDB();

    const cart = await CartModel.findOne({ user: user.id }).populate({
      path: "items.service",
      model: ServiceModel,
    });

    if (!cart || cart.items.length === 0) {
      return apiError("Cart is empty", 400);
    }

    // Simulate payment delay
    await new Promise(r => setTimeout(r, 800));

    // Simulate occasional failure for realism (5% chance) — skip in vendor agreement
    if (method === "card" && Math.random() < 0.05) {
      return apiError("Card declined. Please check your details and try again.", 402);
    }

    // Create an Order per cart item
    const orders = [];
    for (const item of cart.items as any[]) {
      const status = method === "vendor" ? "pending" : "paid";

      const order = await OrderModel.create({
        buyer:        user.id,
        vendor:       item.service.vendor,
        service:      item.service._id,
        tierName:     item.tierName,
        tierPrice:    item.tierPrice,
        deliveryDays: item.deliveryDays,
        status,
        progressUpdates: [{
          message:    method === "vendor"
            ? "Orden creada — pendiente de acuerdo con el vendor."
            : `Pago completado vía ${method === "card" ? "tarjeta" : "PayPal"}. El vendor comenzará pronto.`,
          author:     "Sistema",
          authorRole: "admin",
          createdAt:  new Date(),
        }],
      });

      // Increment orderCount on service
      await ServiceModel.findByIdAndUpdate(item.service._id, { $inc: { orderCount: 1 } });

      orders.push(order._id);
    }

    // Clear cart
    await CartModel.findOneAndUpdate({ user: user.id }, { items: [] });

    return apiSuccess({ orders, method });
  } catch (err: any) {
    console.error("[CHECKOUT-DUMMY]", err);
    return apiError("Internal server error", 500);
  }
}
