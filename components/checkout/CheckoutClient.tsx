"use client";

// components/checkout/CheckoutClient.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CartItem {
  _id:          string;
  tierName:     string;
  tierPrice:    number;
  deliveryDays: number;
  service: {
    _id:       string;
    title:     string;
    thumbnail?: string;
    category:  string;
    slug:      string;
  };
}

interface Props {
  items:     CartItem[];
  total:     number;
  userName:  string;
  userEmail: string;
  userRole:  string;
}

type PayMethod = "card" | "paypal" | "vendor";

// ── Component ─────────────────────────────────────────────────────────────────

export function CheckoutClient({ items, total, userName, userEmail, userRole }: Props) {
  const router = useRouter();

  const [method,    setMethod]    = useState<PayMethod>("card");
  const [step,      setStep]      = useState<"form" | "processing" | "success" | "error">("form");
  const [errorMsg,  setErrorMsg]  = useState("");

  // Card form state
  const [card, setCard] = useState({
    name:   userName,
    number: "",
    expiry: "",
    cvv:    "",
  });

  // PayPal email
  const [ppEmail, setPpEmail] = useState(userEmail);

  // Vendor message
  const [vendorMsg, setVendorMsg] = useState(
    "Hola, me interesa contratar este servicio. ¿Podemos coordinar los detalles?"
  );

  function fmtPrice(cents: number) {
    return `$${(cents / 100).toFixed(2)}`;
  }

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("processing");
    setErrorMsg("");

    try {
      const res  = await fetch("/api/checkout-dummy", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ method }),
      });
      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.error ?? "Error al procesar el pago.");
        setStep("error");
        return;
      }

      setStep("success");
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo.");
      setStep("error");
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>
            {method === "vendor" ? "🤝" : "✅"}
          </div>
          <h1 style={styles.successTitle}>
            {method === "vendor" ? "¡Solicitud enviada!" : "¡Pago completado!"}
          </h1>
          <p style={styles.successSub}>
            {method === "vendor"
              ? "Tu solicitud fue enviada al vendor. Te contactará pronto para coordinar los detalles."
              : `Tu pedido fue procesado correctamente vía ${method === "card" ? "tarjeta" : "PayPal"}.`}
          </p>
          <div style={styles.successActions}>
            <Link href={userRole === "vendor" ? "/dashboard/vendor/purchases" : "/dashboard/buyer/purchases"} style={{ ...styles.btn, ...styles.btnPrimary }}>
              Ver mis órdenes
            </Link>
            <Link href="/services" style={{ ...styles.btn, ...styles.btnGhost }}>
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Processing screen ───────────────────────────────────────────────────────
  if (step === "processing") {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={{ fontSize: "3rem", marginBottom: 16, animation: "spin 1s linear infinite" }}>
            ⏳
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", marginBottom: 8 }}>
            {method === "vendor" ? "Enviando solicitud…" : "Procesando pago…"}
          </h2>
          <p style={{ color: "var(--color-text-2)", fontSize: "0.9rem" }}>
            Por favor no cierres esta ventana.
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  // ── Main checkout form ──────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      {/* Back link */}
      <div style={styles.topBar}>
        <Link href="/cart" style={styles.backLink}>
          ← Volver al carrito
        </Link>
        <span style={styles.logo}>Skill<span style={{ color: "var(--color-primary)" }}>ora</span></span>
      </div>

      <div style={styles.layout}>

        {/* ── Left: payment form ── */}
        <div style={styles.formCol}>
          <h1 style={styles.heading}>Finalizar compra</h1>

          {/* Error banner */}
          {step === "error" && (
            <div style={styles.errorBanner}>
              ⚠️ {errorMsg}
              <button style={styles.retryBtn} onClick={() => setStep("form")}>Intentar de nuevo</button>
            </div>
          )}

          {/* Payment method tabs */}
          <div style={styles.tabs}>
            {(["card", "paypal", "vendor"] as PayMethod[]).map(m => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                style={{ ...styles.tab, ...(method === m ? styles.tabActive : {}) }}
              >
                {m === "card"   && <span>💳</span>}
                {m === "paypal" && <span style={{ color: "#009CDE", fontWeight: 700 }}>P</span>}
                {m === "vendor" && <span>🤝</span>}
                <span>
                  {m === "card"   && "Tarjeta"}
                  {m === "paypal" && "PayPal"}
                  {m === "vendor" && "Acordar con vendor"}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* ── CARD ── */}
            {method === "card" && (
              <div style={styles.methodBox}>
                <div style={styles.cardPreview}>
                  <div style={styles.cardChip} />
                  <div style={styles.cardNumber}>
                    {card.number || "•••• •••• •••• ••••"}
                  </div>
                  <div style={styles.cardBottom}>
                    <div>
                      <div style={styles.cardLabel}>Titular</div>
                      <div style={styles.cardValue}>{card.name || "NOMBRE APELLIDO"}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={styles.cardLabel}>Vence</div>
                      <div style={styles.cardValue}>{card.expiry || "MM/AA"}</div>
                    </div>
                  </div>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Nombre en la tarjeta</label>
                  <input
                    style={styles.input}
                    value={card.name}
                    onChange={e => setCard({ ...card, name: e.target.value })}
                    placeholder="Juan García"
                    required
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Número de tarjeta</label>
                  <input
                    style={styles.input}
                    value={card.number}
                    onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={styles.field}>
                    <label style={styles.label}>Fecha de vencimiento</label>
                    <input
                      style={styles.input}
                      value={card.expiry}
                      onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>CVV</label>
                    <input
                      style={styles.input}
                      value={card.cvv}
                      onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                      placeholder="•••"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div style={styles.secureNote}>
                  🔒 Pago simulado — no se cobra dinero real
                </div>
              </div>
            )}

            {/* ── PAYPAL ── */}
            {method === "paypal" && (
              <div style={styles.methodBox}>
                <div style={styles.paypalHeader}>
                  <div style={styles.paypalLogo}>
                    <span style={{ color: "#003087", fontWeight: 900, fontSize: "1.4rem" }}>Pay</span>
                    <span style={{ color: "#009CDE", fontWeight: 900, fontSize: "1.4rem" }}>Pal</span>
                  </div>
                  <p style={{ color: "var(--color-text-2)", fontSize: "0.875rem", marginTop: 4 }}>
                    Serás redirigido a PayPal para completar el pago de forma segura.
                  </p>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Email de tu cuenta PayPal</label>
                  <input
                    style={styles.input}
                    type="email"
                    value={ppEmail}
                    onChange={e => setPpEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div style={styles.secureNote}>
                  🔒 Pago simulado — no se cobra dinero real
                </div>
              </div>
            )}

            {/* ── VENDOR AGREEMENT ── */}
            {method === "vendor" && (
              <div style={styles.methodBox}>
                <div style={styles.vendorInfo}>
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>🤝</div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", marginBottom: 6 }}>
                    Acordar directamente con el vendor
                  </h3>
                  <p style={{ color: "var(--color-text-2)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    Tu orden quedará en estado <strong>Pendiente</strong>. El vendor recibirá tu mensaje
                    y se pondrá en contacto para coordinar los detalles del pago y entrega.
                  </p>
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Mensaje para el vendor</label>
                  <textarea
                    style={{ ...styles.input, resize: "vertical", minHeight: 100 }}
                    value={vendorMsg}
                    onChange={e => setVendorMsg(e.target.value)}
                    placeholder="Cuéntale al vendor qué necesitas…"
                    required
                  />
                </div>

                <div style={{ ...styles.secureNote, background: "rgba(255,209,102,0.1)", borderColor: "rgba(255,209,102,0.3)", color: "var(--color-gold)" }}>
                  ⚡ El vendor verá tu solicitud en su dashboard y te contactará pronto.
                </div>
              </div>
            )}

            {/* Submit */}
            <button type="submit" style={styles.submitBtn}>
              {method === "card"   && `Pagar ${fmtPrice(total)}`}
              {method === "paypal" && `Continuar con PayPal — ${fmtPrice(total)}`}
              {method === "vendor" && "Enviar solicitud al vendor"}
            </button>
          </form>
        </div>

        {/* ── Right: order summary ── */}
        <aside style={styles.summaryCol}>
          <div style={styles.summaryBox}>
            <h2 style={styles.summaryTitle}>Resumen del pedido</h2>

            <div style={styles.itemList}>
              {items.map(it => (
                <div key={it._id} style={styles.summaryItem}>
                  <div style={styles.summaryThumb}>
                    {it.service?.thumbnail
                      ? <img src={it.service.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontSize: "1.5rem" }}>
                          {it.service?.category === "design" ? "🎨" :
                           it.service?.category === "development" ? "💻" :
                           it.service?.category === "marketing" ? "📣" : "✨"}
                        </span>
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={styles.summaryItemTitle}>{it.service?.title}</p>
                    <p style={styles.summaryItemMeta}>
                      {it.tierName} · {it.deliveryDays} días
                    </p>
                  </div>
                  <div style={styles.summaryItemPrice}>
                    {fmtPrice(it.tierPrice)}
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.summaryDivider} />

            <div style={styles.summaryRow}>
              <span style={{ color: "var(--color-text-2)" }}>Subtotal</span>
              <span>{fmtPrice(total)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={{ color: "var(--color-text-2)" }}>Impuestos</span>
              <span style={{ color: "var(--color-text-2)" }}>—</span>
            </div>

            <div style={styles.summaryDivider} />

            <div style={{ ...styles.summaryRow, fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 700 }}>
              <span>Total</span>
              <span style={{ color: "var(--color-primary)" }}>{fmtPrice(total)}</span>
            </div>

            <div style={styles.guaranteeBadge}>
              <span>🛡️</span>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-2)", lineHeight: 1.4 }}>
                Garantía Skillora — Si el vendor no entrega, te reembolsamos.
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--color-bg)",
    color: "var(--color-text)",
    fontFamily: "var(--font-body)",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px",
    borderBottom: "1px solid var(--color-border)",
    background: "rgba(10,10,15,0.8)",
    backdropFilter: "blur(20px)",
    position: "sticky" as const,
    top: 0,
    zIndex: 10,
  },
  backLink: {
    fontSize: "0.875rem",
    color: "var(--color-text-2)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 6,
    transition: "color 0.15s",
  },
  logo: {
    fontFamily: "var(--font-heading)",
    fontSize: "1.3rem",
    fontWeight: 800,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: 40,
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 24px 80px",
  },
  formCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 24,
  },
  heading: {
    fontFamily: "var(--font-heading)",
    fontSize: "2rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },
  errorBanner: {
    background: "var(--color-accent-dim)",
    border: "1px solid rgba(255,107,107,0.3)",
    borderRadius: 12,
    padding: "14px 18px",
    color: "var(--color-accent)",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  retryBtn: {
    background: "var(--color-accent)",
    color: "white",
    border: "none",
    borderRadius: 999,
    padding: "6px 16px",
    fontSize: "0.8rem",
    fontFamily: "var(--font-body)",
    cursor: "pointer",
    fontWeight: 600,
    flexShrink: 0,
  },
  tabs: {
    display: "flex",
    gap: 8,
    background: "var(--color-surface)",
    borderRadius: 16,
    padding: 6,
    border: "1px solid var(--color-border)",
  },
  tab: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 12px",
    borderRadius: 12,
    border: "none",
    background: "transparent",
    color: "var(--color-text-2)",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tabActive: {
    background: "var(--color-primary)",
    color: "white",
    boxShadow: "0 4px 16px rgba(108,99,255,0.4)",
  },
  methodBox: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: 16,
    padding: 24,
    display: "flex",
    flexDirection: "column" as const,
    gap: 16,
  },
  // Card preview
  cardPreview: {
    background: "linear-gradient(135deg, #1a1560 0%, #6c63ff 60%, #9c63ff 100%)",
    borderRadius: 16,
    padding: "24px 28px",
    aspectRatio: "1.6 / 1",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    boxShadow: "0 8px 32px rgba(108,99,255,0.4)",
    position: "relative" as const,
    overflow: "hidden",
  },
  cardChip: {
    width: 40,
    height: 30,
    background: "linear-gradient(135deg, #ffd700, #ffaa00)",
    borderRadius: 6,
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
  },
  cardNumber: {
    fontFamily: "monospace",
    fontSize: "1.1rem",
    letterSpacing: "0.15em",
    color: "white",
    textAlign: "center" as const,
  },
  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardLabel: {
    fontSize: "0.6rem",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    marginBottom: 2,
  },
  cardValue: {
    fontSize: "0.875rem",
    color: "white",
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "var(--color-text-2)",
  },
  input: {
    background: "var(--color-bg-2)",
    border: "1px solid var(--color-border)",
    borderRadius: 10,
    color: "var(--color-text)",
    fontFamily: "var(--font-body)",
    fontSize: "0.95rem",
    padding: "12px 16px",
    outline: "none",
    transition: "border-color 0.15s",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  secureNote: {
    fontSize: "0.78rem",
    color: "var(--color-green)",
    background: "rgba(6,214,160,0.08)",
    border: "1px solid rgba(6,214,160,0.2)",
    borderRadius: 8,
    padding: "8px 12px",
    textAlign: "center" as const,
  },
  paypalHeader: {
    textAlign: "center" as const,
    padding: "12px 0",
  },
  paypalLogo: {
    display: "flex",
    justifyContent: "center",
    gap: 0,
    marginBottom: 8,
  },
  vendorInfo: {
    textAlign: "center" as const,
    padding: "12px 0",
  },
  submitBtn: {
    background: "var(--color-primary)",
    color: "white",
    border: "none",
    borderRadius: 999,
    padding: "16px 32px",
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    cursor: "pointer",
    boxShadow: "0 6px 24px rgba(108,99,255,0.4)",
    transition: "transform 0.15s, box-shadow 0.15s",
    letterSpacing: "-0.01em",
  },
  // Summary
  summaryCol: {},
  summaryBox: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: 20,
    padding: 28,
    position: "sticky" as const,
    top: 88,
    display: "flex",
    flexDirection: "column" as const,
    gap: 16,
  },
  summaryTitle: {
    fontFamily: "var(--font-heading)",
    fontSize: "1.1rem",
    fontWeight: 700,
  },
  itemList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  summaryItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  summaryThumb: {
    width: 52,
    height: 40,
    borderRadius: 8,
    background: "var(--color-bg-3)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  summaryItemTitle: {
    fontSize: "0.875rem",
    fontWeight: 500,
    marginBottom: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  summaryItemMeta: {
    fontSize: "0.75rem",
    color: "var(--color-text-2)",
  },
  summaryItemPrice: {
    fontFamily: "var(--font-heading)",
    fontWeight: 700,
    fontSize: "0.95rem",
    flexShrink: 0,
  },
  summaryDivider: {
    height: 1,
    background: "var(--color-border)",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
  },
  guaranteeBadge: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    background: "var(--color-primary-dim)",
    border: "1px solid rgba(108,99,255,0.2)",
    borderRadius: 12,
    padding: "12px 14px",
    marginTop: 4,
  },
  // Success
  successCard: {
    maxWidth: 480,
    margin: "80px auto",
    textAlign: "center" as const,
    padding: "0 24px",
  },
  successIcon: {
    fontSize: "4rem",
    marginBottom: 20,
  },
  successTitle: {
    fontFamily: "var(--font-heading)",
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: 12,
    letterSpacing: "-0.02em",
  },
  successSub: {
    color: "var(--color-text-2)",
    fontSize: "1rem",
    lineHeight: 1.6,
    marginBottom: 32,
  },
  successActions: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    alignItems: "center",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 28px",
    borderRadius: 999,
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.15s",
    minWidth: 200,
  },
  btnPrimary: {
    background: "var(--color-primary)",
    color: "white",
    boxShadow: "0 4px 20px rgba(108,99,255,0.4)",
  },
  btnGhost: {
    background: "var(--color-surface)",
    color: "var(--color-text-2)",
    border: "1px solid var(--color-border)",
  },
};
