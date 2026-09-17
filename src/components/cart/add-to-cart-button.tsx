"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  slug: string;
  className?: string;
};

export default function AddToCartButton({
  slug,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      type="button"
      onClick={() => addItem(slug)}
      className={cn(
        "mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-bold uppercase tracking-[1px] text-white hover:bg-brand-dark",
        className
      )}
    >
      <ShoppingCart className="h-4 w-4" />
      Añadir al carrito
    </Button>
  );
}
