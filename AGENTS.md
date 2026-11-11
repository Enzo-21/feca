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

## Precios y tests (regla inmutable)

Los precios son **fuente única de verdad** en [`src/lib/products.ts`](src/lib/products.ts). Los tests e2e **NO deben hardcodear precios**.

- Usar [`e2e/support/products.ts`](e2e/support/products.ts) para obtener precios formateados o numéricos en specs. Deriva de `products.ts` y del formateador `src/lib/format.ts` (`formatARS`).
- Al cambiar cualquier precio (o agregar/quitar un producto), **basta con editar `src/lib/products.ts`**. Los tests que usen el helper se actualizan automáticamente.
- Cualquier test nuevo que muestre precios debe usar este helper (o calcularlos desde `products.ts`). No escribir valores literales como `$28.000`, `$43.500`, `$82.000`, `43500`, etc.
- Si hay tests legacy con precios hardcodeados, actualizarlos para que deriven de la fuente única.

## Trabajos pesados: uno por vez y en la nube cuando la Mac está cargada (IMPORTANTE)

La Mac (M2, 8 GB de RAM) la comparten el dueño y muchos agentes; renders y builds en paralelo ya la dejaron sin
memoria. Mismo esquema que vexor y mercadosuite (plan `docs/plans/033-trabajos-pesados-en-la-nube.md` de vexor);
scripts en `scripts/cloud/`.

- **Un solo trabajo pesado por vez en TODA la Mac** (todas las sesiones y usuarios). Pesados en este repo:
  `npm run build`, `npx tsc --noEmit`, `npm run test:e2e` (hace su propio build), `npm run dev` / `npm start`,
  `remotion render|still|bundle|studio` y los pasos de `marketing/video/make.sh` que los usan (`render`, `preview`,
  `all`), y lanzar subagentes en paralelo. Siguen siendo locales: `npm run lint`, `npm run documentos`, `npm run seo`,
  `./make.sh audio` y git.
- **Antes de cada trabajo pesado: `scripts/cloud/heavy-check.sh`.** Exit 0 → se corre local. Exit 10 (carga ≥ 6 u otro
  trabajo pesado corriendo) → a la nube, sin esperar a que baje la carga, y se sigue trabajando mientras corre.
- **Acá el build sí puede ir a la nube:** el proyecto no usa variables de entorno (Vercel no tiene ninguna), así que
  `npm ci && npm run build` en la VM es el mismo build que hace Vercel. Los e2e también corren en la nube (la VM ya
  trae los navegadores de Playwright en `/opt/pw-browsers`): `npm ci && npx playwright install chromium && npm run
  test:e2e` (54 specs en ~22 s, 2026-11-11).
- **Flujo en la nube:**
  1. Lo que no está trackeado no llega a la nube: commitearlo o `git add`earlo.
  2. `scripts/cloud/start.sh <slug> "<comandos>" "<archivos a traer>"`. `claude --cloud` exige una terminal: desde un
     agente, con una pseudo-terminal y en segundo plano:
     `(sleep 7200 | script -q <log> scripts/cloud/start.sh <slug> "<comandos>" "<archivos>" >/dev/null 2>&1 &)`;
     la URL de la sesión (`https://claude.ai/code/session_…`) queda en `<log>`.
  3. `scripts/cloud/apply-result.sh cloud/<slug> --wait` en segundo plano: aplica los cambios de código sin commitear,
     escribe los archivos generados en su ruta y borra la rama.
  4. Revisar lo aplicado como un cambio propio y commitear/pushear.
- **Claude GitHub App instalada sólo en `Enzo-21/feca`** (dueño, 2026-11-11). El primer build en la nube
  (`npm ci && npm run build`) pasó en Node 22: la red de la VM no deja bajar Node 24. El remote usa un alias SSH
  (`git@github.com-Enzo-21:…`) y `claude --cloud` no lo reconocía como GitHub, así que subía un bundle aunque todo
  estuviera pusheado: `start.sh` le muestra la URL https sólo a ese proceso.
- **Pushear `main` es desplegar a producción.** Por eso lo que todavía no está en `main` va a la nube como bundle
  (`start.sh` lo hace solo si hay cambios sin pushear): sin `origin`, la sesión tiene que adjuntar el repo
  `Enzo-21/feca` y el dueño aprobarlo en la pantalla de la sesión (un agente no puede aprobarlo). Para verificar un
  cambio antes de producción sin la nube: pushearlo a una rama aparte y esperar el deploy de preview de Vercel.
- **`cloud/<slug>` es la única rama que pushea la nube**: nunca `main` ni otras ramas, no abre PRs ni mergea, y el
  checkout local nunca se cambia a esa rama. Vercel no construye `cloud/**` ni `claude/**` (`vercel.json`).
- **Nada de secretos en la nube**: ni `.env`, ni Vercel, WhatsApp, ElevenLabs, mails u otros servicios.
- **Un trabajo en la nube por vez en este repo** (cuenta contra los límites de uso del plan).
- Renders del video: «Render en la nube» en `marketing/video/README.md`.
