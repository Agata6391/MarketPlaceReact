"use client";

// components/dashboard/admin/AdminServicesManager.tsx

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import "@/styles/dashboard/dashboard.css";

interface Service {
  _id:         string;
  title:       string;
  slug?:       string;
  category:    string;
  isActive:    boolean;
  isFeatured:  boolean;
  orderCount:  number;
  reviewCount: number;
  rating:      number;
  createdAt:   string;
  vendor:      { name: string; email: string };
  tiers:       Array<{ price: number }>;
}

const CATEGORIES = ["design","development","marketing","writing","video","music","business","other"];

export function AdminServicesManager() {
  const [services,   setServices]   = useState<Service[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [searchVal,  setSearchVal]  = useState("");
  const [catFilter,  setCatFilter]  = useState("all");
  const [showForm,   setShowForm]   = useState(false);
  const [acting,     setActing]     = useState<string | null>(null);

  const loadServices = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "100" });
    if (search)              params.set("q", search);
    if (catFilter !== "all") params.set("category", catFilter);
    const res  = await fetch(`/api/services?${params}`);
    const data = await res.json();
    if (data.success) setServices(data.data.services);
    setLoading(false);
  }, [search, catFilter]);

  useEffect(() => { loadServices(); }, [loadServices]);

  async function toggleFeatured(id: string, current: boolean) {
    setActing(id);
    await fetch(`/api/services/${id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ isFeatured: !current }),
    });
    await loadServices();
    setActing(null);
  }

  async function toggleActive(id: string, current: boolean) {
    if (!confirm(current ? "¿Desactivar este servicio?" : "¿Reactivar este servicio?")) return;
    setActing(id);
    await fetch(`/api/services/${id}`, { method: current ? "DELETE" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !current }),
    });
    await loadServices();
    setActing(null);
  }

  return (
    <>
      <div className="data-table-wrapper">
        <div className="data-table-header">
          <h2 className="data-table-title">{loading ? "Cargando…" : `${services.length} servicios`}</h2>

          {/* Search */}
          <div className="data-table-search">
            <svg className="data-table-search__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="data-table-search__input"
              placeholder="Buscar servicio…"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onKeyDown={e => e.key === "Enter" && setSearch(searchVal)}
            />
          </div>

          <Button size="sm" onClick={() => setShowForm(true)}>+ Nuevo servicio</Button>
        </div>

        {/* Category filter */}
        <div style={{ padding: "var(--space-3) var(--space-6)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="filter-tabs">
            {["all", ...CATEGORIES].map(c => (
              <button key={c} className={`filter-tab${catFilter === c ? " filter-tab--active" : ""}`} onClick={() => setCatFilter(c)}>
                {c === "all" ? "Todos" : c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="empty-state"><div className="empty-state__icon">⏳</div><p>Cargando…</p></div>
        ) : services.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">🛠️</div>
            <p className="empty-state__title">Sin servicios</p>
            <p className="empty-state__text">No hay servicios con ese criterio.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Vendor</th>
                <th>Categoría</th>
                <th>Precio min.</th>
                <th>Pedidos</th>
                <th>Rating</th>
                <th>Featured</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s._id}>
                  <td>
                    <div style={{ fontWeight: 500, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--color-text-2)" }}>
                      {new Date(s.createdAt).toLocaleDateString("es-ES")}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: "0.875rem" }}>{s.vendor?.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--color-text-2)" }}>{s.vendor?.email}</div>
                  </td>
                  <td><span className="status-badge status-badge--paid">{s.category}</span></td>
                  <td style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                    ${s.tiers?.length ? (Math.min(...s.tiers.map(t => t.price)) / 100).toFixed(0) : "—"}
                  </td>
                  <td>{s.orderCount}</td>
                  <td>
                    {s.rating > 0
                      ? <span style={{ color: "var(--color-gold)" }}>★ {s.rating.toFixed(1)}</span>
                      : <span style={{ color: "var(--color-text-2)" }}>—</span>}
                  </td>
                  <td>
                    <button
                      onClick={() => toggleFeatured(s._id, s.isFeatured)}
                      disabled={acting === s._id}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem" }}
                      title={s.isFeatured ? "Quitar destacado" : "Marcar como destacado"}
                    >
                      {s.isFeatured ? "⭐" : "☆"}
                    </button>
                  </td>
                  <td>
                    <span className={`status-badge ${s.isActive ? "status-badge--paid" : "status-badge--cancelled"}`}>
                      {s.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "var(--space-2)" }}>
                      <Link href={`/services/${s.slug || s._id}`} target="_blank">
                        <Button size="sm" variant="ghost">Ver</Button>
                      </Link>
                      <Button
                        size="sm"
                        variant={s.isActive ? "danger" : "secondary"}
                        loading={acting === s._id}
                        onClick={() => toggleActive(s._id, s.isActive)}
                      >
                        {s.isActive ? "Desactivar" : "Activar"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <ServiceFormModal
          onClose={() => { setShowForm(false); loadServices(); }}
          isAdmin={true}
        />
      )}
    </>
  );
}

// ── Modal compartido para crear servicio ──────────────────

export function ServiceFormModal({
  onClose,
  isAdmin = false,
}: {
  onClose: () => void;
  isAdmin?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [form,    setForm]    = useState({
    title:            "",
    shortDescription: "",
    description:      "",
    category:         "design",
    tags:             "",
    isFeatured:       false,
    tiers: [
      { name: "Basic",    description: "", price: 2900,  deliveryDays: 3,  features: "" },
      { name: "Standard", description: "", price: 7900,  deliveryDays: 7,  features: "" },
      { name: "Premium",  description: "", price: 14900, deliveryDays: 14, features: "" },
    ],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      tiers: form.tiers.map(t => ({
        ...t,
        features: t.features.split("\n").map(f => f.trim()).filter(Boolean),
      })),
    };

    const res  = await fetch("/api/services", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.success) onClose();
    else setError(data.error ?? "Error al crear el servicio");
    setLoading(false);
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem" }}>Nuevo servicio</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-2)", fontSize: "1.4rem" }}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>

            {error && (
              <div style={{ padding: "12px 16px", background: "var(--color-accent-dim)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: "var(--radius-md)", color: "var(--color-accent)", fontSize: "0.875rem" }}>
                ⚠️ {error}
              </div>
            )}

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Título *</label>
              <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Ej: Diseño de Logo Profesional" />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Descripción corta (máx 200 chars) *</label>
              <input className="form-input" value={form.shortDescription} maxLength={200} onChange={e => setForm({ ...form, shortDescription: e.target.value })} required />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Descripción completa *</label>
              <textarea className="form-input" rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: "vertical" }} required />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Categoría *</label>
                <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Tags (separados por coma)</label>
                <input className="form-input" value={form.tags} placeholder="logo, branding, vector" onChange={e => setForm({ ...form, tags: e.target.value })} />
              </div>
            </div>

            {isAdmin && (
              <label style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", cursor: "pointer", fontSize: "0.875rem" }}>
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
                Marcar como Featured
              </label>
            )}

            {/* Tiers */}
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 600, marginBottom: "var(--space-3)" }}>Paquetes de precio</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {form.tiers.map((tier, i) => (
                  <div key={i} style={{ background: "var(--color-bg-2)", borderRadius: "var(--radius-md)", padding: "var(--space-4)" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "var(--space-3)", color: "var(--color-primary)" }}>{tier.name}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Precio (centavos, $29 = 2900)</label>
                        <input className="form-input" type="number" min={0} value={tier.price}
                          onChange={e => { const t = [...form.tiers]; t[i] = { ...t[i], price: parseInt(e.target.value) || 0 }; setForm({ ...form, tiers: t }); }} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Días de entrega</label>
                        <input className="form-input" type="number" min={1} value={tier.deliveryDays}
                          onChange={e => { const t = [...form.tiers]; t[i] = { ...t[i], deliveryDays: parseInt(e.target.value) || 1 }; setForm({ ...form, tiers: t }); }} />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, marginTop: "var(--space-3)" }}>
                      <label className="form-label">Descripción del paquete</label>
                      <input className="form-input" value={tier.description}
                        onChange={e => { const t = [...form.tiers]; t[i] = { ...t[i], description: e.target.value }; setForm({ ...form, tiers: t }); }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, marginTop: "var(--space-3)" }}>
                      <label className="form-label">Qué incluye (una por línea)</label>
                      <textarea className="form-input" rows={3} value={tier.features} placeholder={"Revisiones ilimitadas\nEntrega en PNG y SVG\nFuente original"}
                        style={{ resize: "vertical" }}
                        onChange={e => { const t = [...form.tiers]; t[i] = { ...t[i], features: e.target.value }; setForm({ ...form, tiers: t }); }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: "16px 24px", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "flex-end", gap: "var(--space-3)" }}>
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit" loading={loading}>Publicar servicio</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
