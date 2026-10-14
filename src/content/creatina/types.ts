// Tipos del hub de contenido "Aprender sobre creatina".
//
// El contenido es un módulo tipado (no MDX) para mantener control del layout,
// del esquema JSON-LD y de las fechas de actualización. Ver
// `docs/plan-seo-pseo-agentes.md` (§2 y §11).

export type Faq = {
  question: string;
  answer: string;
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "callout"; tone?: "info" | "warn"; title?: string; text: string };

export type Article = {
  /** Slug dentro de `/creatina/<slug>`. */
  slug: string;
  /** H1 de la página (puede ser en forma de pregunta). */
  title: string;
  /** `<title>` para SEO. Si falta se usa `title`. */
  metaTitle?: string;
  /** Meta description (150–160 caracteres). */
  description: string;
  /** Respuesta directa (40–60 palabras) que abre el artículo. */
  intro: string;
  /** Fecha de última revisión, formato ISO `YYYY-MM-DD`. */
  updated: string;
  /** Fecha de publicación ISO (opcional). */
  published?: string;
  /** Quién revisó el contenido (E-E-A-T). Opcional. */
  reviewedBy?: string;
  /** Tiempo estimado de lectura, en minutos. */
  readingMinutes: number;
  /** Intención de búsqueda que cubre (para el backlog editorial). */
  intent: string;
  /** Cuerpo del artículo. */
  blocks: Block[];
  /** Preguntas frecuentes (se muestran y se marcan con FAQPage). */
  faqs: Faq[];
  /** Slugs de artículos relacionados. */
  related: string[];
};
