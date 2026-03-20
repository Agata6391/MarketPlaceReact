// app/checkout/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { CartModel } from "@/models/Cart";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const user   = session.user as any;
  const userId = user.id;

  await connectDB();

  const cart = await CartModel.findOne({ user: userId })
    .populate({ path: "items.service", select: "title thumbnail slug category vendor tiers" })
    .lean();

  const items = (cart?.items ?? []) as any[];
  if (items.length === 0) redirect("/cart");

  const total = items.reduce((sum: number, it: any) => sum + (Number(it.tierPrice) || 0), 0);

  return (
    <CheckoutClient
      items={JSON.parse(JSON.stringify(items))}
      total={total}
      userName={user.name  ?? ""}
      userEmail={user.email ?? ""}
      userRole={user.role   ?? "buyer"}
    />
  );
}
