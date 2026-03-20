"use client";

// components/cart/CheckoutButton.tsx
// Navega a /checkout (la página de checkout dummy).

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Props {
  disabled?:  boolean;
  fullWidth?: boolean;
}

export function CheckoutButton({ disabled, fullWidth }: Props) {
  const router = useRouter();

  return (
    <Button
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={() => router.push("/checkout")}
    >
      Checkout
    </Button>
  );
}
