"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Order {
  _id: string;
  service: { _id: string; title: string; thumbnail?: string };
  vendor: { name: string };
  tierName: string;
  tierPrice: number;
  status: string;
  createdAt: string;
}

export function BuyerOrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders/my")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setOrders(d.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center", color: "var(--color-text-2)" }}>
        Loading your orders…
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <p style={{ color: "var(--color-text-2)", marginBottom: "16px" }}>No orders yet.</p>
        <Link href="/services"
          style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>
          Browse services →
        </Link>
      </div>
    );
  }

  return (
    <div className="data-table-wrapper">
      <div className="data-table-header">
        <h2 className="data-table-title">Order History</h2>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Vendor</th>
            <th>Tier</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>
                <Link href={`/services/${o.service?._id}`}
                  style={{ color: "var(--color-primary)", fontWeight: 500, textDecoration: "none" }}>
                  {o.service?.title ?? "—"}
                </Link>
              </td>
              <td style={{ color: "var(--color-text-2)" }}>{o.vendor?.name ?? "—"}</td>
              <td>{o.tierName}</td>
              <td>${(o.tierPrice / 100).toFixed(2)}</td>
              <td>
                <span className={`status-badge status-badge--${o.status}`}>{o.status}</span>
              </td>
              <td style={{ color: "var(--color-text-2)", fontSize: "0.8rem" }}>
                {new Date(o.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
