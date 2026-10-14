import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import JsonLd from "@/components/json-ld";
import { CtaButton } from "@/components/cta-button";
import { getArticles, articlePath } from "@/content/creatina";
import { absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Aprender sobre creatina",
  description:
    "Guías claras y basadas en evidencia sobre creatina: qué es, cuánto tomar, cómo tomarla, beneficios, mitos y cómo elegir una buena creatina.",
  alternates: { canonical: "/creatina" },
};

export default function CreatinaHubPage() {
  const articles = getArticles();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Aprender", path: "/creatina" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Aprender sobre creatina",
            inLanguage: "es-AR",
            url: absoluteUrl("/creatina"),
            hasPart: articles.map((article) => ({
              "@type": "Article",
              headline: article.title,
              url: absoluteUrl(articlePath(article.slug)),
            })),
          },
        ]}
      />

      <PageHero
        eyebrow="Aprender"
        title="Todo sobre creatina"
        description="Contenido claro y basado en la evidencia para que sepas qué es la creatina, cuánto y cómo tomarla, y cómo elegir un producto confiable."
      />

      <section className="px-3 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:px-2 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 60}>
              <Link
                href={articlePath(article.slug)}
                className="group flex h-full flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand">
                  <BookOpen className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h2 className="font-display text-lg leading-snug uppercase text-ink">
                  {article.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {article.description}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-wider text-brand">
                  Leer · {article.readingMinutes} min
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-3 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 rounded-[2.5rem] bg-feather px-6 py-14 text-center sm:px-10 lg:px-16">
          <h2 className="font-display text-2xl uppercase leading-tight text-ink sm:text-3xl">
            ¿Ya sabés lo que buscás?
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-graphite sm:text-base">
            Conocé nuestras presentaciones de creatina monohidrato 200 mesh, con
            certificado de análisis por lote.
          </p>
          <CtaButton href="/comprar" label="Ver productos" variant="primary" />
        </div>
      </section>
    </>
  );
}
