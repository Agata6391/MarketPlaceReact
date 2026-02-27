// components/cart/RemoveCartItemButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type Props = {
  itemId: string;
};

export function RemoveCartItemButton({ itemId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onRemove() {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      router.refresh(); // re-render server page with updated cart
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      loading={loading}
      onClick={onRemove}
      style={{ minWidth: 96 }}
    >
      Remove
    </Button>
  );
}