import Link from "next/link";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { Navbar } from "@/components/layout/Navbar";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import "@/styles/pages/landing.css";
import "@/styles/components/button.css";

const CATEGORIES = [
  { id: "design",      label: "Design",      icon: "🎨", desc: "Logos, branding, UI/UX" },
  { id: "development", label: "Development",  icon: "💻", desc: "Web, mobile, apps" },
  { id: "marketing",   label: "Marketing",   icon: "📣", desc: "SEO, ads, social media" },
  { id: "writing",     label: "Writing",     icon: "✍️", desc: "Content, copywriting" },
  { id: "video",       label: "Video",       icon: "🎬", desc: "Editing, animation" },
  { id: "music",       label: "Music",       icon: "🎵", desc: "Beats, mixing, vocals" },
  { id: "business",    label: "Business",    icon: "💼", desc: "Consulting, strategy" },
  { id: "other",       label: "Other",       icon: "⚡", desc: "Anything else" },
];

// ─────────────────────────────────────────────────────────────
// OLD (kept for reference)
// async function getFeaturedServices() {
//   await connectDB();
//   const services = await ServiceModel.find({ isActive: true, isFeatured: true })
//     .populate("vendor", "name avatar")
//     .limit(8)
//     .lean();
//   return JSON.parse(JSON.stringify(services));
// }

// NEW
async function getFeaturedServices() {
  const db = await connectDB();
  if (!db) return [];

  const services = await ServiceModel.find({ isActive: true, isFeatured: true })
    .populate("vendor", "name avatar")
    .limit(8)
    .lean();

  return JSON.parse(JSON.stringify(services));
}

// ─────────────────────────────────────────────────────────────
// OLD (kept for reference)
// async function getLatestServices() {
//   await connectDB();
//   const services = await ServiceModel.find({ isActive: true })
//     .populate("vendor", "name avatar")
//     .sort({ createdAt: -1 })
//     .limit(12)
//     .lean();
//   return JSON.parse(JSON.stringify(services));
// }

// NEW
async function getLatestServices() {
  const db = await connectDB();
  if (!db) return [];

  const services = await ServiceModel.find({ isActive: true })
    .populate("vendor", "name avatar")
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  return JSON.parse(JSON.stringify(services));
}

export default async function HomePage() {
  const [featured, latest] = await Promise.all([
    getFeaturedServices(),
    getLatestServices(),
  ]);

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ──────────────────────────────────────── */}
        <section className="hero">
          <div className="hero__bg-gradient" />
          <div className="hero__grid" />

          <div className="container hero__content">
            <span className="hero__eyebrow">
              <span className="hero__eyebrow-dot" />
              Freelance Services Marketplace
            </span>

            <h1 className="hero__title">
              <span className="hero__title-line">Find the perfect</span>
              <span className="hero__title-line hero__title-line--accent">freelance service</span>
              <span className="hero__title-line">for your project.</span>
            </h1>

            <p className="hero__subtitle">
              Hire top freelancers for design, development, marketing, and more.
              Quality work delivered on time, every time.
            </p>

            <div className="hero__actions">
              <Link href="/services" className="btn btn--primary btn--lg">
                Browse Services
              </Link>
              <Link href="/register?role=vendor" className="btn btn--secondary btn--lg">
                Sell Your Skills
              </Link>
            </div>

            <div className="hero__stats">
              <div>
                <p className="hero__stat-value">10k+</p>
                <p className="hero__stat-label">Services available</p>
              </div>
              <div>
                <p className="hero__stat-value">5k+</p>
                <p className="hero__stat-label">Expert freelancers</p>
              </div>
              <div>
                <p className="hero__stat-value">98%</p>
                <p className="hero__stat-label">Satisfaction rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Categories ────────────────────────────────── */}
        <section className="categories">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Browse Categories</h2>
              <Link href="/services" className="section-link">
                View all →
              </Link>
            </div>

            <div className="categories__grid">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/services?category=${cat.id}`} style={{ textDecoration: "none" }}>
                  <div className="category-card">
                    <div className="category-card__icon">{cat.icon}</div>
                    <p className="category-card__name">{cat.label}</p>
                    <p className="category-card__count">{cat.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Services ─────────────────────────── */}
        {featured.length > 0 && (
          <section className="services-section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">⭐ Featured Services</h2>
                <Link href="/services?featured=true" className="section-link">
                  See all →
                </Link>
              </div>
              <div className="services__grid">
                {featured.map((s: any) => (
                  <ServiceCard key={s._id} service={s} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Become a Vendor Banner ────────────────────── */}
        <div className="container">
          <div className="featured-banner">
            <div className="featured-banner__text">
              <h2>Start selling your skills today</h2>
earning on Octupus. Set your rates, showcase your portfolio, and get hired.
            </div>
            <Link href="/register?role=vendor" className="btn btn--primary btn--lg">
              Become a Vendor
            </Link>
          </div>
        </div>

        {/* ── Latest Services ───────────────────────────── */}
        <section className="services-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Latest Services</h2>
              <Link href="/services" className="section-link">
                View all →
              </Link>
            </div>
            <div className="services__grid">
              {latest.map((s: any) => (
                <ServiceCard key={s._id} service={s} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}