import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, FileText, ShieldCheck } from "lucide-react";
import { products, getProduct } from "@/lib/products";
import { formatARS } from "@/lib/format";
import { technicalSheet } from "@/lib/technical_sheet";
import Reveal from "@/components/reveal";
import Breadcrumbs from "@/components/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { CtaButton } from "@/components/cta-button";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import JsonLd from "@/components/json-ld";
import { productSchema, breadcrumbSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.size}`,
    description: product.description,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: {
      title: `${product.name} ${product.size} | FECA®`,
      description: product.description,
      images: [{ url: product.image, alt: `${product.name} ${product.size}` }],
    },
  };
}

const highlights = [
  "Monohidrato de creatina 200 mesh, sin aditivos.",
  "Pureza de referencia ≥ 99,5 % (HPLC).",
  "Certificado de análisis por lote, verificable online.",
];

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const oldPrice =
    product.discountPct > 0
      ? Math.round(product.price / (1 - product.discountPct / 100))
      : undefined;
  const others = products.filter((item) => item.slug !== product.slug);
  const pricePerKg = Math.round(product.price / (product.grams / 1000));

  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Comprar", href: "/comprar" },
    { label: product.size },
  ];

  return (
    <>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Comprar", path: "/comprar" },
            { name: product.size, path: `/productos/${product.slug}` },
          ]),
        ]}
      />

      <section className="px-3 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl px-4 pt-24 sm:px-2 lg:px-8 lg:pt-28">
            <Breadcrumbs items={crumbs.map((c) => ({ label: c.label, href: c.href }))} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal className="relative aspect-square overflow-hidden rounded-3xl bg-feather">
              <Image
                src={product.image}
                alt={`${product.name} ${product.size}`}
                fill
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="object-cover"
                priority
                unoptimized
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-brand px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[1px] text-white shadow-sm">
                  {product.badge}
                </Badge>
              )}
            </Reveal>

            <Reveal delay={80} className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-brand">
                  {product.tagline}
                </p>
                <h1 className="mt-2 font-display text-3xl leading-tight uppercase text-ink sm:text-4xl">
                  {product.name} {product.size}
                </h1>
              </div>

              <p className="text-base leading-relaxed text-graphite">
                {product.description}
              </p>

              <ul className="flex flex-col gap-2.5">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-graphite">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-end gap-x-4 gap-y-2 rounded-2xl bg-feather px-5 py-4">
                <span className="font-display text-3xl text-ink">
                  {formatARS(product.price)}
                </span>
                {oldPrice && (
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs text-muted-foreground line-through">
                      {formatARS(oldPrice)}
                    </span>
                    <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand">
                      Oferta · {product.discountPct}% dcto
                    </span>
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {product.servings} servicios · {product.size}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <AddToCartButton slug={product.slug} />
                <CtaButton
                  href="/calidad"
                  label="Verificar mi lote"
                  variant="outline"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-3 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:px-2 lg:grid-cols-3 lg:px-8">
          <Reveal className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg uppercase text-ink">
              Especificaciones clave
            </h2>
            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Pureza (Assay)</dt>
                <dd className="font-display text-brand">≥ 99,5 %</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Forma</dt>
                <dd className="text-graphite">Monohidrato 200 mesh</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Origen</dt>
                <dd className="text-graphite">{technicalSheet.country_of_origin}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Precio por kg</dt>
                <dd className="text-graphite">{formatARS(pricePerKg)}</dd>
              </div>
            </dl>
            <Link
              href="/ficha-tecnica"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand hover:underline"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Ver ficha técnica completa
            </Link>
          </Reveal>

          <Reveal delay={90} className="rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
            <h2 className="font-display text-lg uppercase text-ink">
              Qué es y cómo tomarla
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-graphite">
              La creatina es uno de los suplementos con más respaldo científico.
              Suplementada como monohidrato, aumenta las reservas de
              fosfocreatina del músculo y ayuda a sostener esfuerzos cortos e
              intensos.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              La dosis de mantenimiento es de <strong>3 a 5 g por día, todos
              los días</strong>. No es necesario hacer una fase de carga: la
              constancia es lo que satura el músculo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/creatina/como-tomar"
                className="text-xs font-bold uppercase tracking-wider text-brand hover:underline"
              >
                Cómo tomar creatina
              </Link>
              <span className="text-border" aria-hidden="true">
                ·
              </span>
              <Link
                href="/creatina/cuanta-tomar"
                className="text-xs font-bold uppercase tracking-wider text-brand hover:underline"
              >
                Cuánta tomar
              </Link>
              <span className="text-border" aria-hidden="true">
                ·
              </span>
              <Link
                href="/calidad"
                className="text-xs font-bold uppercase tracking-wider text-brand hover:underline"
              >
                Ver un certificado real
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-2 lg:px-8">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-brand" aria-hidden="true" />
            <h2 className="font-display text-xl uppercase text-ink">
              Otras presentaciones
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {others.map((item) => (
              <Reveal key={item.slug}>
                <Link
                  href={`/productos/${item.slug}`}
                  className="group flex items-center gap-5 rounded-3xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-feather">
                    <Image
                      src={item.image}
                      alt={`${item.name} ${item.size}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-[2px] text-brand">
                      {item.size}
                    </span>
                    <span className="mt-1 font-display text-lg uppercase text-ink">
                      {formatARS(item.price)}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {item.servings} servicios
                    </span>
                  </div>
                  <ArrowLeft className="ml-auto h-5 w-5 rotate-180 text-border transition-colors group-hover:text-brand" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
