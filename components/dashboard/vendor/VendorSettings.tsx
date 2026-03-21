"use client";

// components/dashboard/vendor/VendorSettings.tsx

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  user: {
    _id:    string;
    name:   string;
    email:  string;
    avatar?: string;
    bio?:   string;
  };
}

type Tab = "profile" | "password" | "notifications";

export function VendorSettings({ user }: Props) {
  const [tab,     setTab]     = useState<Tab>("profile");
  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState("");
  const [error,   setError]   = useState("");

  const [profile, setProfile] = useState({
    name:  user.name  ?? "",
    email: user.email ?? "",
    bio:   (user as any).bio ?? "",
  });

  const [passwords, setPasswords] = useState({
    current: "", next: "", confirm: "",
  });

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSuccess(""); setError("");
    try {
      const res  = await fetch(`/api/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profile.name, bio: profile.bio }),
      });
      const data = await res.json();
      if (data.success) setSuccess("Perfil actualizado correctamente.");
      else setError(data.error ?? "Error al guardar.");
    } catch { setError("Error de conexión."); }
    setSaving(false);
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) { setError("Las contraseñas no coinciden."); return; }
    setSaving(true); setSuccess(""); setError("");
    try {
      const res  = await fetch(`/api/users/${user._id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current: passwords.current, next: passwords.next }),
      });
      const data = await res.json();
      if (data.success) { setSuccess("Contraseña actualizada."); setPasswords({ current: "", next: "", confirm: "" }); }
      else setError(data.error ?? "Error al cambiar contraseña.");
    } catch { setError("Error de conexión."); }
    setSaving(false);
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "profile",       label: "Perfil",        icon: "👤" },
    { id: "password",      label: "Contraseña",    icon: "🔒" },
    { id: "notifications", label: "Notificaciones", icon: "🔔" },
  ];

  return (
    <div className="settings-grid">
      {/* Settings nav */}
      <div className="settings-nav">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`settings-nav__item${tab === t.id ? " settings-nav__item--active" : ""}`}
            onClick={() => { setTab(t.id); setSuccess(""); setError(""); }}
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {success && (
          <div style={{ padding: "12px 16px", background: "rgba(6,214,160,0.1)", border: "1px solid rgba(6,214,160,0.3)", borderRadius: "var(--radius-md)", color: "var(--color-green)", fontSize: "0.875rem", marginBottom: "var(--space-5)" }}>
            ✅ {success}
          </div>
        )}
        {error && (
          <div style={{ padding: "12px 16px", background: "var(--color-accent-dim)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: "var(--radius-md)", color: "var(--color-accent)", fontSize: "0.875rem", marginBottom: "var(--space-5)" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Profile tab */}
        {tab === "profile" && (
          <div className="section-card">
            <div className="section-card__header">
              <h3 className="section-card__title">Información de perfil</h3>
            </div>
            <div className="section-card__body">
              <form onSubmit={saveProfile} className="settings-form">
                <div className="settings-field">
                  <label className="settings-label">Nombre completo</label>
                  <input className="settings-input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} required />
                </div>
                <div className="settings-field">
                  <label className="settings-label">Email</label>
                  <input className="settings-input" value={profile.email} disabled style={{ opacity: 0.6, cursor: "not-allowed" }} />
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-2)", marginTop: 4 }}>El email no se puede cambiar desde aquí.</p>
                </div>
                <div className="settings-field">
                  <label className="settings-label">Biografía (visible en tu perfil)</label>
                  <textarea className="settings-input" rows={4} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} placeholder="Cuéntale a los clientes sobre ti y tu experiencia…" style={{ resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit" loading={saving}>Guardar cambios</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Password tab */}
        {tab === "password" && (
          <div className="section-card">
            <div className="section-card__header">
              <h3 className="section-card__title">Cambiar contraseña</h3>
            </div>
            <div className="section-card__body">
              <form onSubmit={savePassword} className="settings-form">
                <div className="settings-field">
                  <label className="settings-label">Contraseña actual</label>
                  <input className="settings-input" type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} required />
                </div>
                <div className="settings-field">
                  <label className="settings-label">Nueva contraseña</label>
                  <input className="settings-input" type="password" value={passwords.next} onChange={e => setPasswords({ ...passwords, next: e.target.value })} required minLength={8} />
                </div>
                <div className="settings-field">
                  <label className="settings-label">Confirmar nueva contraseña</label>
                  <input className="settings-input" type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} required />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit" loading={saving}>Cambiar contraseña</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notifications tab */}
        {tab === "notifications" && (
          <div className="section-card">
            <div className="section-card__header">
              <h3 className="section-card__title">Preferencias de notificaciones</h3>
            </div>
            <div className="section-card__body">
              <p style={{ color: "var(--color-text-2)", fontSize: "0.875rem", marginBottom: "var(--space-5)" }}>
                Próximamente — las notificaciones por email estarán disponibles en la siguiente versión.
              </p>
              {[
                { label: "Nueva orden recibida",       desc: "Cuando un comprador contrata tu servicio" },
                { label: "Solicitud de cancelación",   desc: "Cuando un comprador pide cancelar" },
                { label: "Reseña nueva",               desc: "Cuando alguien deja una reseña de tu servicio" },
                { label: "Pago procesado",             desc: "Confirmación de pagos recibidos" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-4) 0", borderBottom: "1px solid var(--color-border)" }}>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-2)" }}>{item.desc}</p>
                  </div>
                  <div style={{ width: 44, height: 24, background: "var(--color-surface-2)", borderRadius: 999, cursor: "not-allowed", opacity: 0.5 }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
