"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import "@/styles/pages/services-list.css";

const CATEGORIES = ["all","design","development","marketing","writing","video","music","business","other"];

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const category = searchParams.get("category") ?? "all";
  const q = searchParams.get("q") ?? "";

  const loadServices = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      limit: "12",
    });
    if (category && category !== "all") params.set("category", category);
    if (q) params.set("q", q);

    const res = await fetch(`/api/services?${params}`);
    const data = await res.json();

    if (data.success) {
      setServices(data.data.services);
      setTotalPages(data.data.pagination.totalPages);
    }
    setLoading(false);
  }, [category, q, page]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  function setCategory(cat: string) {
    const p = new URLSearchParams(searchParams.toString());
    if (cat === "all") p.delete("category");
    else p.set("category", cat);
    p.delete("page");
    router.push(`/services?${p}`);
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-height)" }}>
        <div className="services-page">
          <div className="container">
            {/* Header */}
            <div className="services-page__header">
              <h1 className="services-page__title">
                {q ? `Results for "${q}"` : category !== "all" ? `${category.charAt(0).toUpperCase() + category.slice(1)} Services` : "All Services"}
              </h1>
              <p style={{ color: "var(--color-text-2)" }}>
                {loading ? "Loading…" : `${services.length} services found`}
              </p>
            </div>

            {/* Category filter tabs */}
            <div className="category-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`category-tab ${(category === cat || (cat === "all" && !searchParams.get("category"))) ? "category-tab--active" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Grid */}
            {loading ? (
              <div className="services-page__skeleton">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton-card" />
                ))}
              </div>
            ) : services.length === 0 ? (
              <div style={{ padding: "80px", textAlign: "center", color: "var(--color-text-2)" }}>
                No services found. Try a different search or category.
              </div>
            ) : (
              <div className="services__grid">
                {services.map((s) => <ServiceCard key={s._id} service={s} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="services-page__pagination">
                <button
                  className="pagination-btn"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Prev
                </button>
                <span style={{ color: "var(--color-text-2)", fontSize: "0.875rem" }}>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
