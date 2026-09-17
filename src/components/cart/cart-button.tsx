"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

export default function CartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Abrir carrito"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-graphite transition-colors hover:text-brand"
    >
      <ShoppingBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 font-display text-[0.65rem] leading-none text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}
