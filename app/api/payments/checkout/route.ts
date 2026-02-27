import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { CartModel } from "@/models/Cart";
import { ServiceModel } from "@/models/Service";
import { apiSuccess, apiError } from "@/lib/api-helpers";

// ── POST /api/payments/checkout ──────────────────────────
export async function POST(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return apiError("Unauthorized", 401);

    const user = session.user as any;
    await connectDB();

    // Fetch cart with populated service data
    const cart = await CartModel.findOne({ user: user.id }).populate({
      path: "items.service",
      model: ServiceModel,
    });

    if (!cart || cart.items.length === 0) {
      return apiError("Cart is empty");
    }

    // Build Stripe line items from cart
    const lineItems = cart.items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.service.title} — ${item.tierName}`,
          images: item.service.thumbnail ? [item.service.thumbnail] : [],
          metadata: {
            serviceId: item.service._id.toString(),
            vendorId: item.service.vendor.toString(),
            tierName: item.tierName,
          },
        },
        unit_amount: item.tierPrice, // Already in cents
      },
      quantity: 1,
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      line_items: lineItems,
      metadata: {
        userId: user.id,
        cartId: cart._id.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/buyer/purchases?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });

    return apiSuccess({ url: checkoutSession.url });
  } catch (err: any) {
    console.error("[CHECKOUT]", err);
    return apiError("Internal server error", 500);
  }
}
