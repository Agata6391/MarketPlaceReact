// components/layout/CartButton.tsx
"use client";

import { useEffect, useState } from "react";

type ApiResp<T> = { ok: boolean; data?: T; error?: string };

type CartItem = { quantity?: number };
type Cart = { items?: CartItem[] };

export function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        if (!res.ok) {
          if (alive) setCount(0);
          return;
        }

        const json = (await res.json()) as ApiResp<Cart>;
        const items = json?.data?.items ?? [];
        const total = items.reduce((sum, it) => sum + (it.quantity ?? 1), 0);

        if (alive) setCount(total);
      } catch {
        if (alive) setCount(0);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <a className="navbar__cart-btn" href="/cart" aria-label="Cart">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>

      {count > 0 && <span className="navbar__cart-badge">{count}</span>}
    </a>
  );
}