// app/cart/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { CartModel } from "@/models/Cart";
import { Button } from "@/components/ui/Button";
import "@/styles/pages/cart.css";
import { RemoveCartItemButton } from "@/components/cart/RemoveCartItemButton";

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="page">
        <div className="page__container">
          <div className="cart">
            <div className="cart__header">
              <div>
                <h1 className="cart__title">Cart</h1>
                <p className="cart__subtitle">Sign in to view your cart.</p>
              </div>

              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userId = (session.user as any).id;

  await connectDB();

  const cart = await CartModel.findOne({ user: userId })
    .populate({ path: "items.service", select: "title thumbnail slug vendor" })
    .lean();

  const items = cart?.items ?? [];
  const total = items.reduce(
    (sum: number, it: any) => sum + (Number(it.tierPrice) || 0),
    0,
  );

  return (
    <div className="page">
      <div className="page__container">
        <div className="cart">
          <div className="cart__header">
            <div>
              <h1 className="cart__title">Cart</h1>
              <p className="cart__subtitle">
                {items.length === 0
                  ? "Your cart is empty."
                  : `${items.length} item(s) in your cart`}
              </p>
            </div>

            <div className="cart__header-actions">
              <Link href="/services">
                <Button variant="secondary">Browse services</Button>
              </Link>
              <Link href="/checkout">
                <Button disabled={items.length === 0}>Checkout</Button>
              </Link>
            </div>
          </div>

          <div className="cart__grid">
            <section className="cart__panel">
              {items.length === 0 ? (
                <div className="cart__empty">
                  <div className="cart__empty-title">No items yet</div>
                  <div className="cart__empty-text">
                    Add a service tier from a service detail page.
                  </div>
                </div>
              ) : (
                <ul className="cart__list">
                  {items.map((it: any) => {
                    const service = it.service;
                    const title = service?.title ?? "Service";
                    const href = service?.slug
                      ? `/services/${service.slug}`
                      : "#";

                    return (
                      <li key={it._id.toString()} className="cart-item">
                        <div className="cart-item__thumb">
                          {service?.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={service.thumbnail} alt={title} />
                          ) : (
                            <div className="cart-item__thumb-placeholder" />
                          )}
                        </div>

                        <div className="cart-item__main">
                          <Link className="cart-item__title" href={href}>
                            {title}
                          </Link>

                          <div className="cart-item__meta">
                            <span className="cart-item__pill">
                              {it.tierName}
                            </span>
                            {it.deliveryDays != null && (
                              <span className="cart-item__muted">
                                {it.deliveryDays} days
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="cart-item__price">
                          ${Number(it.tierPrice).toFixed(2)}
                        </div>

                        <div className="cart-item__actions">
                          <RemoveCartItemButton itemId={it._id.toString()} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <aside className="cart__summary">
              <div className="summary">
                <div className="summary__title">Order summary</div>

                <div className="summary__row">
                  <span className="summary__label">Subtotal</span>
                  <span className="summary__value">${total.toFixed(2)}</span>
                </div>

                <div className="summary__row">
                  <span className="summary__label">Taxes</span>
                  <span className="summary__value">—</span>
                </div>

                <div className="summary__divider" />

                <div className="summary__row summary__row--total">
                  <span className="summary__label">Total</span>
                  <span className="summary__value">${total.toFixed(2)}</span>
                </div>

                <div className="summary__actions">
                  <Link href="/checkout">
                    <Button fullWidth disabled={items.length === 0}>
                      Checkout
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button fullWidth variant="secondary">
                      Continue browsing
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
