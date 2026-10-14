// Punto de acceso al hub de contenido "Aprender sobre creatina".
import type { Article } from "@/content/creatina/types";
import { articles } from "@/content/creatina/articles";

export type { Article, Block, Faq } from "@/content/creatina/types";

/** Todos los artículos, en orden de publicación. */
export function getArticles(): Article[] {
  return articles;
}

/** Un artículo por slug. */
export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/** Slugs (para `generateStaticParams`). */
export function getArticleSlugs(): string[] {
  return articles.map((article) => article.slug);
}

/** Artículos relacionados resueltos (ignora slugs inexistentes). */
export function getRelated(article: Article): Article[] {
  return article.related
    .map((slug) => getArticle(slug))
    .filter((item): item is Article => Boolean(item));
}

export const articlePath = (slug: string) => `/creatina/${slug}`;
