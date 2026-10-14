# Posicionamiento: SEO, pSEO, AEO/GEO y agentes

Guía **operativa** del posicionamiento de FECA. Explica qué rutas existen, qué
datos estructurados se emiten, qué activos se generan para buscadores y
agentes, y cómo extender el sistema. El diseño y las decisiones están en
[`plan-seo-pseo-agentes.md`](./plan-seo-pseo-agentes.md) (historial).

## Resumen

El sitio separa tres ideas que suelen mezclarse:

| Concepto | Qué es | Dónde vive |
| --- | --- | --- |
| **SEO** | Indexación y datos estructurados de páginas puntuales. | `src/app/*` |
| **pSEO** | Muchas páginas útiles generadas desde datos (producto, lote, artículo). | rutas dinámicas + `generateStaticParams` |
| **AEO/GEO** | Que motores generativos citen el sitio con datos correctos. | JSON-LD + `robots.ts` + `llms.txt` |

La ventaja competitiva de FECA sigue siendo la misma: **datos de primera mano
verificables** (pureza por HPLC, CoA por lote, ficha técnica).

## Rutas

| Ruta | Tipo | Fuente |
| --- | --- | --- |
| `/` | estática | `src/app/page.tsx` (+ FAQ) |
| `/comprar` | estática | `src/lib/products.ts` |
| `/productos/<slug>` | pSEO (SSG) | `src/lib/products.ts` |
| `/calidad` | estática (busca por `?lote=`) | `src/lib/certificates.ts` |
| `/calidad/<lote>` | pSEO (SSG) | `src/lib/certificates.ts` |
| `/ficha-tecnica` | estática | `src/lib/technical_sheet.ts` |
| `/creatina` | hub | `src/content/creatina` |
| `/creatina/<slug>` | pSEO (SSG) | `src/content/creatina` |
| `/nosotros`, `/contacto`, `/terminos`, `/privacidad` | estáticas | `src/app/*` |
| `/robots.txt`, `/sitemap.xml` | generadas | `src/app/robots.ts`, `src/app/sitemap.ts` |

Las rutas dinámicas usan `generateStaticParams` (y `dynamicParams = false` en
creatina) para prerenderizar desde los datos. Cada una valida el parámetro
contra un allowlist y devuelve `notFound()` si no existe.

## Fuente única de verdad

Todo el posicionamiento lee de los mismos datos que el resto del sitio:

- `src/lib/site.ts` — `SITE_URL` (env `SITE_URL`, fallback `https://feca.com.ar`), `SITE_NAME`.
- `src/lib/products.ts` — productos (precio, tamaño, servicios, imagen).
- `src/lib/certificates.ts` + `certificates.generated.ts` — lotes y análisis.
- `src/lib/technical_sheet.ts` — especificaciones de la ficha técnica.
- `src/content/creatina/*` — hub de contenido (`types.ts`, `articles.ts`, `index.ts`).
- `src/content/faqs.ts` — FAQ de la home (compartida entre UI y JSON-LD).

## Datos estructurados (JSON-LD)

Se renderizan con `src/components/json-ld.tsx` (escapa `<`, `>` y `&`).
Los constructores están en `src/lib/structured-data.ts`:

| Schema | Dónde |
| --- | --- |
| `Organization` + `WebSite` | layout raíz (todas las páginas) |
| `FAQPage` | home y cada artículo |
| `Product` + `Offer` (+ `Brand`, `additionalProperty`) | `/productos/<slug>` y `/calidad/<lote>` |
| `BreadcrumbList` | producto, lote, hub y artículos |
| `Article` | cada artículo del hub |
| `CollectionPage` | hub `/creatina` |

Regla: el JSON-LD **debe coincidir con lo visible** en la página. No se
inventan reseñas, ratings ni perfiles sociales (`sameAs` queda vacío hasta que
exista un perfil real).

## Robots y crawlers de IA

`src/app/robots.ts` permite todo (`*` → `Allow: /`) y enumera explícitamente a
Googlebot y a los crawlers de IA (GPTBot, OAI-SearchBot, ChatGPT-User,
ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User,
Google-Extended, Applebot, Applebot-Extended, CCBot). **Nunca bloquear
Googlebot**: AI Overviews/AI Mode se alimentan del índice normal.

## Activos para agentes (generados en build)

`scripts/generate-seo-assets.mjs` corre en `prebuild`/`predev` **después** de
`generate-documentos.mjs`. Escribe (todos **gitignored**):

| Archivo | Contenido |
| --- | --- |
| `public/productos.json` | catálogo (slug, precio ARS, precio/kg, servicios, URL, imagen). |
| `public/lotes.json` | índice de certificados. |
| `public/lotes/<LOT>.json` | detalle de un lote (tests, fechas, PDFs). |
| `public/llms.txt` | resumen en formato [llms.txt](https://llmstxt.org/). |
| `public/llms-full.txt` | versión extendida (incluye resultados y guías). |

El script importa los `.ts` con el *type-stripping* nativo de Node (`node ≥ 22`;
los `import type` se eliminan, por eso alcanza con resolver a `.ts`).

## Contenido: agregar un artículo del hub

1. Creá el objeto `Article` en `src/content/creatina/articles.ts` (tipo en
   `src/content/creatina/types.ts`): `slug`, `title`, `description`, `intro`
   (respuesta directa de 40–60 palabras), `updated` (ISO), `blocks`, `faqs`,
   `related`, `readingMinutes`, `intent`.
2. Enlazá 2–3 `related` a slugs existentes.
3. Verificá: `npm run dev` → `/creatina/<slug>`. El `sitemap` y `llms.txt` se
   actualizan solos en el próximo `prebuild`.

Reglas de contenido (YMYL): sin *claims* médicos ("cura", "trata", "previene");
usar fórmulas prudentes ("ayuda a", "según la evidencia"); derivar a un
profesional ante condiciones médicas.

## Calidad: agregar un lote

Los lotes viven en `data/lotes/<LOT>/<LOT>.json` (ver
[`certificados-por-lote.md`](./certificados-por-lote.md)). Al agregar uno, el
`prebuild` regenera el PDF, el índice y, con él, la página `/calidad/<LOT>`, el
`sitemap` y los JSON de agentes. **No hay que tocar código.**

## Verificación

```bash
npm run lint
npm run build          # corre prebuild (documentos + activos SEO)
npm run test:e2e       # incluye e2e/seo.spec.ts
```

Chequeos rápidos (con el server levantado):

```bash
curl -s localhost:3120/robots.txt
curl -s localhost:3120/sitemap.xml
curl -s localhost:3120/llms.txt
curl -s localhost:3120/productos.json
```

El e2e `e2e/seo.spec.ts` cubre: `robots.txt`, `sitemap.xml`, existencia y
validez de los activos de agentes, y JSON-LD de home, producto, artículo y lote.

## Limitaciones y próximos pasos

- `llms.txt` **no** es consumido oficialmente por ningún proveedor hoy (~28 % de
  los dominios publican uno). Es barato y de bajo riesgo, pero no una palanca
  garantizada: la indexación real sigue dependiendo del SEO clásico.
- Rich results de `FAQPage`/`HowTo` están deprecados (2023); se emiten igual
  porque ayudan al parseo por LLM, no por rich result.
- El backlog editorial (§11 del plan) tiene 16 intenciones; hoy hay 12
  artículos. Falta autoría experta (E-E-A-T) y comparativas por criterios.
