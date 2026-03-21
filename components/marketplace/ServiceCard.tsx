"use client";

// components/marketplace/ServiceCard.tsx
// Client component para poder manejar el estado del favorito

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import "@/styles/services/services.css";

const CATEGORY_ICONS: Record<string, string> = {
  design: "🎨", development: "💻", marketing: "📣",
  writing: "✍️", video: "🎬", music: "🎵", business: "💼", other: "⚡",
};

interface Props {
  service: {
    _id:          string;
    title:        string;
    slug?:        string;
    category:     string;
    thumbnail?:   string;
    tiers:        Array<{ name: string; price: number }>;
    vendor:       { name: string; avatar?: string };
    rating:       number;
    reviewCount:  number;
    isFeatured?:  boolean;
  };
  initialFaved?: boolean;
}

export function ServiceCard({ service, initialFaved = false }: Props) {
  const { data: session } = useSession();
  const user              = session?.user as any;

  const [faved,    setFaved]    = useState(initialFaved);
  const [favLoading, setFavLoading] = useState(false);

  const minPrice = service.tiers?.length
    ? Math.min(...service.tiers.map(t => t.price))
    : 0;

  const href = `/services/${service.slug || service._id}`;

  async function toggleFav(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!session) { window.location.href = "/login"; return; }
    if (favLoading) return;

    setFavLoading(true);
    if (faved) {
      // Para eliminar necesitamos el favoriteId — simplificamos buscando por service
      await fetch(`/api/favorites?serviceId=${service._id}`, { method: "DELETE" });
      setFaved(false);
    } else {
      const res  = await fetch("/api/favorites", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ serviceId: service._id }),
      });
      if (res.ok) setFaved(true);
    }
    setFavLoading(false);
  }

  const canFav = user && (user.role === "buyer" || user.role === "vendor");

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <article className="service-card">
        {/* Thumbnail */}
        <div className="service-card__thumb">
          {service.thumbnail
            ? <Image src={service.thumbnail} alt={service.title} fill style={{ objectFit: "cover" }} />
            : <span>{CATEGORY_ICONS[service.category] ?? "⚡"}</span>
          }
          {service.isFeatured && (
            <span className="service-card__featured-badge">⭐ Featured</span>
          )}
          {/* Fav button */}
          {canFav && (
            <button
              className={`service-card__fav-btn${faved ? " service-card__fav-btn--active" : ""}`}
              onClick={toggleFav}
              title={faved ? "Quitar de favoritos" : "Guardar en favoritos"}
              disabled={favLoading}
            >
              {faved ? "❤️" : "🤍"}
            </button>
          )}
        </div>

        {/* Body */}
        <div className="service-card__body">
          <span className="service-card__category-badge">{service.category}</span>

          <div className="service-card__vendor">
            <div className="service-card__vendor-avatar">
              {service.vendor?.avatar
                ? <Image src={service.vendor.avatar} alt={service.vendor.name} width={22} height={22} />
                : (service.vendor?.name?.[0] ?? "V").toUpperCase()
              }
            </div>
            {service.vendor?.name}
          </div>

          <h3 className="service-card__title">{service.title}</h3>

          <div className="service-card__footer">
            <div className="service-card__rating">
              <span className="service-card__rating-star">★</span>
              <span>{service.rating > 0 ? service.rating.toFixed(1) : "New"}</span>
              {service.reviewCount > 0 && (
                <span className="service-card__rating-count">({service.reviewCount})</span>
              )}
            </div>
            <div className="service-card__price">
              <span className="service-card__price-label">From </span>
              ${(minPrice / 100).toFixed(0)}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
