"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/components/cart/cart-provider";
import { formatARS } from "@/lib/format";
import { getSellerForProvince, provinces } from "@/lib/sellers";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

type Step = "cart" | "checkout";

export default function CartDrawer() {
  const {
    detailedItems,
    isOpen,
    openCart,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
  } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [province, setProvince] = useState("");

  const resetCheckout = () => {
    setStep("cart");
    setProvince("");
  };

  const seller = province ? getSellerForProvince(province) : null;

  const message = useMemo(() => {
    if (!seller) return "";
    return buildOrderMessage({
      seller,
      lines: detailedItems.map(({ product, quantity, lineTotal }) => ({
        name: product.name,
        size: product.size,
        quantity,
        lineTotal,
      })),
      total: subtotal,
      province,
    });
  }, [seller, detailedItems, subtotal, province]);

  const hasItems = detailedItems.length > 0;

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (open) openCart();
        else {
          closeCart();
          resetCheckout();
        }
      }}
    >
      <SheetContent
        side="right"
        className="w-full gap-0 p-0 sm:max-w-md"
        aria-describedby={undefined}
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-center gap-2 font-display text-lg uppercase text-ink">
            <ShoppingBag className="h-5 w-5 text-brand" />
            Tu pedido
            {totalItems > 0 && (
              <span className="font-sans text-xs font-bold text-muted-foreground">
                ({totalItems})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!hasItems ? (
            <EmptyState onNavigate={closeCart} />
          ) : step === "cart" ? (
            <ul className="flex flex-col gap-5">
              {detailedItems.map(({ product, quantity, lineTotal }) => (
                <li key={product.slug} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-feather">
                    <Image
                      src={product.image}
                      alt={`${product.name} ${product.size}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-display text-sm uppercase leading-snug text-ink">
                          {product.name}
                        </p>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {product.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.slug)}
                        aria-label={`Quitar ${product.name} ${product.size}`}
                        className="text-muted-foreground transition-colors hover:text-brand"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.slug, quantity - 1)
                          }
                          aria-label={`Restar una unidad de ${product.size}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-feather"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-ink">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.slug, quantity + 1)
                          }
                          aria-label={`Sumar una unidad de ${product.size}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-feather"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-base text-ink">
                        {formatARS(lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl bg-feather p-4 text-sm leading-relaxed text-graphite">
                <p className="font-semibold uppercase tracking-wide text-ink">
                  Coordinamos tu envío
                </p>
                <p className="mt-1">
                  Elegí tu provincia y te asignamos un vendedor para cerrar la
                  compra por WhatsApp.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span
                  id="province-label"
                  className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground"
                >
                  Provincia
                </span>
                <Select
                  value={province || null}
                  onValueChange={(value) => setProvince(value ?? "")}
                >
                  <SelectTrigger aria-labelledby="province-label">
                    <SelectValue placeholder="Elegí tu provincia">
                      {(value: string | null) =>
                        value ?? "Elegí tu provincia"
                      }
                    </SelectValue>
                    <SelectIcon>
                      <ChevronDown className="h-4 w-4" />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((provinceName) => (
                      <SelectItem key={provinceName} value={provinceName}>
                        {provinceName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {seller && (
                <div className="flex flex-col gap-4 rounded-2xl border border-brand/30 bg-brand-light/40 p-4">
                  <p className="text-sm leading-relaxed text-graphite">
                    Tu vendedor asignado es{" "}
                    <strong className="font-display text-brand">
                      {seller.name}
                    </strong>
                    . Te responde por WhatsApp para coordinar pago y envío.
                  </p>
                  <a
                    href={buildWhatsAppUrl(seller, message)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-dark"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Continuar por WhatsApp
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {hasItems && (
          <SheetFooter className="gap-3 border-t border-border px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Subtotal
              </span>
              <span className="font-display text-2xl text-ink">
                {formatARS(subtotal)}
              </span>
            </div>

            {step === "cart" ? (
              <>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  El envío y la forma de pago se coordinan con tu vendedor.
                </p>
                <Button
                  type="button"
                  onClick={() => setStep("checkout")}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-bold uppercase tracking-[1px] text-white hover:bg-brand-dark"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("cart")}
                className="h-auto min-h-12 w-full rounded-full border-2 border-brand text-sm font-bold uppercase tracking-[1px] text-brand hover:bg-brand-light/60 hover:text-brand"
              >
                Volver al carrito
              </Button>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

function EmptyState({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-feather text-muted-foreground">
        <ShoppingBag className="h-7 w-7" />
      </span>
      <p className="font-display text-lg uppercase text-ink">
        Tu carrito está vacío
      </p>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        Sumá una presentación de FECA para empezar tu pedido.
      </p>
      <Link
        href="/comprar"
        onClick={onNavigate}
        className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 text-sm font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-dark"
      >
        Ver productos
      </Link>
    </div>
  );
}
