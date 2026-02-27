import Link from "next/link";
import Image from "next/image";
import "@/styles/components/service-card.css";

const CATEGORY_ICONS: Record<string, string> = {
  design: "🎨",
  development: "💻",
  marketing: "📣",
  writing: "✍️",
  video: "🎬",
  music: "🎵",
  business: "💼",
  other: "⚡",
};

interface ServiceCardProps {
  service: {
    _id: string;
    title: string;
    category: string;
    thumbnail?: string;
    tiers: Array<{ name: string; price: number }>;
    vendor: { name: string; avatar?: string };
    rating: number;
    reviewCount: number;
    isFeatured?: boolean;
  };
}

export function ServiceCard({ service }: ServiceCardProps) {
  const minPrice = Math.min(...service.tiers.map((t) => t.price));

  return (
    <Link href={`/services/${service._id}`} style={{ textDecoration: "none" }}>
      <article className="service-card">
        {/* Thumbnail */}
        <div className="service-card__thumb">
          {service.thumbnail ? (
            <Image src={service.thumbnail} alt={service.title} fill style={{ objectFit: "cover" }} />
          ) : (
            <div className="service-card__thumb-placeholder">
              {CATEGORY_ICONS[service.category] ?? "⚡"}
            </div>
          )}
          {service.isFeatured && (
            <span className="service-card__featured-badge">⭐ Featured</span>
          )}
        </div>

        {/* Body */}
        <div className="service-card__body">
          <span className="service-card__category-badge">{service.category}</span>

          <div className="service-card__vendor">
            <div className="service-card__vendor-avatar">
              {service.vendor.avatar ? (
                <Image src={service.vendor.avatar} alt={service.vendor.name} width={24} height={24} />
              ) : (
                service.vendor.name?.[0]?.toUpperCase()
              )}
            </div>
            {service.vendor.name}
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
