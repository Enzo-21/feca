export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  grams: number;
  size: string;
  servings: number;
  referenceLot: string;
  discountPct: number;
  badge?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "creatina-monohidrato-300g",
    name: "FECA Creatina Monohidrato",
    tagline: "Presentación 300 g",
    description:
      "Monohidrato de creatina 100% puro en el formato ideal para empezar. Sin aditivos ni sabores. La puerta de entrada a la línea FECA.",
    image: "/images/producto-creatina-300g.jpg",
    price: 28000,
    grams: 300,
    size: "300 g",
    servings: 60,
    referenceLot: "FECA-2026-001",
    discountPct: 0,
    badge: "Clásico",
  },
  {
    slug: "creatina-monohidrato-500g",
    name: "FECA Creatina Monohidrato",
    tagline: "Presentación 500 g",
    description:
      "La misma creatina pura en un formato intermedio. Más rendimiento por envase y un precio por gramo más conveniente.",
    image: "/images/producto-creatina-500g.jpg",
    price: 43500,
    grams: 500,
    size: "500 g",
    servings: 100,
    referenceLot: "FECA-2026-003",
    discountPct: 15,
    badge: "Más elegido",
    featured: true,
  },
  {
    slug: "creatina-monohidrato-1kg",
    name: "FECA Creatina Monohidrato",
    tagline: "Presentación 1 kg",
    description:
      "Formato de un kilo pensado para quienes no negocian la constancia. El menor precio por kilogramo de toda la línea.",
    image: "/images/producto-creatina-1kg.jpg",
    price: 82000,
    grams: 1000,
    size: "1 kg",
    servings: 200,
    referenceLot: "FECA-2026-006",
    discountPct: 25,
    badge: "Mejor precio por kg",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
