"use client";

// components/dashboard/admin/AdminReviewsTable.tsx

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Review {
  _id:      string;
  rating:   number;
  comment:  string;
  createdAt: string;
  reviewer: { name: string; email: string };
  service:  { title: string; category: string };
  vendor:   { name: string };
}

interface Props { reviews: Review[]; }

export function AdminReviewsTable({ reviews: initial }: Props) {
  const [reviews, setReviews] = useState(initial);
  const [search,  setSearch]  = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = reviews.filter(r =>
    r.service?.title?.toLowerCase().includes(search.toLowerCase()) ||
    r.reviewer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.comment?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta reseña permanentemente?")) return;
    setDeleting(id);
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    setReviews(prev => prev.filter(r => r._id !== id));
    setDeleting(null);
  }

  function stars(n: number) {
    return "★".repeat(n) + "☆".repeat(5 - n);
  }

  return (
    <div className="data-table-wrapper">
      <div className="data-table-header">
        <h2 className="data-table-title">{filtered.length} reseñas</h2>
        <div className="data-table-search">
          <svg className="data-table-search__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="data-table-search__input"
            placeholder="Buscar por servicio, usuario o comentario…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">⭐</div>
          <p className="empty-state__title">No hay reseñas</p>
          <p className="empty-state__text">No se encontraron reseñas con ese criterio.</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Reviewer</th>
              <th>Vendor</th>
              <th>Rating</th>
              <th>Comentario</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r._id}>
                <td>
                  <div style={{ fontWeight: 500, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.service?.title}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--color-text-2)" }}>{r.service?.category}</div>
                </td>
                <td>
                  <div style={{ fontSize: "0.875rem" }}>{r.reviewer?.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--color-text-2)" }}>{r.reviewer?.email}</div>
                </td>
                <td style={{ fontSize: "0.875rem", color: "var(--color-text-2)" }}>{r.vendor?.name}</td>
                <td>
                  <span style={{ color: "var(--color-gold)", fontFamily: "var(--font-heading)", fontSize: "0.9rem" }}>
                    {stars(r.rating)}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-2)", marginLeft: 4 }}>{r.rating}/5</span>
                </td>
                <td style={{ maxWidth: 240 }}>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.comment}
                  </p>
                </td>
                <td style={{ fontSize: "0.8rem", color: "var(--color-text-2)", whiteSpace: "nowrap" }}>
                  {new Date(r.createdAt).toLocaleDateString("es-ES")}
                </td>
                <td>
                  <Button
                    size="sm" variant="danger"
                    loading={deleting === r._id}
                    onClick={() => handleDelete(r._id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
