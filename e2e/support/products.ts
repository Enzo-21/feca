import { products } from "../../src/lib/products";
import { formatARS } from "../../src/lib/format";

/**
 * Fuente única de precios para los tests e2e.
 *
 * Nunca hardcodees precios en los specs: se derivan de `src/lib/products.ts`
 * (con el mismo `formatARS` que usa la UI). Así, al cambiar un precio alcanza
 * con editar `products.ts` y los tests quedan actualizados solos.
 */
export function productBySize(size: string) {
  const product = products.find((item) => item.size === size);
  if (!product) {
    throw new Error(`No hay un producto FECA con la presentación "${size}".`);
  }
  return product;
}

/** Precios formateados de todos los productos, en orden de catálogo. */
export const formattedPrices = products.map((product) => formatARS(product.price));

/** Precio formateado de una presentación (p. ej. "$19.000" para "300 g"). */
export function formattedPriceBySize(size: string): string {
  return formatARS(productBySize(size).price);
}

/** Subtotal formateado de una presentación por cantidad. */
export function formattedSubtotal(size: string, quantity: number): string {
  return formatARS(productBySize(size).price * quantity);
}
