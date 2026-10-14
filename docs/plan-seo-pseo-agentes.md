# Plan: Posicionamiento — SEO, pSEO, AEO/GEO y Descubrimiento por Agentes

> Documento maestro de posicionamiento de FECA. Separa las estrategias, audita
> el estado actual, define las plantillas y deja el backlog de contenido y el
> roadmap. **No es material de blog**: es un plan operativo. Inspirado en
> `vexor/docs/plan-seo-pseo-agentes.md`, adaptado al reality de FECA (una sola
> línea de producto, mercado Argentina, checkout por WhatsApp, Next.js App
> Router estático).

> **Estado: implementado.** La guía operativa (cómo se genera, cómo se
> verifica y cómo se extiende) vive en [`seo-pseo-agentes.md`](./seo-pseo-agentes.md).

---

## 0. Objetivo

Que cuando alguien pregunte a Google, ChatGPT, Claude, Perplexity, Gemini o
Copilot alguna de estas cosas, la respuesta **cite contenido de `feca.com.ar`**
con datos correctos:

- *"¿cuál es la mejor creatina en Argentina?"*
- *"¿cuánta creatina tomar por día?"*
- *"¿FECA creatina es buena?"*
- *"¿cómo sé si mi creatina es pura?"*
- *"creatina lote 202604-013"*

Contexto del negocio:

| Ítem | Valor |
|---|---|
| Producto | Creatina monohidrato 200 mesh (un SKU, 3 presentaciones: 300 g / 500 g / 1 kg) |
| Mercado | Argentina, español **es-AR** (voseo) |
| Checkout | Coordinación por WhatsApp (no pasarela en línea hoy) |
| Stack | Next.js 16 (App Router), mayormente estático, Deploy en Vercel |
| Activo diferencial | **Ficha técnica técnica con especificaciones reales + Certificado de análisis (CoA) por lote, verificable por el consumidor.** |

La apuesta central: FECA puede ser **la marca que los modelos citan** porque
tiene *datos de primera mano verificables* (pureza por HPLC, CoA por lote,
ficha técnica). Eso es exactamente lo que los motores generativos premian y la
mayoría de las marcas de suplementos no publica.

---

## 1. Separación de conceptos

Cada estrategia tiene objetivo, métrica y dueño distintos. **No se mezclan.**

| Estrategia | Alcance | Métrica objetivo | Responsable |
|---|---|---|---|
| **SEO (tradicional)** | Indexación, canónicos, sitemap, robots, metadata, enlaces internos, rendimiento, accesibilidad. | URLs indexadas válidas, sin errores de rastreo, top-10 para el núcleo de intenciones. | Eng. + Contenido |
| **pSEO (Programmatic SEO)** | Páginas generadas por plantilla + datos: producto por presentación, lote por certificado, hubs temáticos. | % de intenciones cubiertas con URL propia y útil. | Eng. + Contenido |
| **AEO/GEO** | Visibilidad en motores de respuesta (AI Overviews/AI Mode, ChatGPT, Claude, Perplexity, Copilot): respuesta primero, datos citables, `llms.txt`, FAQ. | Apariciones/citas en respuestas generativas y clics desde referrers de IA. | Contenido + Eng. |
| **Descubrimiento por agentes** | Que un agente pueda leer la marca sin fricción: `robots.txt` explícito, JSON estático de productos y lotes, datos estructurados consistentes. | Uso correcto de datos por agentes; menos ambigüedad de entidad. | Eng. |
| **Posicionamiento competitivo** | Comparativas, propuesta de valor, precio por gramo. Ver doc aparte (crear `docs/BLOG-POSICIONAMIENTO.md` si se arranca el blog). | Menciones de marca. | Marketing |

> Regla: si una tarea no calza en una de las primeras cuatro columnas, va al
> documento correcto o se justifica antes de incluirla.

---

## 2. Estado actual (auditoría honesta)

### 2.1 Lo que ya existe y sirve

| Recurso | Ruta | Estado |
|---|---|---|
| Home con H1, beneficios, productos, FAQ | `/` | ✅ contenido real, estático, buen punto de partida |
| Tienda | `/comprar` | ✅ metadata propia, 3 productos, precios en ARS |
| Calidad (buscador de lote) | `/calidad` | ✅ metadata propia; buscador client-side |
| Ficha técnica (HTML) | `/ficha-tecnica` | ✅ **contenido técnico en HTML** (no solo PDF) — clave para AEO |
| Metadata global + OG/Twitter + manifest | `layout.tsx`, `manifest.ts` | ✅ baseline sólido |
| Assets de marca | `public/icons/*`, `public/images/*` | ✅ OG, iconos, fotos de producto |
| Datos de producto | `src/lib/products.ts` | ✅ fuente tipada (precio, g, servings, slug) |
| Índice de lotes | `src/lib/certificates.generated.ts` | ✅ generado en build, con tests por lote |
| Rendimiento | Next App Router | ✅ estático, `next/image`, fuentes self-hosted |

### 2.2 Brechas (lo que falta)

| Brecha | Impacto | Prioridad |
|---|---|---|
| **Sin `robots.txt`** | No se declaran políticas para crawlers de IA; no hay sitemap referenciado. | Alta |
| **Sin `sitemap.xml`** | Indexación más lenta/parcial. | Alta |
| **Sin datos estructurados (JSON-LD)** | Sin `Organization`, `Product`, `Offer`, `BreadcrumbList`, `Article`. Pérdida de claridad de entidad y de elegibilidad en Merchant listings. | Alta |
| **Productos sin URL propia** | Hoy son anclas (`/comprar#creatina-monohidrato-300g`). No hay página indexable por presentación → no hay `Product` schema ni ranking por long-tail. | Alta |
| **Sin hub de contenido educativo** | FECA no compite por las consultas reales ("cuánta creatina tomar", "creatina efectos secundarios"). Es donde vive el volumen y de dónde salen las citas de IA. | Alta |
| **Lotes sin URL profunda** | El CoA no tiene página indexable (`/calidad/<LOT>`). Se pierde el activo más diferencial. | Alta |
| **Sin `llms.txt` / `llms-full.txt`** | Bajo impacto real (ver §7), pero barato. | Baja |
| **Sin canónicos/alternates explícitos** | Riesgo de duplicados a futuro. | Media |
| **Páginas legales vacías** (`#`) | E-E-A-T/YMYL: falta Términos, Privacidad, Contacto, "Nosotros". | Media |
| **Sin entidad de marca clara** (`sameAs`) | Los modelos no saben que FECA es una entidad. | Media |
| **Sin autoría/revisión experta** | Salud = YMYL; sin firma profesional cuesta la confianza. | Media |

---

## 3. Principios no negociables

1. **Google primero.** En 2026 la evidencia es consistente: ~92% de las citas de
   IA provienen de páginas que ya rankean en el top-10 orgánico. Si FECA no
   rankea, no la citan. El SEO clásico es *prerequisito*, no un canal paralelo.
2. **Respuesta primero.** Cada sección abre con la respuesta directa (40–60
   palabras) antes del desarrollo. H2/H3 en formato pregunta.
3. **Datos de primera mano.** Pureza, CoA por lote, especificaciones de la ficha
   técnica. Números concretos > adjetivos. Se publican y se citan.
4. **Un dato, una fuente.** Especificaciones y resultados se toman **verbatim**
   de `data/lotes/**` y `src/lib/technical_sheet.ts` (misma regla que los PDFs,
   ver `docs/brand-pdf-system.md`).
5. **No inventar.** Ni reviews, ni ratings, ni comparativas con números que no
   podamos respaldar. Los datos fabricados rompen la confianza y pueden violar
   políticas de Google (YMYL).
6. **Español es-AR** en todo el "chrome"; los datos técnicos del proveedor
   permanecen verbatim (nombres de parámetros en inglés).
7. **Sin staging público.** Cero referencias a entornos internos en contenido,
   `llms.txt`, JSON o datos estructurados.

---

## 4. Fuente única de verdad

| Dominio | Archivo canónico | Regla |
|---|---|---|
| Marca / URL base | `src/lib/site.ts` (`SITE_URL`, `SITE_NAME`) | Todo canónico/OG/JSON-LD arma URLs desde acá. |
| Productos | `src/lib/products.ts` | Precio, gramos, servings, slug, imagen: única fuente para páginas, schema y JSON estático. |
| Lotes / CoA | `src/lib/certificates.generated.ts` (generado) + `data/lotes/<LOT>/` | Páginas `/calidad/<LOT>` y JSON de lote salen de acá, nunca hardcodeados. |
| Ficha técnica | `src/lib/technical_sheet.ts` | Specs de producto (HTML + PDF + schema). |
| SEO global | **NUEVO** `src/config/seo.ts` | Defaults de metadata, `sameAs`, locales, textos de marca. Listas de rutas y prompts de medición. |
| Contenido editorial | **NUEVO** `src/content/creatina/*.mdx` (o `.ts` tipado) | Artículos del hub. Un módulo, no strings sueltos en componentes. |
| Datos estructurados | **NUEVO** `src/lib/structured-data.ts` | Constructores de JSON-LD reutilizables (Organization, Product, Offer, Article, BreadcrumbList, FAQPage). |

Prohibido hardcodear precios, listas de productos, lotes o specs fuera de su
fuente canónica.

---

## 5. SEO (tradicional)

| Punto clave | Estado | Acción | Criterio de aceptación |
|---|---|---|---|
| **Canónicos & `metadataBase`** | `metadataBase` en layout; sin `alternates`. | Definir `canonical` por página (`alternates.canonical`) usando `SITE_URL`. | Cada URL declara su canónico en producción. |
| **`sitemap.xml`** | No existe. | Crear `src/app/sitemap.ts` (MetadataRoute) que itere estáticas + productos + artículos + lotes. | Sitemap válido, sin 404, con `lastModified`. |
| **`robots.txt`** | No existe. | Crear `src/app/robots.ts` con reglas de §8 y referencia al sitemap. | Crawlers de búsqueda e IA permitidos; sitemap linkeado. |
| **Metadata por página** | Existe en `/comprar`, `/calidad`, `/ficha-tecnica`. | Añadir `generateMetadata` a páginas nuevas; `openGraph.url` canónico por página. | `<title>`/OG únicos y correctos por URL. |
| **Rendimiento / CWV** | Estático, `next/image`. | Mantener; vigilar LCP del hero. | Sin regresión. |
| **Enlazado interno** | Básico (header/footer). | Hub de contenido enlazado desde home, productos y artículos (y viceversa). Reglas de "artículos relacionados". | Sin huérfanos; 2+ clics desde home a cada artículo. |
| **Legales/E-E-A-T** | Enlaces `#`. | Páginas `/terminos`, `/privacidad`, `/contacto`, `/nosotros`. | Publicadas y enlazadas en el footer. |

> Nota de implementación: este repo usa **Next 16** con APIs tipadas
> (`PageProps<"/ruta">`, `LayoutProps<"/">`). **Antes de escribir código**, leer
> la guía correspondiente en `node_modules/next/dist/docs/` (metadata, `sitemap`,
> `robots`, `opengraph-image`) porque pueden diferir de versiones previas
> (ver `AGENTS.md`).

---

## 6. pSEO (Programmatic SEO)

pSEO = plantillas + datos. Dos "motores" de datos propios: **productos** y
**lotes**.

### 6.1 Motor 1 — Producto por presentación

| Punto clave | Estado | Acción | Criterio |
|---|---|---|---|
| Páginas por SKU | No existen (anclas). | Crear `src/app/productos/[slug]/page.tsx` iterando `products`. Slug ya existe (`creatina-monohidrato-300g|500g|1kg`). | 3 URLs indexables, `generateStaticParams`. |
| Plantilla única | — | Un componente de detalle; datos por `getProduct(slug)`. | Cero duplicación manual. |
| Schema `Product`/`Offer` | No existe. | JSON-LD con precio ARS, disponibilidad, marca, imagen, `url` (§9). | Validado en Rich Results Test. |
| Enlazado | `/comprar` y home apuntan a anclas. | Cambiar a `/productos/<slug>`; `/comprar` pasa a ser índice de tienda. | Sin enlaces rotos; redirección si cambia el ancla. |

### 6.2 Motor 2 — Lote por certificado (el activo diferencial)

| Punto clave | Estado | Acción | Criterio |
|---|---|---|---|
| Página por lote | No existe. | Crear `src/app/calidad/[lot]/page.tsx` desde `certificates` (genera estáticamente; `generateStaticParams`). | `/calidad/202604-013` responde 200 con datos del CoA en HTML. |
| HTML con los datos | Hoy el CoA es PDF. | Renderizar en HTML: producto, fecha de análisis, conclusión, tabla de resultados, enlace al PDF. | El texto del PDF está también en HTML (para LLMs y accesibilidad). |
| Schema | — | `Product`/`Offer` + `BreadcrumbList` + `Organization`. | Válido. |
| Buscador | Client-side en `/calidad`. | Mantener el buscador; cada resultado enlaza a `/calidad/<LOT>`. | Lote verificable por URL permanente. |

Si el catálogo de lotes crece, `/calidad/<LOT>` pasa a ser el motor pSEO
principal: cada lote es una URL única con datos verificables ("FECA lote
`<LOT>`: pureza 99,8 %, aprobado el DD/MM/AAAA"). Sin duplicados manuales:
**todo sale del generador de documentos**.

### 6.3 Motor 3 — Hub temático de creatina

Ver §11 (backlog de intenciones). Hub `/creatina` + artículos answer-first.

### 6.4 Reglas pSEO

- Toda página pSEO debe tener **contenido único útil** (no varianza cosmética).
- Generar desde datos (nunca copiar a mano), con `generateStaticParams`.
- Canonical propio; sin `noindex`.
- Si una variante no aporta valor (misma intención), **no crear la página**.

---

## 7. AEO/GEO (motores de respuesta)

> Hallazgo clave de la investigación 2026: **no existe "schema de IA"** ni un
> archivo mágico. Google dice explícitamente que **no usa `llms.txt`**. Lo que
> mueve la aguja es: rankear, contenido respuesta-primero, datos originales,
> claridad de entidad y **menciones de terceros**. `llms.txt` es opcional.

| Punto clave | Estado | Acción | Criterio |
|---|---|---|---|
| **Respuesta primero** | Home/FAQ son marketing, no Q&A. | Reestructurar el hub: H2 en forma de pregunta + respuesta directa (40–60 palabras) al inicio. | Cada sección responde una intención en el primer párrafo. |
| **Datos citables** | Pureza 99,5%, ficha técnica, CoA. | Publicar una tabla de "datos de FECA" reutilizable (número, unidad, fuente). Incluir lotes reales. | Hechos numéricos verificables, con fuente. |
| **Tablas y listas** | Pocas (specs). | Tablas de dosificación (por peso), comparativa de formas de creatina, precios por gramo. | Formatos que los modelos extraen bien. |
| **FAQ estructurada** | FAQ visible en home (client). | Mantener el FAQ visible; añadir `FAQPage` JSON-LD (sirve para extracción aunque Google **deprecó el rich result** en 2026). | Markup válido; contenido igual al visible. |
| **Frescura** | Estático. | Fecha de "última actualización" visible + `dateModified` en artículos; revisar trimestralmente los top. | Contenido < 6 meses en los pilares. |
| **Entidad de marca** | Sin `sameAs`. | `Organization` con `sameAs` (Instagram, WhatsApp/contacto, y perfiles reales). | Entidad consistente en toda la web. |
| **`llms.txt`** | No existe. | Crear `/public/llms.txt` (índice curado) y `/public/llms-full.txt` (versión larga). **Bajo impacto, barato.** | Archivos válidos y enlazados. |
| **Menciones de terceros** | Nula. | PR real: prensa fitness/health AR, roundups "mejores creatinas Argentina", Reddit, reviews. | Menciones ganadas (ver §13). |

### 7.1 Contenido de `llms.txt` (es-AR)

```
# FECA

> Monohidrato de creatina 200 mesh de máxima pureza (≥ 99,5% por HPLC),
> certificado por lote. FECA es una marca argentina de suplementos.

## Productos
- [Creatina 300 g](https://feca.com.ar/productos/creatina-monohidrato-300g): ...
- [Creatina 500 g](https://feca.com.ar/productos/creatina-monohidrato-500g): ...
- [Creatina 1 kg](https://feca.com.ar/productos/creatina-monohidrato-1kg): ...

## Calidad y transparencia
- [Ficha técnica](https://feca.com.ar/ficha-tecnica): especificaciones completas.
- [Verificar un lote](https://feca.com.ar/calidad): buscador por número de lote.

## Aprender sobre creatina
- [Qué es la creatina](https://feca.com.ar/creatina/que-es): ...
- [Cuánta creatina tomar](https://feca.com.ar/creatina/cuanta-tomar): ...
```

`llms-full.txt` se **genera** (build) concatenando los artículos y datos; no se
edita a mano.

---

## 8. Robots y crawlers de IA

`src/app/robots.ts` con política explícita. **Nunca bloquear `Googlebot`**: AI
Overviews y AI Mode se alimentan del índice normal de Google.

| Bot | Controla | Decisión FECA |
|---|---|---|
| `Googlebot` | Búsqueda + AI Overviews/AI Mode | **Allow** (crítico) |
| `Bingbot` | Bing + Copilot | Allow |
| `Applebot` | Siri/Spotlight | Allow |
| `OAI-SearchBot` | Citas de ChatGPT Search | Allow |
| `Claude-SearchBot` | Citas de Claude | Allow |
| `PerplexityBot` | Índice de Perplexity | Allow |
| `ChatGPT-User`, `Claude-User`, `Perplexity-User` | Fetch a pedido del usuario | Allow |
| `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended` | **Entrenamiento** | Decisión de política (default: allow; documentar si se bloquea) |

Plantilla de `robots.txt` (referencia):

```
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: OAI-SearchBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: https://feca.com.ar/sitemap.xml
```

(Además de `robots.ts`, ofrecer los datos como **JSON estático** — ver §9.4 —
ayuda más al "descubrimiento por agentes" que cualquier archivo de convención.)

---

## 9. Datos estructurados (JSON-LD)

Constructores en `src/lib/structured-data.ts`; se inyectan con
`<script type="application/ld+json">` en el HTML inicial (**no** solo por JS).

> 2026: `FAQPage` y `HowTo` **ya no generan rich results** (deprecados). Se
> mantienen por claridad semántica/extracción, sin esperar snippet. El mayor ROI
> está en `Product`/`Offer` (Merchant listings) y `Organization`.

| Plantilla | Schema | Notas |
|---|---|---|
| Global (todas las páginas) | `Organization` | `name`, `url`, `logo`, `sameAs`. Entity foundation. |
| Global | `BreadcrumbList` | Por página. |
| `/productos/[slug]` | `Product` + `Offer` (+ `Brand`) | `price`, `priceCurrency: ARS`, `availability`, `image` (≥ 500×500 recomendado), `sku`. Usar `Offer` (no `AggregateOffer`). `AggregateRating`/`Review` **solo si hay reseñas reales visibles**. |
| `/comprar` (índice) | `ItemList` de `Product`/`Offer` | Listado de la tienda. |
| `/ficha-tecnica` | `Product` (o `TechArticle`) | Specs como tabla; `additionalProperty` para pureza, mesh, humedad. |
| `/creatina/**` | `Article`/`BlogPosting` | `headline`, `datePublished`, `dateModified`, `author`/`reviewedBy`. |
| Páginas con FAQ | `FAQPage` | Markup válido; sin expectativa de rich result. |
| `/calidad/[lot]` | `Product` + `Offer` + `BreadcrumbList` | Referencia al lote; datos del CoA en HTML. |

`returnsPolicy` / `shippingDetails` dentro de `Organization` si se definen
políticas (útil para Merchant listings, y enlaza con las páginas legales de §5).

### 9.1 Datos para agentes (JSON estático, generado en build)

| Recurso | Contenido | Fuente |
|---|---|---|
| `/productos.json` (o `/api/productos.json`) | Lista de productos: slug, nombre, presentación, precio, moneda, servings, URL, imagen. | `src/lib/products.ts` |
| `/lotes.json` | Índice de lotes: número, producto, fecha, estado, páginas, URL del CoA. | `src/lib/certificates.generated.ts` |
| `/lotes/<LOT>.json` | Detalle del lote (tests, spec, resultado, método). | `data/lotes/<LOT>.json` |

Generarlos en `prebuild` (mismo lugar que los PDFs e índice) para que sean
estáticos y deterministas. Esto es lo que de verdad habilita "descubrimiento por
agentes" (no un MCP server, que hoy sería overkill para una marca de un SKU).

---

## 10. E-E-A-T / YMYL y cumplimiento (Argentina)

Salud = **YMYL**: Google y los modelos exigen más precisión y confianza.
Suplementos dietarios en Argentina **no son medicamentos** (marco ANMAT): el
contenido debe informar, no diagnosticar ni prometer curas.

- **Sin claims médicos**: nada de "cura", "trata", "previene". Usar lenguaje de
  rendimiento/beneficio respaldado y fórmulas prudentes ("ayuda a", "contribuye
  a", "según la evidencia").
- **Autoría y revisión**: artículos firmados y, si es posible, **revisados por
  un profesional** (nutricionista/médico deportivo), con `author`/`reviewedBy` en
  `Article` y una bio (E-E-A-T).
- **Fuentes primarias**: citar estudios y consensos (p. ej. posicionamiento del
  ISSN sobre creatina) con enlace; no copiar párrafos ajenos.
- **Transparencia de producto**: ingrediente, dosis por servicio, advertencias,
  origen, ficha técnica y CoA siempre accesibles.
- **Divulgación**: si se usa IA para redactar, el contenido debe seguir siendo
  útil y revisado; no falsear autoría.
- **Legales**: Términos, Privacidad y Contacto reales (datos de la empresa,
  medios de contacto), enlazados en el footer.

---

## 11. Backlog de contenido (intenciones es-AR)

Priorizadas por volumen + relación con la venta. Formato **respuesta primero**.

**Pilar y guías (hub `/creatina`)**
1. `/creatina/que-es` — Qué es la creatina (definición + cómo funciona).
2. `/creatina/cuanta-tomar` — Cuánta creatina tomar por día (tabla por peso).
3. `/creatina/como-tomar` — Cómo tomar creatina (horario, con qué, ayunas).
4. `/creatina/beneficios` — Beneficios respaldados por la evidencia.
5. `/creatina/efectos-secundarios` — Efectos secundarios y seguridad.
6. `/creatina/fase-de-carga` — ¿Conviene la fase de carga? (mitos y datos).
7. `/creatina/monohidrato` — Por qué monohidrato (vs otras formas).
8. `/creatina/micronizada` — Creatina micronizada: qué es.
9. `/creatina/que-creatina-elegir` — Cómo elegir creatina (checklist de pureza/CoA).
10. `/creatina/creatina-vs-proteina` — Creatina vs proteína (intención comparativa).
11. `/creatina/tomar-todos-los-dias` — ¿Hay que tomarla todos los días?
12. `/creatina/vencida` — ¿La creatina vence? (uso y caducidad).

**Transaccionales / marca**
13. `/productos/creatina-monohidrato-300g|500g|1kg` (pSEO, §6.1).
14. `/precio-creatina-argentina` — Guía de precio (ancla: precio por gramo de FECA).
15. `/nosotros` — Marca, historia, compromiso con la transparencia.

**Verificación (activo único)**
16. `/calidad/<LOT>` (pSEO, §6.2) + reforzar `/ficha-tecnica` y `/calidad`.

> Cada artículo: respuesta directa, tabla o lista, FAQ breve, "actualizado el",
> autor/revisor y 2–3 enlaces internos (a producto y a otro artículo).

---

## 12. Roadmap por fases

| Fase | Alcance | Entregable |
|---|---|---|
| **0 — Base técnica** | `robots.ts`, `sitemap.ts`, canónicos, `src/config/seo.ts`, `structured-data.ts`, legales (`/terminos`, `/privacidad`, `/contacto`, `/nosotros`), `Organization` + `sameAs`. | SEO técnico sano y entidad declarada. |
| **1 — Producto** | Páginas `/productos/[slug]` + `Product`/`Offer` + `ItemList` en `/comprar` + enlaces internos. | 3 URLs indexables con Merchant listings. |
| **2 — Contenido** | Hub `/creatina` + primeros 8–12 artículos answer-first, `Article` + `FAQPage`. | Cobertura del núcleo de intenciones. |
| **3 — Lotes (pSEO)** | `/calidad/[lot]` + `lotes.json`, enlaces desde el buscador. | CoA índiceable por lote. |
| **3b — Datos para agentes** | `/productos.json`, `/lotes/<LOT>.json` en `prebuild`. | Datos legibles por agentes. |
| **4 — AEO/GEO** | `llms.txt` + `llms-full.txt` generado, tablas/FAQ, fechas de actualización, tabla de "datos citables". | Contenido citable. |
| **5 — Medición** | Panel de prompts (§13), GSC, GA4 referrers de IA, validadores. | Línea base y seguimiento. |
| **6 — Earned media** | PR/prensa AR, roundups, Reddit, reviews. | Menciones de terceros. |

Build obligatorio tras cada fase: `npm run lint && npm run build && npm run test:e2e`.

---

## 13. Medición (KPIs)

| KPI | Cómo | Frecuencia |
|---|---|---|
| **Prompt panel (citation rate)** | Set congelado de ~30–60 prompts es-AR ("cuánta creatina tomar", "mejores creatinas argentina", "FECA creatina", "creatina pura cómo verificar") corridos 30–60× por plataforma (ChatGPT, Perplexity, Gemini, Claude, Copilot) con y sin web. | Mensual |
| **Share of voice vs competidores** | Mismas corridas; medir menciones FECA vs otras marcas AR. | Mensual |
| **Clics desde referrers de IA** | GA4: `chatgpt.com`, `chat.openai.com`, `perplexity.ai`, `claude.ai`, `copilot.microsoft.com`, `gemini.google.com`. Objetivo: sesiones + conversiones a WhatsApp. | Semanal |
| **Search Console** | Cobertura, impresiones/clics, queries nuevas, Core Web Vitals. | Semanal |
| **Indexación** | URLs válidas en sitemap vs indexadas. | Mensual |
| **Menciones ganadas** | Prensa, roundups, Reddit, reviews (ahrefs/manual). | Mensual |
| **Precisión de marca** | ¿Los modelos describen FECA correctamente (creatina monohidrato, ≥ 99,5%, Argentina)? | Mensual |

> Las citas de LLM son volátiles: nunca mirar una captura suelta. Correr paneles
> repetidos y comparar contra competidores.

---

## 14. Integración con lo existente

| Recurso | Uso | Acción |
|---|---|---|
| `src/lib/products.ts` | pSEO producto + JSON + schema | Única fuente; `generateStaticParams`. |
| `src/lib/certificates.generated.ts` + `data/lotes/**` | pSEO lotes + `/lotes*.json` | Generar páginas/JSON en build. |
| `src/lib/technical_sheet.ts` / `/ficha-tecnica` | AEO (specs) + `Product`/`Article` | Mantener y exponer en HTML/JSON. |
| `scripts/generate-documentos.mjs` | Generación en `prebuild` | Sumar la generación de `sitemap`/`*.json` si conviene hacerla estática. |
| `src/lib/site.ts` | Canónicos/OG/schema | Consumir siempre desde acá. |
| `docs/brand-pdf-system.md` | Reglas de datos verbatim | Aplican también al contenido SEO. |
| `manifest.ts` | PWA | Mantener; revisar `shortcuts` si se agregan rutas. |

---

## 15. Reglas de cumplimiento

- **Fuente única**: productos/lotes/specs solo desde sus módulos. Lista
  hardcodeada = bug.
- **es-AR**: voseo en el chrome; datos técnicos **verbatim** (inglés tal cual).
- **Sin claims médicos** (§10). YMYL.
- **Google no se bloquea.** Crawlers de búsqueda e IA de citas: allow.
- **Sin staging público** en contenido, `llms.txt`, JSON ni JSON-LD.
- **No inventar** datos, reviews ni comparativas.
- **Consultar `node_modules/next/dist/docs/`** antes de codear (Next 16).
- **pSEO por plantilla**: nada de duplicados manuales.

---

## 16. Riesgos y decisiones abiertas

1. **Reseñas**: `AggregateRating`/`Review` **solo** si hay reseñas reales y
   visibles. ¿Se habilitan reviews con moderación?
2. **Checkout WhatsApp**: afecta `Offer.availability` y la experiencia post-clic.
   ¿Se planea pasarela online? (cambiaría la estrategia transaccional).
3. **Dominio**: confirmar `SITE_URL` final (`feca.com.ar`) y si habrá
   subdominios.
4. **Autoría experta**: ¿se consigue revisión profesional? Es el mayor
   multiplicador de E-E-A-T en YMYL.
5. **Comparativas con marcas**: hacerlo como "cómo elegir" evita riesgos legales
   y compara criterios, no difama competidores.
6. **Idioma**: ¿solo es-AR o futuro PT-BR? (si se internacionaliza, se convierte
   en un eje tipo "país" como en el plan de vexor).
7. **Presupuesto de contenido**: el hub requiere cadencia (p. ej. 2–4
   artículos/mes) y revisión trimestral de frescura.

---

## 17. Referencias (2026)

- Google — *AI features and your website*: https://developers.google.com/search/docs/appearance/ai-features
- Google — *Creating helpful, reliable, people-first content*: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google — *Guía de optimización para IA (es-419)*: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide?hl=es-419
- Google — *Merchant listings* / *Product snippets* / *Product variants* (structured data).
- Cloudflare — *AI Crawl Control: bot directory* (tokens por proveedor).
- Ahrefs — *llms.txt study (2026)*: https://ahrefs.com/blog/llmstxt-study/
- HubSpot — *Optimize for AI Overviews (AEO playbook)*.
