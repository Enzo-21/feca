import { formatARS } from "@/lib/format";
import type { Seller } from "@/lib/sellers";

export type WhatsAppOrderLine = {
  name: string;
  size: string;
  quantity: number;
  lineTotal: number;
};

export function buildOrderMessage({
  seller,
  lines,
  total,
  province,
}: {
  seller: Seller;
  lines: WhatsAppOrderLine[];
  total: number;
  province: string;
}): string {
  const items = lines
    .map(
      (line) =>
        `• ${line.quantity} × ${line.name} ${line.size} — ${formatARS(
          line.lineTotal
        )}`
    )
    .join("\n");

  return [
    `Hola ${seller.name}! Quiero hacer un pedido de FECA.`,
    "",
    "Productos:",
    items,
    "",
    `Total: ${formatARS(total)}`,
    `Provincia: ${province}`,
    "",
    "¿Me ayudás a coordinar la compra?",
  ].join("\n");
}

export function buildWhatsAppUrl(seller: Seller, message: string): string {
  return `https://wa.me/${seller.whatsapp}?text=${encodeURIComponent(message)}`;
}
