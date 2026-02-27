"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import "@/styles/pages/service-detail.css";

interface Tier {
  name: string;
  description: string;
  price: number;
  deliveryDays: number;
  features: string[];
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  reviewer: { name: string; avatar?: string };
  createdAt: string;
}

interface Props {
  service: {
    _id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    tiers: Tier[];
    vendor: { name: string; avatar?: string; createdAt: string };
    rating: number;
    reviewCount: number;
    orderCount: number;
    thumbnail?: string;
  };
  reviews: Review[];
}

export function ServiceDetailClient({ service, reviews }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  async function addToCart() {
    if (!session) { router.push("/login"); return; }
    setAdding(true);

    const tier = service.tiers[selectedTier];
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: service._id,
        tierName: tier.name,
        tierPrice: tier.price,
        deliveryDays: tier.deliveryDays,
      }),
    });

    setAdded(true);
    setAdding(false);
    setTimeout(() => setAdded(false), 3000);
  }

  const tier = service.tiers[selectedTier];

  return (
    <main style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <div className="service-detail">
          {/* Left: content */}
          <div className="service-detail__left">
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              <span className="service-card__category-badge">{service.category}</span>
              {service.tags.map((t) => (
                <span key={t} style={{
                  padding: "3px 10px", borderRadius: "999px", fontSize: "0.72rem",
                  background: "var(--color-surface)", color: "var(--color-text-2)",
                  border: "1px solid var(--color-border)"
                }}>{t}</span>
              ))}
            </div>

            <h1 className="service-detail__title">{service.title}</h1>

            <div className="service-detail__meta">
              <div className="service-card__vendor-avatar" style={{ width: 32, height: 32 }}>
                {service.vendor.avatar
                  ? <Image src={service.vendor.avatar} alt={service.vendor.name} width={32} height={32} />
                  : service.vendor.name?.[0]?.toUpperCase()
                }
              </div>
              <span style={{ fontWeight: 500 }}>{service.vendor.name}</span>
              {service.reviewCount > 0 && (
                <>
                  <span style={{ color: "var(--color-text-2)" }}>·</span>
                  <span style={{ color: "var(--color-gold)" }}>★ {service.rating}</span>
                  <span style={{ color: "var(--color-text-2)", fontSize: "0.85rem" }}>({service.reviewCount} reviews)</span>
                </>
              )}
              <span style={{ color: "var(--color-text-2)" }}>·</span>
              <span style={{ color: "var(--color-text-2)", fontSize: "0.85rem" }}>{service.orderCount} orders</span>
            </div>

            {service.thumbnail && (
              <div className="service-detail__image">
                <Image src={service.thumbnail} alt={service.title} fill style={{ objectFit: "cover", borderRadius: 12 }} />
              </div>
            )}

            <div className="service-detail__description">
              <h2>About This Service</h2>
              <p>{service.description}</p>
            </div>

            {/* Reviews */}
            <div className="service-detail__reviews">
              <h2>Reviews ({reviews.length})</h2>
              {reviews.length === 0 ? (
                <p style={{ color: "var(--color-text-2)" }}>No reviews yet. Be the first!</p>
              ) : (
                reviews.map((r) => (
                  <div key={r._id} className="review-item">
                    <div className="review-item__header">
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div className="service-card__vendor-avatar" style={{ width: 28, height: 28, fontSize: "0.7rem" }}>
                          {r.reviewer.avatar
                            ? <Image src={r.reviewer.avatar} alt={r.reviewer.name} width={28} height={28} />
                            : r.reviewer.name?.[0]?.toUpperCase()
                          }
                        </div>
                        <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{r.reviewer.name}</span>
                      </div>
                      <div style={{ color: "var(--color-gold)", fontSize: "0.875rem" }}>
                        {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                      </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-2)", lineHeight: 1.6 }}>{r.comment}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-2)", marginTop: "4px" }}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right: Order box */}
          <div className="service-detail__right">
            <div className="order-box">
              {/* Tier tabs */}
              <div className="order-box__tiers">
                {service.tiers.map((t, i) => (
                  <button
                    key={t.name}
                    className={`order-box__tier-tab ${selectedTier === i ? "order-box__tier-tab--active" : ""}`}
                    onClick={() => setSelectedTier(i)}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              {/* Selected tier detail */}
              <div className="order-box__body">
                <div className="order-box__price">
                  ${(tier.price / 100).toFixed(0)}
                </div>
                <p className="order-box__tier-desc">{tier.description}</p>
                <div className="order-box__meta">
                  <span>🕒 {tier.deliveryDays} day{tier.deliveryDays > 1 ? "s" : ""} delivery</span>
                </div>
                {tier.features.filter(Boolean).length > 0 && (
                  <ul className="order-box__features">
                    {tier.features.filter(Boolean).map((f, i) => (
                      <li key={i}>✓ {f}</li>
                    ))}
                  </ul>
                )}
              </div>

              <Button
                fullWidth
                size="lg"
                loading={adding}
                onClick={addToCart}
                style={{ marginTop: "auto" }}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </Button>

              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--color-text-2)", marginTop: "12px" }}>
                Contact vendor before ordering for custom requests
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
