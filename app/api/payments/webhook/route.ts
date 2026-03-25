import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/models/Order";
import { CartModel } from "@/models/Cart";
import { ServiceModel } from "@/models/Service";

// Stripe requires raw body — disable Next.js body parsing
export const dynamic = 'force-dynamic';

// ── POST /api/payments/webhook ───────────────────────────
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const { userId, cartId } = session.metadata;

    await connectDB();

    // Get full session with line items
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price.product"],
    });

    const cart = await CartModel.findById(cartId).populate("items.service");

    if (cart) {
      // Create one Order per cart item
      const orderPromises = cart.items.map(async (item: any) => {
        const service = await ServiceModel.findById(item.service._id);
        if (!service) return;

        await OrderModel.create({
          buyer: userId,
          vendor: service.vendor,
          service: service._id,
          tierName: item.tierName,
          tierPrice: item.tierPrice,
          deliveryDays: item.deliveryDays,
          status: "paid",
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent,
        });

        // Increment order count on service
        await ServiceModel.findByIdAndUpdate(service._id, { $inc: { orderCount: 1 } });
      });

      await Promise.all(orderPromises);

      // Clear cart after successful payment
      await CartModel.findByIdAndUpdate(cartId, { $set: { items: [] } });
    }
  }

  return NextResponse.json({ received: true });
}
