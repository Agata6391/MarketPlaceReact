"use client";

// components/dashboard/shared/OrdersManager.tsx

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";

type OrderStatus =
  | "pending" | "paid" | "in_progress" | "delivered"
  | "completed" | "cancelled" | "refunded"
  | "cancellation_requested";

interface ProgressUpdate {
  message:    string;
  author:     string;
  authorRole: string;
  createdAt:  string;
}

interface Order {
  _id:                      string;
  status:                   OrderStatus;
  tierName:                 string;
  tierPrice:                number;
  deliveryDays:             number;
  notes?:                   string;
  cancellationReason?:      string;
  progressUpdates:          ProgressUpdate[];
  createdAt:                string;
  deliveredAt?:             string;
  completedAt?:             string;
  buyer:  { _id: string; name: string; email: string; avatar?: string };
  vendor: { _id: string; name: string; email: string; avatar?: string };
  service: { _id: string; title: string; slug: string; thumbnail?: string; category: string };
}

interface OrdersManagerProps {
  role:     "admin" | "vendor" | "buyer";
  asBuyer?: boolean;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending:                 "Pendiente",
  paid:                    "Pagado",
  in_progress:             "En progreso",
  delivered:               "Entregado",
  completed:               "Completado",
  cancelled:               "Cancelado",
  refunded:                "Reembolsado",
  cancellation_requested:  "Cancelación solicitada",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending:                "status-badge--pending",
  paid:                   "status-badge--paid",
  in_progress:            "status-badge--in_progress",
  delivered:              "status-badge--pending",
  completed:              "status-badge--completed",
  cancelled:              "status-badge--cancelled",
  refunded:               "status-badge--cancelled",
  cancellation_requested: "status-badge--cancelled",
};

const ALL_STATUSES: OrderStatus[] = [
  "pending","paid","in_progress","delivered","completed",
  "cancelled","refunded","cancellation_requested",
];

function fmtPrice(cents: number) { return `$${(cents / 100).toFixed(2)}`; }
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", { day:"2-digit", month:"short", year:"numeric" });
}
function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`status-badge ${STATUS_COLORS[status]}`}>{STATUS_LABELS[status]}</span>;
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function OrdersManager({ role, asBuyer = false }: OrdersManagerProps) {
  const [orders,       setOrders]       = useState<Order[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search,       setSearch]       = useState("");
  const [searchInput,  setSearchInput]  = useState("");
  const [selected,     setSelected]     = useState<Order | null>(null);

  const effectiveRole = asBuyer ? "buyer" : role;

  const loadOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "100" });
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (search)  params.set("search", search);
    if (asBuyer) params.set("as", "buyer");

    const res  = await fetch(`/api/orders?${params}`);
    const data = await res.json();
    if (data.success) setOrders(data.data.orders);
    setLoading(false);
  }, [filterStatus, search, asBuyer]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  async function refreshSelected(id: string) {
    const res  = await fetch(`/api/orders/${id}`);
    const data = await res.json();
    if (data.success) {
      setSelected(data.data);
      setOrders(prev => prev.map(o => o._id === id ? data.data : o));
    }
  }

  return (
    <div>
      {/* Filters */}
      <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ position:"relative", flex:1, minWidth:200 }}>
          <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--color-text-2)" }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input className="form-input" style={{ paddingLeft:40 }}
            placeholder="Buscar por servicio o ID…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && setSearch(searchInput)}
          />
        </div>
        <div style={{ display:"flex", gap:4, background:"var(--color-surface)", borderRadius:"var(--radius-full)", padding:4, border:"1px solid var(--color-border)", flexWrap:"wrap" }}>
          {["all", ...ALL_STATUSES].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding:"6px 12px", borderRadius:"var(--radius-full)", fontSize:"0.75rem",
              fontWeight:500, fontFamily:"var(--font-body)", cursor:"pointer", border:"none",
              background: filterStatus === s ? "var(--color-primary)" : "transparent",
              color:       filterStatus === s ? "white" : "var(--color-text-2)",
              transition:  "background 0.15s, color 0.15s",
            }}>
              {s === "all" ? "Todos" : STATUS_LABELS[s as OrderStatus]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="data-table-wrapper">
        <div className="data-table-header">
          <h2 className="data-table-title">
            {loading ? "Cargando…" : `${orders.length} orden${orders.length !== 1 ? "es" : ""}`}
          </h2>
          {search && <Button size="sm" variant="ghost" onClick={() => { setSearch(""); setSearchInput(""); }}>Limpiar</Button>}
        </div>

        {loading ? (
          <div style={{ padding:"60px", textAlign:"center", color:"var(--color-text-2)" }}>⏳ Cargando…</div>
        ) : orders.length === 0 ? (
          <div style={{ padding:"60px", textAlign:"center", color:"var(--color-text-2)" }}>
            <div style={{ fontSize:"2rem", marginBottom:8 }}>📦</div>
            No hay órdenes{filterStatus !== "all" ? ` con estado "${STATUS_LABELS[filterStatus as OrderStatus]}"` : ""}.
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Servicio</th>
                {(effectiveRole === "buyer" || role === "admin") && <th>Vendor</th>}
                {(effectiveRole === "vendor" || role === "admin") && <th>Comprador</th>}
                <th>Tier</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Avances</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>
                    <div style={{ fontWeight:500, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {order.service?.title ?? "—"}
                    </div>
                    <div style={{ fontSize:"0.75rem", color:"var(--color-text-2)" }}>{order.service?.category}</div>
                  </td>
                  {(effectiveRole === "buyer" || role === "admin") && (
                    <td style={{ fontSize:"0.875rem" }}>{order.vendor?.name ?? "—"}</td>
                  )}
                  {(effectiveRole === "vendor" || role === "admin") && (
                    <td>
                      <div style={{ fontSize:"0.875rem" }}>{order.buyer?.name ?? "—"}</div>
                      <div style={{ fontSize:"0.75rem", color:"var(--color-text-2)" }}>{order.buyer?.email}</div>
                    </td>
                  )}
                  <td style={{ fontSize:"0.875rem" }}>{order.tierName}</td>
                  <td style={{ fontFamily:"var(--font-heading)", fontWeight:600 }}>{fmtPrice(order.tierPrice)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                    {order.status === "cancellation_requested" && (
                      <div style={{ fontSize:"0.7rem", color:"var(--color-accent)", marginTop:2 }}>⚠️ Pendiente respuesta</div>
                    )}
                  </td>
                  <td style={{ fontSize:"0.8rem", color:"var(--color-text-2)" }}>{fmtDate(order.createdAt)}</td>
                  <td style={{ textAlign:"center" }}>
                    {order.progressUpdates?.length > 0 ? (
                      <span style={{ background:"var(--color-primary-dim)", color:"var(--color-primary)", borderRadius:"var(--radius-full)", padding:"2px 8px", fontSize:"0.75rem", fontWeight:600 }}>
                        {order.progressUpdates.length}
                      </span>
                    ) : <span style={{ color:"var(--color-text-2)", fontSize:"0.75rem" }}>—</span>}
                  </td>
                  <td>
                    <Button size="sm" variant="secondary" onClick={() => setSelected(order)}>
                      Ver detalle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <OrderDetailModal
          order={selected}
          role={effectiveRole}
          onClose={() => setSelected(null)}
          onUpdated={(id) => refreshSelected(id)}
        />
      )}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function OrderDetailModal({ order, role, onClose, onUpdated }: {
  order: Order; role: "admin"|"vendor"|"buyer";
  onClose: () => void; onUpdated: (id: string) => void;
}) {
  const [progressNote,      setProgressNote]      = useState("");
  const [adminNote,         setAdminNote]          = useState(order.notes ?? "");
  const [submitting,        setSubmitting]         = useState(false);
  const [statusChange,      setStatusChange]       = useState<OrderStatus | "">("");
  const [err,               setErr]               = useState("");

  // Cancellation states
  const [showCancelRequest, setShowCancelRequest] = useState(false);
  const [showCancelReview,  setShowCancelReview]  = useState(false);
  const [cancelReason,      setCancelReason]      = useState("");
  const [rejectReason,      setRejectReason]      = useState("");
  const [cancelLoading,     setCancelLoading]     = useState(false);

  function getAllowedNextStatuses(): OrderStatus[] {
    const cur = order.status;
    if (role === "admin") return ALL_STATUSES.filter(s => s !== cur);
    if (role === "vendor") {
      if (cur === "paid")        return ["in_progress"];
      if (cur === "in_progress") return ["delivered"];
    }
    if (role === "buyer") {
      if (cur === "delivered") return ["completed"];
    }
    return [];
  }

  async function handleSubmit() {
    setSubmitting(true); setErr("");
    const body: Record<string, any> = {};
    if (progressNote.trim()) body.progressNote = progressNote.trim();
    if (statusChange)         body.status       = statusChange;
    if (role === "admin")     body.notes        = adminNote;

    if (Object.keys(body).length === 0) { setErr("No hay cambios."); setSubmitting(false); return; }

    const res  = await fetch(`/api/orders/${order._id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
    const data = await res.json();
    if (!data.success) { setErr(data.error ?? "Error al guardar"); }
    else { setProgressNote(""); setStatusChange(""); onUpdated(order._id); }
    setSubmitting(false);
  }

  async function handleCancelRequest() {
    if (!cancelReason.trim()) { return; }
    setCancelLoading(true);
    const res  = await fetch(`/api/orders/${order._id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ action:"request_cancellation", reason: cancelReason }) });
    const data = await res.json();
    if (data.success) { setShowCancelRequest(false); setCancelReason(""); onUpdated(order._id); }
    else setErr(data.error ?? "Error");
    setCancelLoading(false);
  }

  async function handleCancelAction(action: "accept_cancellation" | "reject_cancellation" | "admin_cancel") {
    setCancelLoading(true);
    const body: any = { action };
    if (action === "reject_cancellation" && rejectReason) body.reason = rejectReason;
    if (action === "admin_cancel" && cancelReason) body.reason = cancelReason;

    const res  = await fetch(`/api/orders/${order._id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
    const data = await res.json();
    if (data.success) { setShowCancelReview(false); setRejectReason(""); onUpdated(order._id); }
    else setErr(data.error ?? "Error");
    setCancelLoading(false);
  }

  const allowedNext = getAllowedNextStatuses();
  const canRequestCancel = role === "buyer" && ["pending","paid","in_progress"].includes(order.status);
  const hasCancelRequest = order.status === "cancellation_requested";

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:"var(--color-surface)", borderRadius:"var(--radius-lg)", border:"1px solid var(--color-border)", width:"100%", maxWidth:680, maxHeight:"90vh", overflowY:"auto", display:"flex", flexDirection:"column" }}>

        {/* Header */}
        <div style={{ padding:"20px 24px", borderBottom:"1px solid var(--color-border)", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, position:"sticky", top:0, background:"var(--color-surface)", zIndex:1 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <h2 style={{ fontFamily:"var(--font-heading)", fontSize:"1.1rem" }}>Orden #{order._id.slice(-8).toUpperCase()}</h2>
              <StatusBadge status={order.status} />
            </div>
            <p style={{ fontSize:"0.8rem", color:"var(--color-text-2)" }}>
              Creada {fmtDate(order.createdAt)}
              {order.deliveredAt && ` · Entregada ${fmtDate(order.deliveredAt)}`}
              {order.completedAt && ` · Completada ${fmtDate(order.completedAt)}`}
            </p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-text-2)", fontSize:"1.4rem", lineHeight:1 }}>×</button>
        </div>

        <div style={{ padding:24, display:"flex", flexDirection:"column", gap:20 }}>

          {/* Cancellation request banner — visible para vendor/admin */}
          {hasCancelRequest && (role === "vendor" || role === "admin") && (
            <div style={{ background:"rgba(255,107,107,0.12)", border:"1px solid rgba(255,107,107,0.3)", borderRadius:"var(--radius-md)", padding:16 }}>
              <p style={{ fontWeight:600, color:"var(--color-accent)", marginBottom:6, fontSize:"0.95rem" }}>
                ⚠️ El comprador solicitó cancelar esta orden
              </p>
              {order.cancellationReason && (
                <p style={{ fontSize:"0.875rem", color:"var(--color-text-2)", marginBottom:12 }}>
                  Motivo: <em>"{order.cancellationReason}"</em>
                </p>
              )}
              {!showCancelReview ? (
                <Button size="sm" onClick={() => setShowCancelReview(true)}>Responder solicitud</Button>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:8 }}>
                  <input className="form-input" placeholder="Motivo de rechazo (opcional)" value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
                  <div style={{ display:"flex", gap:8 }}>
                    <Button size="sm" loading={cancelLoading} onClick={() => handleCancelAction("accept_cancellation")}>
                      ✅ Aceptar cancelación
                    </Button>
                    <Button size="sm" variant="ghost" loading={cancelLoading} onClick={() => handleCancelAction("reject_cancellation")}>
                      ❌ Rechazar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowCancelReview(false)}>Volver</Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cancellation request banner — visible para buyer cuando está pendiente */}
          {hasCancelRequest && role === "buyer" && (
            <div style={{ background:"rgba(255,209,102,0.1)", border:"1px solid rgba(255,209,102,0.3)", borderRadius:"var(--radius-md)", padding:16 }}>
              <p style={{ fontWeight:600, color:"var(--color-gold)", fontSize:"0.95rem" }}>
                ⏳ Solicitud de cancelación enviada al vendor
              </p>
              <p style={{ fontSize:"0.8rem", color:"var(--color-text-2)", marginTop:4 }}>
                Motivo enviado: <em>"{order.cancellationReason}"</em>
              </p>
            </div>
          )}

          {/* Service info */}
          <div style={{ background:"var(--color-bg-2)", borderRadius:"var(--radius-md)", padding:16, display:"flex", gap:16, alignItems:"center" }}>
            {order.service?.thumbnail && <img src={order.service.thumbnail} alt="" style={{ width:64, height:48, borderRadius:8, objectFit:"cover" }} />}
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontFamily:"var(--font-heading)", fontWeight:600, marginBottom:2 }}>{order.service?.title}</p>
              <p style={{ fontSize:"0.8rem", color:"var(--color-text-2)" }}>
                {order.service?.category} · Tier {order.tierName} · {order.deliveryDays} días
              </p>
            </div>
            <p style={{ fontFamily:"var(--font-heading)", fontSize:"1.25rem", fontWeight:700, flexShrink:0 }}>{fmtPrice(order.tierPrice)}</p>
          </div>

          {/* People */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <InfoCard label="Comprador" name={order.buyer?.name}  email={order.buyer?.email}  icon="🛒" />
            <InfoCard label="Vendor"    name={order.vendor?.name} email={order.vendor?.email} icon="🔧" />
          </div>

          {/* Progress timeline */}
          <div>
            <h3 style={{ fontFamily:"var(--font-heading)", fontSize:"0.95rem", marginBottom:12, fontWeight:600 }}>
              📋 Historial de avances ({order.progressUpdates?.length ?? 0})
            </h3>
            {(!order.progressUpdates || order.progressUpdates.length === 0) ? (
              <div style={{ padding:"20px", textAlign:"center", color:"var(--color-text-2)", fontSize:"0.875rem", background:"var(--color-bg-2)", borderRadius:"var(--radius-md)" }}>
                Aún no hay avances registrados.
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {order.progressUpdates.map((u, i) => (
                  <div key={i} style={{ background:"var(--color-bg-2)", borderRadius:"var(--radius-md)", padding:"12px 16px",
                    borderLeft:`3px solid ${u.authorRole === "admin" ? "var(--color-accent)" : u.authorRole === "buyer" ? "var(--color-gold)" : "var(--color-primary)"}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:"0.8rem", fontWeight:600,
                        color: u.authorRole === "admin" ? "var(--color-accent)" : u.authorRole === "buyer" ? "var(--color-gold)" : "var(--color-primary)" }}>
                        {u.authorRole === "admin" ? "🛡️" : u.authorRole === "buyer" ? "🛒" : "🔧"} {u.author}
                        <span style={{ fontWeight:400, color:"var(--color-text-2)" }}> ({u.authorRole})</span>
                      </span>
                      <span style={{ fontSize:"0.75rem", color:"var(--color-text-2)" }}>{fmtDate(u.createdAt)}</span>
                    </div>
                    <p style={{ fontSize:"0.875rem", lineHeight:1.5 }}>{u.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Admin note */}
          {role === "admin" && (
            <div>
              <label className="form-label">📝 Nota interna del admin</label>
              <textarea className="form-input" rows={3} value={adminNote} onChange={e => setAdminNote(e.target.value)} placeholder="Notas internas…" style={{ resize:"vertical" }} />
            </div>
          )}
          {role !== "admin" && order.notes && (
            <div style={{ background:"var(--color-accent-dim)", borderRadius:"var(--radius-md)", padding:12 }}>
              <p style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--color-accent)", marginBottom:4 }}>🛡️ Nota del admin</p>
              <p style={{ fontSize:"0.875rem" }}>{order.notes}</p>
            </div>
          )}

          {/* Add progress */}
          {(role === "vendor" || role === "admin") && !hasCancelRequest && (
            <div>
              <label className="form-label">➕ Agregar avance</label>
              <textarea className="form-input" rows={3} value={progressNote} onChange={e => setProgressNote(e.target.value)} placeholder="Ej: Primera versión lista…" style={{ resize:"vertical" }} />
            </div>
          )}

          {/* Status change */}
          {allowedNext.length > 0 && !hasCancelRequest && (
            <div>
              <label className="form-label">{role === "buyer" ? "✅ Confirmar recepción" : "🔄 Cambiar estado"}</label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {allowedNext.map(s => (
                  <button key={s} onClick={() => setStatusChange(prev => prev === s ? "" : s)}
                    style={{ padding:"8px 16px", borderRadius:"var(--radius-full)", border: statusChange === s ? "2px solid var(--color-primary)" : "1px solid var(--color-border)", background: statusChange === s ? "var(--color-primary-dim)" : "var(--color-surface)", color: statusChange === s ? "var(--color-primary)" : "var(--color-text)", fontFamily:"var(--font-body)", fontSize:"0.85rem", fontWeight:500, cursor:"pointer", transition:"all 0.15s" }}>
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Admin direct cancel */}
          {role === "admin" && !["cancelled","completed","refunded"].includes(order.status) && (
            <div style={{ borderTop:"1px solid var(--color-border)", paddingTop:16 }}>
              <label className="form-label" style={{ color:"var(--color-accent)" }}>🛡️ Cancelación directa (admin)</label>
              <div style={{ display:"flex", gap:8, marginTop:8 }}>
                <input className="form-input" placeholder="Motivo de cancelación (opcional)" value={cancelReason} onChange={e => setCancelReason(e.target.value)} style={{ flex:1 }} />
                <Button variant="danger" size="sm" loading={cancelLoading} onClick={() => handleCancelAction("admin_cancel")}>
                  Cancelar orden
                </Button>
              </div>
            </div>
          )}

          {/* Buyer: request cancellation */}
          {canRequestCancel && (
            <div style={{ borderTop:"1px solid var(--color-border)", paddingTop:16 }}>
              {!showCancelRequest ? (
                <button
                  onClick={() => setShowCancelRequest(true)}
                  style={{ background:"none", border:"1px solid rgba(255,107,107,0.4)", borderRadius:"var(--radius-full)", color:"var(--color-accent)", padding:"8px 20px", fontFamily:"var(--font-body)", fontSize:"0.875rem", fontWeight:500, cursor:"pointer", transition:"all 0.15s" }}
                >
                  Solicitar cancelación
                </button>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <label className="form-label" style={{ color:"var(--color-accent)" }}>⚠️ Justificación de cancelación</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={cancelReason}
                    onChange={e => setCancelReason(e.target.value)}
                    placeholder="Explica por qué deseas cancelar esta orden…"
                    style={{ resize:"vertical" }}
                    autoFocus
                  />
                  <div style={{ display:"flex", gap:8 }}>
                    <Button variant="danger" size="sm" loading={cancelLoading}
                      disabled={!cancelReason.trim()}
                      onClick={handleCancelRequest}>
                      Enviar solicitud
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setShowCancelRequest(false); setCancelReason(""); }}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {err && (
            <p style={{ fontSize:"0.875rem", color:"var(--color-accent)", padding:"10px 14px", background:"var(--color-accent-dim)", borderRadius:"var(--radius-md)" }}>
              ⚠️ {err}
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:"16px 24px", borderTop:"1px solid var(--color-border)", display:"flex", justifyContent:"flex-end", gap:12, position:"sticky", bottom:0, background:"var(--color-surface)" }}>
          <Button variant="ghost" onClick={onClose}>Cerrar</Button>
          {(role === "vendor" || role === "admin") && !hasCancelRequest && (
            <Button loading={submitting} onClick={handleSubmit}
              disabled={!progressNote.trim() && !statusChange && (role !== "admin" || adminNote === (order.notes ?? ""))}>
              Guardar cambios
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, name, email, icon }: { label: string; name?: string; email?: string; icon: string }) {
  return (
    <div style={{ background:"var(--color-bg-2)", borderRadius:"var(--radius-md)", padding:"12px 16px" }}>
      <p style={{ fontSize:"0.72rem", fontWeight:600, color:"var(--color-text-2)", textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>
        {icon} {label}
      </p>
      <p style={{ fontWeight:600, fontSize:"0.9rem" }}>{name ?? "—"}</p>
      <p style={{ fontSize:"0.78rem", color:"var(--color-text-2)" }}>{email ?? ""}</p>
    </div>
  );
}
