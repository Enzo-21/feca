import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { certificates } from "@/lib/certificates";
import { getArticles } from "@/content/creatina";
import { absoluteUrl } from "@/lib/seo";

/** "DD/MM/AAAA" → ISO `YYYY-MM-DD` (para `lastModified`). */
function toISODate(value: string): string | undefined {
  const [day, month, year] = value.split("/");
  return year && month && day ? `${year}-${month}-${day}` : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/comprar"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/calidad"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/ficha-tecnica"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/creatina"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/nosotros"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contacto"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/terminos"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacidad"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/productos/${product.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const articleEntries: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: absoluteUrl(`/creatina/${article.slug}`),
    lastModified: article.updated,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const lotEntries: MetadataRoute.Sitemap = certificates.map((certificate) => ({
    url: absoluteUrl(`/calidad/${certificate.lot}`),
    lastModified: toISODate(certificate.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...productEntries, ...articleEntries, ...lotEntries];
}
