import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarClock, Clock, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumbs";
import ArticleBlocks from "@/components/article-blocks";
import JsonLd from "@/components/json-ld";
import Reveal from "@/components/reveal";
import { CtaButton } from "@/components/cta-button";
import { priceGuide, priceGuidePath } from "@/content/precio-creatina";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: priceGuide.metaTitle ?? priceGuide.title,
  description: priceGuide.description,
  alternates: { canonical: priceGuidePath },
  openGraph: {
    type: "article",
    title: priceGuide.metaTitle ?? priceGuide.title,
    description: priceGuide.description,
  },
};

export default function PrecioCreatinaPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({ ...priceGuide, path: priceGuidePath }),
          faqSchema(priceGuide.faqs),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: priceGuide.title, path: priceGuidePath },
          ]),
        ]}
      />

      <section className="px-3 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl px-4 pt-24 sm:px-2 lg:px-0 lg:pt-28">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: priceGuide.metaTitle ?? priceGuide.title },
            ]}
          />

          <Reveal className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand" aria-hidden="true" />
                {priceGuide.readingMinutes} min de lectura
              </span>
              <span className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-brand" aria-hidden="true" />
                Actualizado {priceGuide.updated}
              </span>
            </div>
            <h1 className="font-display text-3xl leading-tight uppercase text-ink sm:text-4xl lg:text-5xl">
              {priceGuide.title}
            </h1>
            <p className="border-l-4 border-brand pl-4 text-lg leading-relaxed text-ink">
              {priceGuide.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-2 lg:px-0">
          <ArticleBlocks blocks={priceGuide.blocks} />
        </div>
      </section>

      {priceGuide.faqs.length > 0 && (
        <section className="px-3 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-2 lg:px-0">
            <Reveal className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-xl uppercase text-ink">
                <HelpCircle className="h-5 w-5 text-brand" aria-hidden="true" />
                Preguntas frecuentes
              </h2>
              <dl className="mt-6 flex flex-col divide-y divide-border">
                {priceGuide.faqs.map((faq) => (
                  <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                    <dt className="font-display text-base uppercase leading-snug text-ink">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-graphite">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      )}

      <div className="px-3 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 sm:px-2 lg:px-0">
          <Link
            href="/comprar"
            className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Ver presentaciones y precios
          </Link>
          <Link
            href="/creatina"
            className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wider text-graphite hover:text-brand"
          >
            Más guías sobre creatina
          </Link>
        </div>
      </div>

      <section className="px-3 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 rounded-[2.5rem] bg-graphite px-6 py-14 text-center sm:px-10">
          <h2 className="font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
            Precio claro, pureza verificable
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Monohidrato 200 mesh con certificado de análisis por lote. Compará el
            precio por gramo, no el del envase.
          </p>
          <CtaButton href="/comprar" label="Ver productos" variant="light" />
        </div>
      </section>
    </>
  );
}
