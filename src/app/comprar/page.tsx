import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Truck, ShieldCheck, RotateCcw, FileText, Download } from "lucide-react";
import { products } from "@/lib/products";
import { formatARS } from "@/lib/format";
import Reveal from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/cart/add-to-cart-button";

export const metadata: Metadata = {
  title: "Comprar",
  description:
    "Elegí tu FECA: creatina monohidrato pura en 300 g, 500 g o 1 kg. Coordiná tu compra por WhatsApp con un vendedor asignado por provincia.",
  alternates: { canonical: "/comprar" },
};

const perks = [
  {
    icon: Truck,
    title: "Envío a todo el país",
    text: "Despachamos en 24/48 h con seguimiento del pedido.",
  },
  {
    icon: ShieldCheck,
    title: "Calidad trazable",
    text: "Cada lote tiene un certificado verificable en Calidad.",
  },
  {
    icon: RotateCcw,
    title: "Satisfacción garantizada",
    text: "Si no estás conforme, podés cambiarlo sin preguntas.",
  },
];

export default function ComprarPage() {
  return (
    <>
      <section className="relative overflow-hidden px-3 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-brand/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-10 sm:px-2 lg:px-8 lg:pt-32">
          <Reveal className="flex flex-col items-start gap-5">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-brand">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              Comprar FECA
            </p>
            <h1 className="font-display text-4xl leading-[1.05] uppercase text-ink sm:text-5xl lg:text-6xl">
              Comprar
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-graphite sm:text-lg">
              No toda la creatina es igual. Estos productos contienen FECA
              genuino: monohidrato de creatina puro, probado y trazable. Para
              quienes no hacen concesiones.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:px-2 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {products.map((product, i) => {
            const savings = product.discountPct;
            const oldPrice =
              savings > 0
                ? Math.round(product.price / (1 - savings / 100))
                : undefined;
            return (
              <Reveal key={product.slug} delay={i * 100}>
                <article
                  id={product.slug}
                  className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    href={`/productos/${product.slug}`}
                    className="relative block aspect-square overflow-hidden bg-feather"
                  >
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
                  </Link>

                  <div className="flex flex-1 flex-col gap-2.5 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[2px] text-brand">
                          {product.tagline}
                        </p>
                        <h2 className="mt-1 font-display text-xl leading-snug uppercase text-ink">
                          <Link
                            href={`/productos/${product.slug}`}
                            className="transition-colors hover:text-brand"
                          >
                            {product.name}
                          </Link>
                        </h2>
                      </div>
                      <Badge
                        variant="secondary"
                        className="h-auto shrink-0 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider"
                      >
                        {product.size}
                      </Badge>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>

                    <div className="mt-1 flex items-baseline justify-center gap-2 rounded-2xl bg-feather px-4 py-3 text-center">
                      <span className="font-display text-sm leading-none text-ink">
                        {product.servings}
                      </span>
                      <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                        servicios
                      </span>
                    </div>

                    <div className="mt-auto flex items-end justify-between border-t border-border pt-5">
                      <span className="font-display text-3xl text-ink">
                        {formatARS(product.price)}
                      </span>
                      {oldPrice && (
                        <span className="flex flex-col items-end leading-tight">
                          <span className="text-xs text-muted-foreground line-through">
                            {formatARS(oldPrice)}
                          </span>
                          <span className="mt-1 rounded-full bg-brand-light px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-brand">
                            Oferta · {savings}% dcto
                          </span>
                        </span>
                      )}
                    </div>

                    <AddToCartButton slug={product.slug} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="px-3 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-16 sm:px-2 md:grid-cols-3 lg:px-8">
          {perks.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 90}>
              <div className="flex h-full flex-col items-start gap-3 rounded-3xl bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand">
                  <perk.icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-sm uppercase tracking-wide text-ink">
                  {perk.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {perk.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-3 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 rounded-[2rem] bg-feather px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-xl uppercase text-ink sm:text-2xl">
              Ficha técnica del producto
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-graphite">
              Revisá las especificaciones de FECA, su origen y las condiciones de
              almacenamiento antes de comprar.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/ficha-tecnica"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-xs font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-dark"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Ver ficha técnica
            </a>
            <a
              href="/ficha-tecnica/FECA-Ficha-Tecnica.pdf"
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-xs font-bold uppercase tracking-[1px] text-brand shadow-sm transition-colors hover:bg-cream"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Descargar PDF
            </a>
          </div>
        </div>
      </section>

      <section className="px-3 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 rounded-[2.5rem] bg-graphite px-6 py-14 text-center sm:px-10 lg:px-16">
          <h2 className="font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
            ¿Listo para impulsar tu rutina?
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Sumá FECA a tu día a día y sentí la diferencia en fuerza,
            resistencia y recuperación.
          </p>
          <CtaButton href="/calidad" label="Verificar mi lote" variant="light" />
        </div>
      </section>
    </>
  );
}