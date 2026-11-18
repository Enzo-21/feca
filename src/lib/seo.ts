// Configuración central de SEO / posicionamiento.
//
// Fuente única para: identidad de organización, imágenes sociales, keywords
// por defecto y utilidades de URL absoluta. Ver `docs/plan-seo-pseo-agentes.md`.
import { SITE_NAME, SITE_URL } from "@/lib/site";

export { SITE_NAME, SITE_URL };

// Generadas con `npm run og` (scripts/generate-og.mjs). Si cambia el diseño,
// subir la versión del archivo para que las redes no sirvan la copia en caché.
export const OG_IMAGE = "/icons/og-v2.jpg";
export const OG_IMAGE_TWITTER = "/icons/og-twitter-v2.jpg";
export const OG_IMAGE_ALT = "FECA — Creatina monohidrato pura, certificada lote a lote";

/** Imagen social por defecto, lista para `openGraph.images`. */
export const ogImages = [
  {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: OG_IMAGE_ALT,
  },
];

/** Datos de la entidad (organization) usados en JSON-LD y metadatos. */
export const organization = {
  name: SITE_NAME,
  legalName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512.png`,
  description:
    "FECA es una marca argentina de creatina monohidrato 200 mesh, pura y trazable, con certificado de análisis público por lote.",
  whatsapp: "+5493516195674",
  areaServed: "AR",
  // Completar SOLO con perfiles oficiales reales (p. ej. Instagram) cuando
  // existan. No inventar URLs: un `sameAs` falso rompe la confianza del modelo.
  sameAs: [] as string[],
};

export const defaultKeywords = [
  "creatina",
  "creatina monohidrato",
  "creatina monohidrato 200 mesh",
  "FECA",
  "suplementos",
  "Argentina",
  "rendimiento",
  "fuerza",
];

/** Convierte una ruta relativa del sitio en URL absoluta. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
