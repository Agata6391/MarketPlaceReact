"use client";

// components/marketplace/ServiceDetailClient.tsx

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/services/services.css";

const CATEGORY_ICONS: Record<string, string> = {
  design: "🎨", development: "💻", marketing: "📣",
  writing: "✍️", video: "🎬", music: "🎵", business: "💼", other: "⚡",
};

interface Tier {
  name:         string;
  price:        number;
  description:  string;
  deliveryDays: number;
  features:     string[];
}

interface Review {
  _id:      string;
  rating:   number;
  comment:  string;
  createdAt: string;
  reviewer: { name: string; avatar?: string };
}

interface Props {
  service: {
    _id:              string;
    title:            string;
    slug?:            string;
    description:      string;
    shortDescription?: string;
    category:         string;
    tags?:            string[];
    thumbnail?:       string;
    tiers:            Tier[];
    rating:           number;
    reviewCount:      number;
    orderCount:       number;
    isFeatured?:      boolean;
    vendor: { name: string; avatar?: string; createdAt: string };
  };
  reviews:   Review[];
  isFaved:   boolean;
  userId?:   string | null;
  userRole?: string | null;
}

export function ServiceDetailClient({ service, reviews, isFaved: initialFaved, userId, userRole }: Props) {
  const router = useRouter();

  const [selectedTier,  setSelectedTier]  = useState(0);
  const [faved,         setFaved]         = useState(initialFaved);
  const [favLoading,    setFavLoading]    = useState(false);
  const [cartLoading,   setCartLoading]   = useState(false);
  const [cartMsg,       setCartMsg]       = useState("");

  const tier = service.tiers[selectedTier];
  const canFav = userId && (userRole === "buyer" || userRole === "vendor");

  async function handleAddToCart() {
    if (!userId) { router.push("/login"); return; }
    setCartLoading(true); setCartMsg("");
    const res  = await fetch("/api/cart", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        serviceId:    service._id,
        tierName:     tier.name,
        tierPrice:    tier.price,
        deliveryDays: tier.deliveryDays,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setCartMsg("✅ Agregado al carrito");
      setTimeout(() => setCartMsg(""), 3000);
    } else {
      setCartMsg("⚠️ " + (data.error ?? "Error al agregar"));
    }
    setCartLoading(false);
  }

  async function toggleFav() {
    if (!userId) { router.push("/login"); return; }
    setFavLoading(true);
    if (faved) {
      await fetch(`/api/favorites?serviceId=${service._id}`, { method: "DELETE" });
      setFaved(false);
    } else {
      const res = await fetch("/api/favorites", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ serviceId: service._id }),
      });
      if (res.ok) setFaved(true);
    }
    setFavLoading(false);
  }

  function stars(n: number) {
    return "★".repeat(n) + "☆".repeat(5 - n);
  }

  const vendorSince = service.vendor?.createdAt
    ? new Date(service.vendor.createdAt).getFullYear()
    : null;

  return (
    <div className="service-detail">
      <div className="service-detail__inner">

        {/* ── Left column ── */}
        <div>
          {/* Breadcrumb */}
          <nav className="service-detail__breadcrumb">
            <Link href="/">Inicio</Link>
            <span>›</span>
            <Link href="/services">Servicios</Link>
            <span>›</span>
            <Link href={`/services?category=${service.category}`} style={{ textTransform: "capitalize" }}>
              {service.category}
            </Link>
            <span>›</span>
            <span style={{ color: "var(--color-text)" }}>{service.title}</span>
          </nav>

          {/* Thumbnail */}
          <div className="service-detail__thumb">
            {service.thumbnail
              ? <Image src={service.thumbnail} alt={service.title} fill style={{ objectFit: "cover" }} />
              : <span>{CATEGORY_ICONS[service.category] ?? "⚡"}</span>
            }
          </div>

          {/* Header */}
          <div className="service-detail__header">
            <div className="service-detail__badges">
              <span className="service-detail__category">{service.category}</span>
              {service.isFeatured && (
                <span className="service-detail__featured">⭐ Destacado</span>
              )}
            </div>

            <h1 className="service-detail__title">{service.title}</h1>

            <div className="service-detail__meta">
              {service.rating > 0 && (
                <div className="service-detail__rating">
                  <span className="service-detail__rating-star">★</span>
                  <span className="service-detail__rating-value">{service.rating.toFixed(1)}</span>
                  <span className="service-detail__rating-count">({service.reviewCount} reseñas)</span>
                </div>
              )}
              {service.orderCount > 0 && (
                <span className="service-detail__orders">
                  📦 {service.orderCount} pedidos
                </span>
              )}
            </div>
          </div>

          {/* Vendor */}
          <div className="vendor-card">
            <div className="vendor-card__avatar">
              {service.vendor?.avatar
                ? <Image src={service.vendor.avatar} alt={service.vendor.name} width={52} height={52} style={{ objectFit: "cover" }} />
                : (service.vendor?.name?.[0] ?? "V").toUpperCase()
              }
            </div>
            <div className="vendor-card__info">
              <p className="vendor-card__label">Vendor</p>
              <p className="vendor-card__name">{service.vendor?.name}</p>
              {vendorSince && (
                <p className="vendor-card__since">Miembro desde {vendorSince}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="service-detail__section">
            <h2 className="service-detail__section-title">Sobre este servicio</h2>
            <p className="service-detail__description">{service.description}</p>
          </div>

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <div className="service-detail__section">
              <h2 className="service-detail__section-title">Tags</h2>
              <div className="service-detail__tags">
                {service.tags.map(tag => (
                  <Link key={tag} href={`/services?q=${encodeURIComponent(tag)}`} className="service-detail__tag">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="service-detail__section">
            <h2 className="service-detail__section-title">
              Reseñas {reviews.length > 0 && `(${reviews.length})`}
            </h2>

            {reviews.length === 0 ? (
              <div style={{ padding: "var(--space-8)", textAlign: "center", color: "var(--color-text-2)", background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
                <p style={{ fontSize: "1.5rem", marginBottom: "var(--space-2)" }}>⭐</p>
                <p>Sé el primero en dejar una reseña.</p>
              </div>
            ) : (
              <div className="review-list">
                {reviews.map(r => (
                  <div key={r._id} className="review-item">
                    <div className="review-item__header">
                      <div className="review-item__user">
                        <div className="review-item__avatar">
                          {r.reviewer?.avatar
                            ? <Image src={r.reviewer.avatar} alt={r.reviewer.name} width={36} height={36} style={{ objectFit: "cover", borderRadius: "50%" }} />
                            : (r.reviewer?.name?.[0] ?? "U").toUpperCase()
                          }
                        </div>
                        <div>
                          <p className="review-item__name">{r.reviewer?.name}</p>
                          <p className="review-item__date">
                            {new Date(r.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <span className="review-item__stars">{stars(r.rating)}</span>
                    </div>
                    <p className="review-item__comment">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right column: Order box ── */}
        <div>
          <div className="order-box">
            {/* Tier tabs */}
            <div className="tier-tabs">
              {service.tiers.map((t, i) => (
                <button
                  key={t.name}
                  className={`tier-tab${selectedTier === i ? " tier-tab--active" : ""}`}
                  onClick={() => setSelectedTier(i)}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {/* Tier content */}
            <div className="tier-content">
              <div className="tier-price">
                <span className="tier-price__amount">${(tier.price / 100).toFixed(2)}</span>
                <span className="tier-price__period">USD</span>
              </div>

              {tier.description && (
                <p className="tier-description">{tier.description}</p>
              )}

              <div className="tier-delivery">
                <span>📅</span>
                <span>{tier.deliveryDays} día{tier.deliveryDays !== 1 ? "s" : ""} de entrega</span>
              </div>

              {tier.features?.filter(f => f).length > 0 && (
                <ul className="tier-features">
                  {tier.features.filter(f => f).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="order-box__actions">
              <button
                className="btn btn--primary btn--full"
                onClick={handleAddToCart}
                disabled={cartLoading}
                style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem", padding: "14px", borderRadius: "var(--radius-full)" }}
              >
                {cartLoading ? "Agregando…" : "Agregar al carrito"}
              </button>

              {cartMsg && (
                <p style={{ fontSize: "0.8rem", textAlign: "center", color: cartMsg.startsWith("✅") ? "var(--color-green)" : "var(--color-accent)" }}>
                  {cartMsg}
                </p>
              )}

              {canFav && (
                <button
                  className={`fav-btn${faved ? " fav-btn--active" : ""}`}
                  onClick={toggleFav}
                  disabled={favLoading}
                >
                  {faved ? "❤️ En favoritos" : "🤍 Guardar en favoritos"}
                </button>
              )}

              {!userId && (
                <p style={{ fontSize: "0.78rem", textAlign: "center", color: "var(--color-text-2)" }}>
                  <Link href="/login" style={{ color: "var(--color-primary)" }}>Inicia sesión</Link> para contratar
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
