"use client";

// components/dashboard/buyer/FavoritesClient.tsx

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface FavoriteItem {
  _id:         string;
  priceAtSave?: number;
  createdAt:   string;
  service: {
    _id:         string;
    title:       string;
    slug:        string;
    thumbnail?:  string;
    category:    string;
    isActive:    boolean;
    rating:      number;
    reviewCount: number;
    tiers:       Array<{ name: string; price: number }>;
    vendor:      { name: string };
  };
}

interface Props { favorites: FavoriteItem[]; }

const CATEGORY_ICONS: Record<string, string> = {
  design: "🎨", development: "💻", marketing: "📣",
  writing: "✍️", video: "🎬", music: "🎵", business: "💼", other: "⚡",
};

export function FavoritesClient({ favorites: initial }: Props) {
  const [favorites, setFavorites] = useState(initial);
  const [removing,  setRemoving]  = useState<string | null>(null);
  const [search,    setSearch]    = useState("");

  const filtered = favorites.filter(f =>
    f.service?.title?.toLowerCase().includes(search.toLowerCase()) ||
    f.service?.category?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleRemove(favoriteId: string) {
    setRemoving(favoriteId);
    await fetch(`/api/favorites/${favoriteId}`, { method: "DELETE" });
    setFavorites(prev => prev.filter(f => f._id !== favoriteId));
    setRemoving(null);
  }

  function getMinPrice(tiers: Array<{ price: number }>) {
    if (!tiers?.length) return 0;
    return Math.min(...tiers.map(t => t.price));
  }

  function priceChanged(fav: FavoriteItem) {
    if (!fav.priceAtSave || !fav.service?.tiers?.length) return null;
    const current = getMinPrice(fav.service.tiers);
    if (current === fav.priceAtSave) return null;
    return { current, previous: fav.priceAtSave, up: current > fav.priceAtSave };
  }

  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">❤️</div>
        <p className="empty-state__title">Sin favoritos aún</p>
        <p className="empty-state__text">Guarda servicios que te interesen para acceder a ellos rápidamente.</p>
        <Link href="/services" style={{ marginTop: "var(--space-5)", display: "inline-block" }}>
          <Button>Explorar servicios</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <div style={{ marginBottom: "var(--space-6)", display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
        <div className="data-table-search" style={{ maxWidth: 400 }}>
          <svg className="data-table-search__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="data-table-search__input"
            placeholder="Buscar en favoritos…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <span style={{ fontSize: "0.8rem", color: "var(--color-text-2)" }}>
          {filtered.length} servicio{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Price change alert */}
      {favorites.some(f => priceChanged(f)) && (
        <div style={{ padding: "14px 18px", background: "rgba(255,209,102,0.1)", border: "1px solid rgba(255,209,102,0.3)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-5)", fontSize: "0.875rem", color: "var(--color-gold)" }}>
          🔔 Algunos servicios en tus favoritos han cambiado de precio desde que los guardaste.
        </div>
      )}

      {/* Grid */}
      <div className="favorites-grid">
        {filtered.map(fav => {
          const svc     = fav.service;
          const changed = priceChanged(fav);
          const minPrice = getMinPrice(svc?.tiers ?? []);

          return (
            <div key={fav._id} className="favorite-card">
              {/* Thumbnail */}
              <div className="favorite-card__thumb">
                {svc?.thumbnail
                  ? <img src={svc.thumbnail} alt={svc.title} />
                  : <span>{CATEGORY_ICONS[svc?.category] ?? "⚡"}</span>
                }
                {!svc?.isActive && (
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "white", fontWeight: 600, background: "var(--color-accent)", padding: "4px 10px", borderRadius: 999 }}>
                      No disponible
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="favorite-card__body">
                <span style={{ fontSize: "0.72rem", color: "var(--color-primary)", background: "var(--color-primary-dim)", padding: "2px 8px", borderRadius: 999, display: "inline-block", marginBottom: "var(--space-2)" }}>
                  {svc?.category}
                </span>
                <p className="favorite-card__title">{svc?.title}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-2)", marginTop: 2 }}>por {svc?.vendor?.name}</p>

                {/* Rating */}
                {svc?.rating > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: "var(--space-2)" }}>
                    <span style={{ color: "var(--color-gold)", fontSize: "0.8rem" }}>★</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{svc.rating.toFixed(1)}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-2)" }}>({svc.reviewCount})</span>
                  </div>
                )}

                {/* Price */}
                <div className="favorite-card__meta">
                  <div>
                    <span className="favorite-card__price">
                      desde ${(minPrice / 100).toFixed(2)}
                    </span>
                    {changed && (
                      <div style={{ marginTop: 4 }}>
                        <span className="price-changed-badge">
                          {changed.up ? "▲" : "▼"} Precio {changed.up ? "subió" : "bajó"}
                        </span>
                        <span style={{ fontSize: "0.7rem", color: "var(--color-text-2)", marginLeft: 6, textDecoration: "line-through" }}>
                          ${(changed.previous / 100).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="favorite-card__actions" style={{ marginTop: "var(--space-3)" }}>
                  {svc?.isActive ? (
                    <Link href={`/services/${svc.slug || svc._id}`} style={{ flex: 1 }}>
                      <Button size="sm" fullWidth>Ver servicio</Button>
                    </Link>
                  ) : (
                    <Button size="sm" fullWidth disabled>No disponible</Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    loading={removing === fav._id}
                    onClick={() => handleRemove(fav._id)}
                    style={{ color: "var(--color-accent)" }}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
