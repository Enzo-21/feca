import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarClock, Clock, HelpCircle } from "lucide-react";
import Reveal from "@/components/reveal";
import Breadcrumbs from "@/components/breadcrumbs";
import ArticleBlocks from "@/components/article-blocks";
import JsonLd from "@/components/json-ld";
import { CtaButton } from "@/components/cta-button";
import {
  getArticle,
  getArticleSlugs,
  getRelated,
  articlePath,
} from "@/content/creatina";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.metaTitle ?? article.title,
    description: article.description,
    alternates: { canonical: articlePath(article.slug) },
    openGraph: {
      type: "article",
      title: article.metaTitle ?? article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelated(article);
  const path = articlePath(article.slug);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({ ...article, path }),
          faqSchema(article.faqs),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Aprender", path: "/creatina" },
            { name: article.title, path },
          ]),
        ]}
      />

      <section className="px-3 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl px-4 pt-24 sm:px-2 lg:px-0 lg:pt-28">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Aprender", href: "/creatina" },
              { label: article.metaTitle ?? article.title },
            ]}
          />

          <Reveal className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand" aria-hidden="true" />
                {article.readingMinutes} min de lectura
              </span>
              <span className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-brand" aria-hidden="true" />
                Actualizado {article.updated}
              </span>
            </div>
            <h1 className="font-display text-3xl leading-tight uppercase text-ink sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="border-l-4 border-brand pl-4 text-lg leading-relaxed text-ink">
              {article.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-2 lg:px-0">
          <ArticleBlocks blocks={article.blocks} />
        </div>
      </section>

      {article.faqs.length > 0 && (
        <section className="px-3 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-2 lg:px-0">
            <Reveal className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-xl uppercase text-ink">
                <HelpCircle className="h-5 w-5 text-brand" aria-hidden="true" />
                Preguntas frecuentes
              </h2>
              <dl className="mt-6 flex flex-col divide-y divide-border">
                {article.faqs.map((faq) => (
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
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-2 lg:px-0">
          <Link
            href="/creatina"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a Aprender
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="px-3 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-2 lg:px-0">
            <h2 className="mb-5 font-display text-xl uppercase text-ink">
              Seguí leyendo
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={articlePath(item.slug)}
                  className="group flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="text-sm font-semibold uppercase tracking-wide text-ink">
                    {article.metaTitle ?? item.title}
                  </span>
                  <ArrowLeft
                    className="ml-auto h-4 w-4 rotate-180 text-border transition-colors group-hover:text-brand"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-3 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 rounded-[2.5rem] bg-graphite px-6 py-14 text-center sm:px-10">
          <h2 className="font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
            Creatina pura, con los datos a la vista
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Monohidrato 200 mesh con certificado de análisis por lote. Mirá las
            presentaciones disponibles.
          </p>
          <CtaButton href="/comprar" label="Ver productos" variant="light" />
        </div>
      </section>
    </>
  );
}
