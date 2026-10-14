<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Documentación del proyecto

Antes de tocar el posicionamiento (rutas, metadatos, JSON-LD, `robots`/`sitemap`,
`llms.txt` o el hub de contenido), leé `docs/seo-pseo-agentes.md`.

Antes de tocar la generación de PDFs o la sección de calidad, leé `docs/`:

- `docs/brand-pdf-system.md` — identidad visual de los PDFs de marca (colores,
  tipografías, logo, reglas de layout/una página). Fuente de verdad.
- `docs/certificados-por-lote.md` — operación del pipeline de certificados por
  lote: estructura de `data/lotes/`, formato del JSON del proveedor, flag
  `demo`, runbook y comandos de verificación.
- `docs/ficha-tecnica-pdf.md` — cómo se genera la Ficha Técnica (PDF).
- `docs/plan-certificados-por-lote.md` — historial del plan: una carpeta por
  lote (`data/lotes/<LOT>/<LOT>.json` + `<LOT>.pdf`) y generación del
  PDF de marca en el `prebuild` (motor JS puro, **no** Playwright, porque Vercel
  no trae Chromium). Estado: implementado.
