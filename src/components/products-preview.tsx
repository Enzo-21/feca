import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { formatARS } from "@/lib/format";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

export default function ProductsPreview() {
  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Productos"
            title="Creatina FECA, sin imperfecciones"
            description="Sin ingredientes ocultos ni recortes de calidad. Cada envase se verifica contra los más altos estándares de pureza."
          />
          <Reveal delay={120} className="shrink-0">
            <Link
              href="/comprar"
              className="group inline-flex h-auto min-h-12 items-center justify-center gap-2 rounded-full border-2 border-brand px-6 text-sm font-bold uppercase tracking-[1px] text-brand transition-colors hover:bg-brand-light/60 hover:text-brand"
            >
              Ver todos los productos
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 100}>
              <Link
                href={`/comprar#${product.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-feather">
                  <Image
                    src={product.image}
                    alt={`${product.name} ${product.size}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={400}
                    height={480}
                    unoptimized
                  />
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-brand px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[1px] text-white shadow-sm">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <p className="text-xs font-bold uppercase tracking-[2px] text-brand">
                    {product.tagline}
                  </p>
                  <h3 className="font-display text-lg leading-snug uppercase text-ink">
                    {product.name} · {product.size}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-display text-2xl text-ink">
                      {formatARS(product.price)}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {product.servings} servicios
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}