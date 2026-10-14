# Certificados por lote — cómo funciona y cómo se opera

Documenta el pipeline **real** de certificados: una carpeta por lote con el JSON
del proveedor (y opcionalmente su PDF de materia prima), y la generación
automática del **Certificado de Análisis (CoA) de marca** en el build.

- **Fuente de verdad (commiteada)**: `data/lotes/<LOT>/<LOT>.json` + `<LOT>.pdf`
  (opcional).
- **Generador**: `scripts/generate-documentos.mjs` (corre en `prebuild`/`predev`).
- **Motor**: `@react-pdf/renderer` (JS puro) + `pdf-lib` para el merge de páginas.
- **Salidas**:
  - `public/certificados/<LOT>.pdf` (gitignored; se genera en build)
  - `public/ficha-tecnica/FECA-Ficha-Tecnica.pdf` (gitignored; se genera en build)
  - `src/lib/certificates.generated.ts` (índice; commiteado, determinista)
- **Páginas web**: `/calidad` (`src/app/calidad/page.tsx`) y el componente
  `src/components/certificate-search.tsx`.

> Para el sistema visual (colores, tipografías, logo, reglas) ver
> [`brand-pdf-system.md`](./brand-pdf-system.md). Para el historial de la
> decisión de arquitectura, ver
> [`plan-certificados-por-lote.md`](./plan-certificados-por-lote.md).

## 1. Objetivo

Para cada lote real, la persona que carga la calidad solo debe: **crear la
carpeta, dejar el JSON del proveedor y (si aplica) su PDF, y hacer push**. El
resto es automático: en el build se genera el CoA de marca, se mergea el PDF del
proveedor como página 2 y la web lista el lote sin listas hardcodeadas.

## 2. Estructura de carpetas

```
data/
  lotes/
    202604-013/
      202604-013.json    # JSON del proveedor (fuente de verdad del lote)
      202604-013.pdf     # (opcional) PDF del proveedor → se anexa como página 2
    <LOT>/               # una carpeta por lote real
      <LOT>.json
      <LOT>.pdf          # (opcional)
```

Reglas de nombres:

- La carpeta y el archivo `.json` deben llamarse **igual** al número de lote
  (`<LOT>`), y `<LOT>` debe coincidir con `product_information.batch_no` (o
  `lot`) del JSON.
- El PDF del proveedor (si existe) debe llamarse `<LOT>.pdf` dentro de la misma
  carpeta.
- Las carpetas que empiezan con `_` se ignoran (sirven para plantillas o notas).

Si algo no cierra —falta el JSON, el nombre no coincide, no hay análisis o la
fecha es inválida— el generador tira un error claro y **el build falla**.

## 3. Formato del JSON de entrada

El formato es el del proveedor (no hay que reescribirlo). Campos reales del lote
`data/lotes/202604-013/202604-013.json`:

```jsonc
{
  "company_name": "Ningxia Baoma Pharm Co., Ltd",
  "company_address": "34 Shanshui Road ,Taisha District Area ,Pingluo County,Shizuishan City,Ningxia,753401,China",
  "date": "Apr.13,2026",                       // fecha de análisis
  "product_information": {
    "product_name": "Creatine Monohydrate 200 Mesh",
    "manufacture_date": "Apr.13,2026",
    "expiry_date": "Apr.12,2029",
    "quantity": "27000KGS",
    "number_of_packages": "1080Cartons",
    "batch_no": "202604-013",                  // debe coincidir con la carpeta
    "packing_spec": "25kg/Carton"
  },
  "analysis_results": [
    {
      "item": "Assay",
      "specification": "≥99.5%",
      "result": "99.80%",
      "analysis_method": "TITRATION"
    }
    // … una fila por parámetro
  ],
  "conclusion": "Qualified",
  "country_of_origin": "China",
  "remark": "Stored in cool, dry and ventilated warehouse, and keep away from Moisture.",
  "analyst": "Liu Jing",
  "person_responsible_for_quality": "Xu Yuerong",
  "demo": false                                 // opcional; hoy no hay lotes de ejemplo
}
```

Mapeo a los campos que se muestran (lo hace `scripts/lib/lots.mjs`):

| Campo JSON | Campo interno | Requerido | Notas |
| --- | --- | --- | --- |
| `product_information.batch_no` (o `lot`) | `lot` | ✅ | Debe ser igual a la carpeta. |
| `date` (o `analysisDate`) | `analysisDate` | ✅ | Es también la fecha del pie y la fecha fija del PDF. |
| `product_information.product_name` (o `product`) | `product` | — | Producto mostrado en la tarjeta. |
| `company_name` | `company` | — | Fabricante. |
| `company_address` | `address` | — | Dirección del proveedor. |
| `product_information.manufacture_date` | `manufactureDate` | — | |
| `product_information.expiry_date` | `expiryDate` | — | |
| `product_information.quantity` | `quantity` | — | |
| `product_information.number_of_packages` | `packages` | — | |
| `product_information.packing_spec` | `packingSpec` | — | |
| `analysis_results[].item` | `tests[].name` | ✅ (≥1 fila) | |
| `analysis_results[].specification` | `tests[].spec` | — | |
| `analysis_results[].result` | `tests[].result` | — | |
| `analysis_results[].analysis_method` | `tests[].method` | — | |
| `conclusion` | `conclusion` | — | Se usa para derivar el estado. |
| `country_of_origin` | `countryOfOrigin` | — | |
| `remark` | `remark` | — | Bloque "Condiciones de almacenamiento". |
| `analyst` | `analyst` | — | |
| `person_responsible_for_quality` | `responsible` | — | |
| `demo` | `demo` | — | `true` marca el lote como ejemplo. |

Aliases opcionales aceptados: `tests` (en lugar de `analysis_results`),
`analysisDate`, `manufacturingDate`, `expiryDate`, `status`, `productSlug` y
`notes`.

### 3.1 Estado del lote (`approved` / `rejected` / `pending`)

Si el JSON trae `status` con uno de esos valores, se respeta. Si no, el estado se
deriva del texto de `conclusion`:

- contiene `unqualified`, `fail`, `reject` o `no conform` → `rejected`;
- contiene `qualified`, `conform`, `pass`, `ok` o `aprobad` → `approved`;
- cualquier otro caso → `pending`.

En el PDF y en la web se muestran como `APROBADO` / `RECHAZADO` / `PENDIENTE`.

### 3.2 El flag `demo`

El pipeline soporta lotes de ejemplo: un lote con `"demo": true` se marca con el
badge `Ejemplo` en la tarjeta y, si existe al menos uno, `/calidad` muestra el
aviso "Incluye lotes de ejemplo…".

**Hoy no hay lotes de ejemplo cargados**: el único lote es el real `202604-013`
(creatina monohidrato 200 mesh), que además trae su PDF de proveedor.

## 4. Cómo agrega una persona un lote nuevo (runbook)

1. Crear la carpeta `data/lotes/<LOT>/` (ej. `202605-014`).
2. Guardar el JSON del proveedor como `data/lotes/<LOT>/<LOT>.json` y ajustar
   `product_information.batch_no` para que coincida con `<LOT>`.
3. Si se quiere publicar el certificado de materia prima, guardarlo como
   `data/lotes/<LOT>/<LOT>.pdf` (verbatim, sin editar).
4. Validar sin generar: `npm run documentos:check` (debe listar el lote nuevo).
5. Generar y revisar local: `npm run documentos` y abrir
   `public/certificados/<LOT>.pdf`. Controlarlo con el checklist de
   [`brand-pdf-system.md`](./brand-pdf-system.md) §6.
6. Commit y push. En el build (`prebuild`) se generan los PDFs y el índice, y
   Vercel publica todo.
7. Verificar en producción: `/calidad` lista el lote y
   `/certificados/<LOT>.pdf` responde 200.

> No se commitea ningún PDF generado: están en `.gitignore` y se recrean en cada
> build.

## 5. Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run documentos` | Genera ficha + todos los CoA + el índice. |
| `npm run documentos:check` | Solo valida los lotes y lista cada uno; **no** escribe PDFs. |
| `npm run pdf:ficha-tecnica` | Genera **solo** la Ficha Técnica (equivale a `--only=ficha`). |
| `npm run dev` / `npm run build` | Corren el generador vía `predev` / `prebuild`. |

Flags del script (`node scripts/generate-documentos.mjs`):

- `--check`: valida y sale (sin escribir).
- `--only=ficha`: genera únicamente la Ficha Técnica.
- `--only=certificados`: genera únicamente los CoA (y el índice).

La generación es **determinista**: los PDFs usan fechas fijas (la fecha de
análisis del lote para el CoA; una fecha fija para la ficha), no dependen del
reloj y no necesitan red (las fuentes son locales).

## 6. Reglas de armado

- **Una página de marca**: el CoA de marca ocupa exactamente una página.
- **Merge de 2 páginas**: si existe `<LOT>.pdf`, se anexa como **página 2** del
  mismo PDF. Resultado: página 1 = CoA de marca (`Página 1 de 2` en el pie),
  página 2 = PDF del proveedor verbatim. Si no existe, el PDF tiene 1 página
  (`Página 1`).
- **Formatos de fecha**: el generador acepta ISO (`AAAA-MM-DD`), `DD/MM/AAAA` o
  el formato del proveedor (`Apr.13,2026`). Internamente se guarda en ISO y se
  muestra `DD/MM/AAAA`.
- **Números**: el separador decimal se convierte a **coma** únicamente **entre
  dígitos** (`99.80%` → `99,80%`), para no romper strings como `U.S.P.<731>` (sus
  puntos no son decimales).
- **Verbatim vs. chrome**: los datos técnicos (nombres de parámetros,
  especificaciones, resultados, métodos, conclusión, remark) van **verbatim**,
  como vienen del proveedor. Solo el "chrome" (títulos, encabezados, etiquetas y
  pie) está en español.
- **Glifos**: las fuentes de marca no incluyen glifos *fullwidth* (U+FF01–U+FF5E).
  `sanitizeText()` los normaliza a ASCII —por eso `Mould＆Yeast` (con `＆`,
  U+FF06) se muestra como `Mould&Yeast`— sin cambiar el significado.
- **Metadatos del PDF**: el CoA de marca (y el PDF mergeado) fijan autor,
  título y fechas para que la salida sea estable entre builds.

## 7. Archivos generados

| Archivo | Descripción | ¿Git? |
| --- | --- | --- |
| `public/certificados/<LOT>.pdf` | CoA de marca (1 o 2 páginas). | Gitignored. |
| `public/ficha-tecnica/FECA-Ficha-Tecnica.pdf` | Ficha Técnica. | Gitignored. |
| `src/lib/certificates.generated.ts` | Índice tipado que consume la web. | Sí (commiteado; determinista). |

`src/lib/certificates.ts` define el tipo `Certificate` y re-exporta el índice
generado, de modo que el resto del sitio no sabe de dónde salen los datos.
`certificate-search.tsx` muestra lote, fecha, estado y método (más el badge
`Ejemplo` si el lote lo es) y una nota cuando el PDF incluye la página del
proveedor. El "filtro rápido" por prefijo se oculta cuando hay un único lote.

## 8. Verificación

- **Validación de datos**: `npm run documentos:check` recorre todos los lotes y
  falla si alguno es inválido.
- **Conteo de páginas** (PyMuPDF, ya disponible localmente):

  ```python
  import pymupdf
  d = pymupdf.open("public/certificados/202604-013.pdf")
  print("pages", d.page_count)   # 2 (marca + proveedor)
  ```

- **e2e**: `npm run test:e2e` (Playwright). `e2e/calidad.spec.ts` verifica que se
  liste el único certificado real (`202604-013`), el filtrado y que informe las 2
  páginas.
- **Idempotencia**: correr el generador dos veces debe producir el mismo hash.
- **Idempotencia**: correr el generador dos veces debe producir el mismo hash.

## 9. Limitaciones conocidas

- **Solo creatina por ahora**: el pipeline está pensado para creatina
  monohidrato; el schema interno contempla `productSlug`, pero no hay catálogo
  multi-producto.
- **Merge literal**: la página 2 es el PDF del proveedor tal cual; no se
  re-renderiza ni se traduce. Si el proveedor manda un PDF corrupto o en otro
  tamaño de página, así se publica.
- **Estado derivado por texto**: cuando el JSON no trae `status`, la
  clasificación depende de palabras clave en `conclusion` (`qualified` →
  aprobado, etc.). Una conclusión en otro idioma puede caer en `pending`.
- **Fechas ambiguas**: formatos de fecha distintos a ISO / `DD/MM/AAAA` /
  `Mes. D, AAAA` se rechazan (el build falla) en lugar de adivinar.
- **Campos sin usar**: `notes` y `productSlug` se leen pero hoy no se muestran en
  el CoA; `document_title` se ignora por completo.
