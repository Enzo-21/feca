// Constructores de datos estructurados (schema.org).
//
// Cada función devuelve un objeto plano listo para pasar a `<JsonLd>`. El
// contenido debe coincidir con lo visible en la página (requisito de Google).
import { products, type Product } from "@/lib/products";
import type { Certificate } from "@/lib/certificates";
import type { Article, Faq } from "@/content/creatina/types";
import { SITE_NAME, absoluteUrl, organization } from "@/lib/seo";

const BRAND = { "@type": "Brand", name: SITE_NAME } as const;

/** Organización. Se inyecta una vez, a nivel de layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    legalName: organization.legalName,
    url: organization.url,
    logo: organization.logo,
    description: organization.description,
    ...(organization.sameAs.length > 0 ? { sameAs: organization.sameAs } : {}),
    areaServed: { "@type": "Country", name: "Argentina", addressCountry: "AR" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: organization.whatsapp,
        areaServed: "AR",
        availableLanguage: ["es"],
      },
    ],
  };
}

/** Sitio web. Se inyecta a nivel de layout, junto con la organización. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: organization.url,
    inLanguage: "es-AR",
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

type Crumb = { name: string; path: string };

/** Migas de pan a partir de una lista de {name, path}. */
export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Propiedades técnicas del producto, reutilizadas en la ficha. */
const productProperties = [
  { name: "Forma", value: "Monohidrato de creatina 200 mesh" },
  { name: "Pureza (HPLC)", value: "≥ 99,5 %" },
  { name: "Origen", value: "China" },
];

/** Producto + oferta para una presentación concreta. */
export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${product.size}`,
    description: product.description,
    image: [absoluteUrl(product.image)],
    sku: product.slug,
    category: "Suplemento dietario",
    brand: BRAND,
    url: absoluteUrl(`/productos/${product.slug}`),
    additionalProperty: productProperties.map((p) => ({
      "@type": "PropertyValue",
      name: p.name,
      value: p.value,
    })),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/productos/${product.slug}`),
      priceCurrency: "ARS",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}

/** Listado de la tienda (`/comprar`). */
export function itemListSchema(items: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${product.name} ${product.size}`,
      url: absoluteUrl(`/productos/${product.slug}`),
    })),
  };
}

/** Artículo de la sección "Aprender sobre creatina". */
export function articleSchema(article: Article & { path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "es-AR",
    datePublished: article.published ?? article.updated,
    dateModified: article.updated,
    mainEntityOfPage: absoluteUrl(article.path),
    url: absoluteUrl(article.path),
    image: [absoluteUrl("/icons/og.png")],
    author: { "@type": "Organization", name: SITE_NAME },
    reviewedBy: article.reviewedBy
      ? { "@type": "Person", name: article.reviewedBy }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: organization.logo },
    },
  };
}

/** Bloque de preguntas frecuentes (sin esperar rich result: deprecado en 2026). */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Referencia al lote/certificado de calidad, en HTML indexable. */
export function certificateSchema(certificate: Certificate) {
  const path = `/calidad/${certificate.lot}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Certificado de análisis — Lote ${certificate.lot}`,
    description: `Certificado de análisis de ${certificate.product} del lote ${certificate.lot}, analizado el ${certificate.date}.`,
    sku: certificate.lot,
    brand: BRAND,
    url: absoluteUrl(path),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(path),
      priceCurrency: "ARS",
      price: products[0]?.price ?? 0,
      availability: "https://schema.org/InStock",
    },
  };
}
