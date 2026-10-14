# Plan — Certificados por lote con PDF de marca autogenerado

**Estado: implementado** (2026-10-14).
**Última actualización:** 2026-10-14.
**Relacionados:** [`certificados-por-lote.md`](./certificados-por-lote.md),
[`brand-pdf-system.md`](./brand-pdf-system.md),
[`ficha-tecnica-pdf.md`](./ficha-tecnica-pdf.md).

> **Doc de operación:** [`certificados-por-lote.md`](./certificados-por-lote.md)
> describe el sistema tal como quedó implementado (estructura de carpetas,
> campos del JSON, runbook paso a paso, comandos y limitaciones). Este archivo
> se conserva como **historial del plan**: fases, contrato de datos, riesgos y
> la investigación de build/Vercel.
>
> **Nota de implementación:** el plan proponía `coa.json` +
> `materia-prima.pdf`; la implementación usa **`data/lotes/<LOT>/<LOT>.json`** y
> **`<LOT>.pdf`** (el JSON crudo del proveedor *es* el `coa.json`; no hay un
> archivo aparte). El índice `src/lib/certificates.generated.ts` **sí** se
> commitea, regenerado de forma determinista.

## 1. Objetivo

Pasar del sistema actual (certificados *dummy* hardcodeados) a un flujo en el
que, **para cada lote real**, se cree una carpeta con:

1. el **PDF de materia prima** del proveedor (verbatim), y
2. un **JSON** con todas las especificaciones del lote,

y que **automáticamente** (en el build):

- se genere el **PDF de marca FECA** (Certificate of Analysis) a partir del JSON,
- la web muestre la información del JSON tal como hoy,
- y todo quede publicado al hacer push a producción.

El usuario solo debería: **crear la carpeta, subir los dos archivos y hacer
push**. Nada más.

## 2. Estado actual (punto de partida)

- `src/lib/certificates.ts` — array hardcodeado (tipo `Certificate`):
  `{ lot, filename, title, date, product, tests: {name,result,spec}[] }`.
- `public/certificados/FECA-2026-0XX.pdf` — 12 PDFs **dummy** estáticos,
  commiteados (generados con MuPDF).
- `src/components/certificate-search.tsx` — componente *client* que filtra por
  lote/producto y enlaza al PDF (`/certificados/<filename>`).
- `src/app/calidad/page.tsx` — página con buscador + aviso de "versión de
  demostración".
- No existe carpeta `data/`, ni schema, ni script de certificados.

## 3. Decisión clave — motor de generación de PDF en el build

Requisito: los PDFs de marca deben generarse **en el build de producción
(Vercel)**, no en la máquina del usuario.

Hallazgo de investigación (ver §Fuentes):

- Vercel, para Next.js, **ejecuta el script `build` de `package.json`** (`npm run
  build`); recién si no existe cae en `next build`. Por lo tanto **un script
  `prebuild` de npm sí se ejecuta** en Vercel (npm corre `pre<cmd>` →
  `<cmd>` → `post<cmd>`).
- **Riesgo crítico:** la imagen de build de Vercel **no trae Chromium**. Un
  generador basado en **Playwright falla** en Vercel salvo que se instale el
  navegador (`npx playwright install` / `@sparticuz/chromium`), lo cual es
  frágil y lento.

### Recomendación: motor **JavaScript puro** (sin navegador)

| Opción | Vercel build | Velocidad | Mantenibilidad | Veredicto |
| --- | --- | --- | --- | --- |
| **Playwright (HTML→PDF)** *hoy* | ❌ requiere instalar Chromium | lenta | alta (CSS/HTML) | Solo **local**; commitear el PDF |
| **`@react-pdf/renderer`** | ✅ JS puro | rápida | alta (componentes/JSX, flex) | **Recomendada** |
| **`pdf-lib`** | ✅ JS puro | rápida | media (dibujo manual) | Alternativa de bajo nivel |
| **`pdfkit`** | ✅ JS puro | rápida | media (streaming, manual) | Alternativa |

**Decisión propuesta:** adoptar **`@react-pdf/renderer`** como motor único de
los PDFs de marca (CoA por lote **y** Ficha Técnica), con las fuentes
auto-hospedadas y el logo vectorial reutilizado. Ventajas: corre en Node sin
navegador, layout tipo flexbox, SVG (`<Svg>`, `<Path>`, `<Polygon>`) para el
logo, y `Font.register` para las tipografías de marca.

- El script usa TSX → se ejecuta con `tsx` (devDependency) o se escribe el
  template con `React.createElement` y se corre con `node` puro.
- Alternativa de mínima dependencia si se prefiere evitar React: `pdf-lib`
  (dibujo imperativo) — más trabajo de layout, cero transpilación.
- **La Ficha Técnica actual (Playwright) se mantiene como artefacto local** y se
  porta a este motor en la Fase 8, para unificar.

## 4. Arquitectura propuesta

### 4.1 Fuente de verdad (commiteada)

```
data/
  lotes/
    FECA-2026-013/
      coa.json               # datos estructurados del lote (fuente de verdad)
      materia-prima.pdf      # PDF del proveedor, verbatim (NO editar)
      materia-prima.json     # (opcional) JSON crudo del proveedor, si existe
    FECA-2026-014/
      ...
```

- El nombre de la carpeta **debe** ser igual al campo `lot` de `coa.json`.
- Se valida en el build; si no coincide o falta algo, **el build falla**.

### 4.2 Artefactos generados (salida)

```
public/certificados/
  FECA-2026-013.pdf                  # CoA de marca (generado)
  FECA-2026-013-materia-prima.pdf    # copia del PDF del proveedor (si se publica)
src/lib/certificates.generated.ts    # índice generado (NO editar a mano)
```

- Los PDFs generados se agregan a `.gitignore` (no se commitean).
- El **índice** sí conviene commitearlo (archivo de texto chico, derivado, mantiene
  `lint`/`tsc` funcionando sin correr el generador). El `prebuild`/`predev` lo
  regeneran de forma determinista (orden estable) → sin diffs espurios.

### 4.3 Índice generado

`src/lib/certificates.generated.ts` exporta `certificates: Certificate[]` con la
misma forma que hoy (para no tocar el componente), más campos nuevos opcionales
(`rawMaterialFilename`, `status`, `demo`). `certificate-search.tsx` sigue igual.

## 5. Contrato de datos — `coa.json`

```jsonc
{
  "schemaVersion": 1,
  "lot": "FECA-2026-013",                         // == nombre de carpeta
  "product": "FECA Creatina Monohidrato 300 g",
  "productSlug": "creatina-monohidrato-300g",     // opcional (link a /comprar#...)
  "analysisDate": "2026-05-12",                   // ISO AAAA-MM-DD
  "manufacturingDate": "2026-04-30",              // opcional
  "expiryDate": "2029-04-30",                     // opcional
  "method": "HPLC / Espectrometría",              // opcional
  "status": "approved",                           // approved | rejected | pending
  "countryOfOrigin": "China",                     // opcional
  "storage": "Almacenar en lugar fresco, seco y ventilado, lejos de la humedad.",
  "headline": { "label": "Pureza (HPLC)", "value": "≥ 99,9%" },   // opcional
  "tests": [
    { "name": "Creatina (HPLC)", "spec": "≥ 99,5%", "result": "≥ 99,9%", "method": "HPLC" },
    { "name": "Dioxina / HAP", "spec": "No detectado", "result": "No detectado" },
    { "name": "Metales pesados", "spec": "Ausencia", "result": "Conforme" }
  ],
  "files": { "rawMaterialPdf": "materia-prima.pdf" },  // null para no publicarlo
  "demo": false,                                  // true para los lotes de ejemplo
  "notes": "Opcional. Texto libre."
}
```

**Requeridos:** `schemaVersion`, `lot`, `product`, `analysisDate`, `status`,
`tests` (≥ 1). **El resto es opcional.**

**Enumeraciones y formatos:**

- `status`: `approved` | `rejected` | `pending` → se muestran como
  `APROBADO` / `RECHAZADO` / `PENDIENTE`.
- Fechas: ISO `AAAA-MM-DD`; se muestran `DD/MM/AAAA`.
- Números: se muestran con coma decimal. Unidades con espacio (`0,03 %`).

**Validación:** se recomienda `zod` (o un validador equivalente) para tipar y
fallar con mensajes claros. El validador es el mismo módulo que usa el generador
y (opcionalmente) los tests.

## 6. Fases y etapas

### Fase 0 — Documentación base ✅
- **Entregable:** `docs/brand-pdf-system.md`, `docs/ficha-tecnica-pdf.md`, este plan.
- **Aceptación:** el sistema visual y la generación actual quedan documentados.

### Fase 1 — Contrato de datos y carpetas
- Crear `data/lotes/` con un lote de ejemplo real (`coa.json` + `materia-prima.pdf`).
- Implementar el validador de `coa.json` (schema + `schemaVersion`).
- **Entregable:** schema documentado + validador + ejemplo.
- **Aceptación:** un JSON inválido falla con mensaje accionable.

### Fase 2 — Toolkit de PDFs de marca
- Elegir e instalar el motor (§3). Auto-hospedar fuentes en `assets/fonts/`
  (Montserrat + Zen Dots) y `Font.register`.
- Extraer tokens y logo vectorial a un módulo compartido
  (ej. `scripts/lib/brand/`): colores, isotipo (polígonos), wordmark (paths),
  primitivas (franja encabezado/pie, regla, tabla, sello).
- **Entregable:** toolkit reutilizable + doc.
- **Aceptación:** una página de prueba reproduce la identidad de `brand-pdf-system.md`
  **sin red** (fuentes locales).

### Fase 3 — Generador del CoA por lote
- Template `certificado-coa` (una página) a partir de `coa.json`: encabezado,
  título, ficha (lote, fecha, producto, método, estado), tabla de resultados
  (`PARÁMETRO / ESPECIFICACIÓN / RESULTADO`) y pie con disclaimer + sello.
- Función `renderCoa(coa) -> Buffer/archivo`.
- **Entregable:** `public/certificados/<LOT>.pdf` para el lote de ejemplo.
- **Aceptación:** 1 página, información completa, verificación de texto OK
  (misma técnica que `ficha-tecnica-pdf.md` §6).

### Fase 4 — Orquestador `prebuild` y wiring de build
- `scripts/prebuild.mjs`:
  1. escanear `data/lotes/*`,
  2. validar cada `coa.json` (fallar → `exit 1`),
  3. generar los PDFs de marca,
  4. copiar el PDF de materia prima a `public/certificados/` (si se publica),
  5. escribir `src/lib/certificates.generated.ts` (orden estable).
- `package.json`:
  ```jsonc
  "scripts": {
    "prebuild": "node scripts/prebuild.mjs",
    "predev":   "node scripts/prebuild.mjs",
    "build":    "next build",
    "certs:check": "node scripts/prebuild.mjs --check",
    "certs:generate": "node scripts/prebuild.mjs"
  }
  ```
- Flags: `--check` (solo valida), `--only=<lote>`, y **caché por mtime** para
  no regenerar lo que no cambió (dev rápido).
- `.gitignore`: agregar `public/certificados/*.pdf` (generados).
- **Vercel:** dejar el **Build Command por defecto** (`npm run build` → dispara
  `prebuild`). Si en algún momento se sobreescribe con `next build`, agregar
  `"vercel-build": "npm run prebuild && next build"` como red de seguridad.
- **Aceptación:** `npm run build` local y en Vercel generan los PDFs e incluyen
  todo en el deploy; un JSON roto rompe el build con mensaje claro.

### Fase 5 — Integración web
- `src/lib/certificates.ts` pasa a re-exportar el índice generado (o se elimina
  y sus referencias apuntan al generado).
- `certificate-search.tsx`: sin cambios de UX; opcionalmente mostrar `status`,
  `method`, y un link extra **"Descargar certificado de materia prima"** cuando
  exista.
- Mantener la página `/calidad`; ajustar el aviso de "demostración" para que se
  muestre solo si hay lotes con `demo: true`.
- **Aceptación:** la web lista todos los lotes reales desde `data/lotes/`, sin
  hardcodear.

### Fase 6 — Migración de los 12 lotes dummy
- Script one-off `scripts/migrate-legacy-certificates.mjs`: lee el array actual
  de `src/lib/certificates.ts` y crea `data/lotes/<lot>/coa.json` (con
  `demo: true`, `files.rawMaterialPdf: null`).
- Regenerar los PDFs de marca y compararlos con los dummy actuales.
- Eliminar los PDFs dummy commiteados y el array hardcodeado.
- **Aceptación:** `/calidad` muestra los 12 lotes de ejemplo con PDF de marca
  nuevo; tests verdes.

### Fase 7 — Testing y validaciones
- **Validación de datos:** `npm run certs:check` recorre todos los lotes.
- **e2e:** por cada lote, la tarjeta aparece; el CoA responde 200; el PDF de
  materia prima responde 200 si se publica. Cantidad de tarjetas == cantidad de
  carpetas.
- **Idempotencia:** generar dos veces → mismo hash de salida.
- **CI:** el build debe pasar con el `prebuild`.
- **Aceptación:** suite verde y sin dependencia de red.

### Fase 8 — Portar la Ficha Técnica al toolkit + runbook
- Migrar `ficha-tecnica` al motor elegido (una sola pieza para ambos documentos).
- Escribir el **runbook** (§9) y actualizar `AGENTS.md`/`docs`.
- **Aceptación:** ficha y CoA salen del mismo toolkit con la misma identidad.

## 7. Testing / verificación (resumen)

- `npm run lint`, `npm run build`, `npm run test:e2e` (Playwright) verdes.
- `npm run certs:check` valida todos los `coa.json`.
- Verificación del PDF por extracción de texto (PyMuPDF) — ver
  `ficha-tecnica-pdf.md` §6.
- Chequeo de idempotencia (hash estable).

## 8. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
| --- | --- | --- |
| Playwright no corre en Vercel | Build roto | Usar motor JS puro (§3). |
| Fuentes por red en build | No determinista | Auto-hospedar fuentes (Fase 2). |
| JSON inválido en producción | Data rota publicada | Validar y **fallar el build** (Fase 1/4). |
| PDF de materia prima con datos sensibles del proveedor | Privacidad | Publicarlo es opt-in (`files.rawMaterialPdf: null` por defecto si hay dudas). |
| Crecimiento del repo (PDFs por lote) | Repo pesado | No commitear generados; evaluar Git LFS si el volumen crece. |
| Drift del schema | Rompe tooling | `schemaVersion` + validación estricta. |
| Costo/tiempo de build con muchos lotes | Deploy lento | Caché por mtime + reutilizar el renderer. |
| Regresión visual del PDF de marca | Documento off-brand | Checklist de `brand-pdf-system.md` + snapshot textual en e2e. |

## 9. Runbook — agregar un lote nuevo

> **Desactualizado (histórico).** Los nombres de archivo (`coa.json`,
> `materia-prima.pdf`) y los comandos (`certs:check`, `certs:generate`) son los
> del plan. El runbook **vigente** está en
> [`certificados-por-lote.md`](./certificados-por-lote.md) §4 (usa
> `data/lotes/<LOT>/<LOT>.json` + `<LOT>.pdf` y `npm run documentos` /
> `npm run documentos:check`).

1. Crear la carpeta `data/lotes/<LOT>/` (ej. `FECA-2026-013`).
2. Copiar el **PDF de materia prima** como `materia-prima.pdf`.
3. Crear `coa.json` (copiar de una plantilla; el `lot` debe coincidir con la carpeta).
4. Validar: `npm run certs:check`.
5. Generar y revisar local: `npm run certs:generate` → abrir
   `public/certificados/<LOT>.pdf` y controlarlo con el checklist de marca.
6. Commit y push. Vercel ejecuta `prebuild` y publica todo.
7. Verificar en producción: `/calidad` lista el lote; el PDF de marca responde 200.

## 10. Preguntas abiertas (resueltas)

> Resueltas al implementar (2026-10-14). Se dejan las preguntas originales y la
> decisión tomada al lado, para conservar el historial.

1. **Motor de PDF:** ¿`@react-pdf/renderer` (recomendado) o `pdf-lib`?
   → **Decidido: `@react-pdf/renderer`** como motor único (CoA + Ficha
   Técnica); `pdf-lib` se usa solo para el merge de páginas.
2. **PDF de materia prima:** ¿se publica para descargar, o se usa solo como
   fuente interna/verificación? → **Decidido: se publica como página 2 del PDF
   mergeado.** Página 1 = CoA de marca; página 2 = PDF del proveedor. No se
   expone un archivo separado.
3. **PDFs de marca generados:** ¿no commitear (recomendado, se generan en build)
   o commitear como hoy? → **Decidido: se generan en build y están
   gitignored** (`public/certificados/*.pdf`, `public/ficha-tecnica/*.pdf`). El
   índice `.ts` sí se commitea.
4. **Multi-producto:** ¿solo creatina por ahora, o preparar el schema para más
   productos (el `productSlug` ya lo contempla)? → **Decidido: solo creatina
   por ahora**; `productSlug` queda como campo opcional sin catálogo.

## 11. Fuentes (investigación de build/Vercel)

- Vercel — *Configure a Build*: "Vercel checks for the `build` command in
  `scripts` and uses this to build the project. If not, `next build` will be
  triggered as the default Build Command." — <https://vercel.com/docs/builds/configure-a-build>
- Vercel — *Dynamic Build Commands*: "So `npm run build` ends up being the
  effective command…" — <https://vercel.com/kb/guide/dynamic-build-commands>
- npm — *Scripts / Life Cycle*: `pre<cmd>` → `<cmd>` → `post<cmd>` —
  <https://docs.npmjs.com/cli/v12/using-npm/scripts/>
- Next.js — *public folder* (los archivos en `public/` se sirven desde la raíz):
  <https://nextjs.org/docs/app/api-reference/file-conventions/public-folder>
