"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

interface Service {
  _id: string;
  title: string;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  orderCount: number;
  rating: number;
  vendor: { name: string };
  tiers: Array<{ price: number }>;
}

export function AdminServicesTable() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    const res = await fetch("/api/services?limit=50");
    const data = await res.json();
    if (data.success) setServices(data.data.services);
    setLoading(false);
  }

  async function toggleFeatured(id: string, current: boolean) {
    await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !current }),
    });
    loadServices();
  }

  async function deleteService(id: string) {
    if (!confirm("Deactivate this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    loadServices();
  }

  return (
    <>
      <div className="data-table-wrapper">
        <div className="data-table-header">
          <h2 className="data-table-title">All Services</h2>
          <Button size="sm" onClick={() => setShowForm(true)}>+ Add Service</Button>
        </div>

        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--color-text-2)" }}>
            Loading…
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Min Price</th>
                <th>Orders</th>
                <th>Rating</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td style={{ fontWeight: 500 }}>{s.title}</td>
                  <td style={{ color: "var(--color-text-2)" }}>{s.vendor?.name}</td>
                  <td>
                    <span className="status-badge status-badge--paid">{s.category}</span>
                  </td>
                  <td>${(Math.min(...s.tiers.map((t) => t.price)) / 100).toFixed(0)}</td>
                  <td>{s.orderCount}</td>
                  <td>{s.rating > 0 ? `★ ${s.rating}` : "—"}</td>
                  <td>
                    <button
                      onClick={() => toggleFeatured(s._id, s.isFeatured)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem" }}
                    >
                      {s.isFeatured ? "⭐" : "☆"}
                    </button>
                  </td>
                  <td>
                    <Button size="sm" variant="danger" onClick={() => deleteService(s._id)}>
                      Deactivate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <AdminServiceModal onClose={() => { setShowForm(false); loadServices(); }} />
      )}
    </>
  );
}

// ── Modal to add a new service ──────────────────────────
function AdminServiceModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "design",
    tags: "",
    isFeatured: false,
    tiers: [
      { name: "Basic",    description: "", price: 2900, deliveryDays: 3,  features: [""] },
      { name: "Standard", description: "", price: 7900, deliveryDays: 7,  features: [""] },
      { name: "Premium",  description: "", price: 14900, deliveryDays: 14, features: [""] },
    ],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) onClose();
    setLoading(false);
  }

  const modalOverlay: React.CSSProperties = {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, padding: "20px",
  };

  const modalBox: React.CSSProperties = {
    background: "var(--color-surface)", borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border)", padding: "32px",
    width: "100%", maxWidth: "600px", maxHeight: "85vh",
    overflowY: "auto",
  };

  return (
    <div style={modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalBox}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", marginBottom: "24px" }}>
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Short Description (max 200 chars)</label>
            <input className="form-input" value={form.shortDescription} maxLength={200}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Full Description</label>
            <textarea className="form-input" rows={4} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ resize: "vertical" }} required />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {["design","development","marketing","writing","video","music","business","other"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Tags (comma separated)</label>
            <input className="form-input" value={form.tags} placeholder="logo, branding, vector"
              onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              Mark as Featured
            </label>
          </div>

          {/* Tiers */}
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem" }}>Pricing Tiers</h3>
          {form.tiers.map((tier, i) => (
            <div key={i} style={{ background: "var(--color-bg-2)", borderRadius: "var(--radius-md)", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>{tier.name}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Price (USD cents, e.g. 2900 = $29)</label>
                  <input className="form-input" type="number" value={tier.price}
                    onChange={(e) => {
                      const tiers = [...form.tiers];
                      tiers[i] = { ...tiers[i], price: parseInt(e.target.value) };
                      setForm({ ...form, tiers });
                    }} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Delivery Days</label>
                  <input className="form-input" type="number" value={tier.deliveryDays}
                    onChange={(e) => {
                      const tiers = [...form.tiers];
                      tiers[i] = { ...tiers[i], deliveryDays: parseInt(e.target.value) };
                      setForm({ ...form, tiers });
                    }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description</label>
                <input className="form-input" value={tier.description}
                  onChange={(e) => {
                    const tiers = [...form.tiers];
                    tiers[i] = { ...tiers[i], description: e.target.value };
                    setForm({ ...form, tiers });
                  }} />
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" }}>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" loading={loading}>Create Service</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
