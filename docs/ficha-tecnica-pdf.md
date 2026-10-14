# Ficha Técnica — cómo se genera el PDF

Documenta cómo se construyó y cómo se regenera el PDF de una sola página con la
**Ficha Técnica del producto** (FECA Creatina Monohidrato).

- **Artefacto**: `public/ficha-tecnica/FECA-Ficha-Tecnica.pdf` (generado en
  build, **gitignored**).
- **URL pública**: `/ficha-tecnica/FECA-Ficha-Tecnica.pdf`
- **Página web**: `/ficha-tecnica` (`src/app/ficha-tecnica/page.tsx`)
- **Datos**: `src/lib/technical_sheet.ts`
- **Script**: `scripts/generate-documentos.mjs` (`--only=ficha`)
- **Plantilla**: `scripts/lib/ficha.mjs`
- **Toolkit compartido**: `scripts/lib/brand-pdf.mjs`

> Para el sistema visual (colores, tipografías, logo, reglas) ver
> [`brand-pdf-system.md`](./brand-pdf-system.md).

## 1. Datos de entrada

`src/lib/technical_sheet.ts` exporta (named y default) el objeto
`technicalSheet`:

```ts
{
  product_information: {
    product_name, molecular_formula, molecular_weight, packing_spec
  },
  specifications: [
    { item, specification }                       // fila de texto
    | { item, operator, value, unit }             // fila numérica
  ],
  country_of_origin,
  remark
}
```

Reglas de formateo aplicadas por el generador:

- Si la fila tiene `specification` → se usa tal cual.
- Si tiene `operator`/`value`/`unit` → `` `${operator} ${value} ${unit}` ``,
  con el número formateado a **coma decimal** (`String(value).replace(".", ",")`).

## 2. Toolchain (y por qué)

| Pieza | Detalle |
| --- | --- |
| Ejecutor | **Node 24** (el repo corre en `node v24.13.1`). |
| Import de `.ts` | El script `.mjs` importa **directamente** `../src/lib/technical_sheet.ts`. Node 24 hace *type stripping* nativo (no requiere `ts-node`/`tsx`). Aparece un warning `MODULE_TYPELESS_PACKAGE_JSON` que es inofensivo. |
| Motor | **`@react-pdf/renderer`** (JS puro, sin navegador). Plantilla en `scripts/lib/ficha.mjs`; toolkit compartido en `scripts/lib/brand-pdf.mjs`. |
| Fuentes | Montserrat (400/500/600/700/800) + Zen Dots, **auto-hospedadas** en `assets/fonts/` y registradas con `Font.register`. No dependen de la red. |
| Logo | SVG vectorial real, copiado de `src/components/logo.tsx` (isotipo blanco + paths del wordmark), en `scripts/lib/brand-pdf.mjs`. |

**Por qué `@react-pdf/renderer`**: reutiliza la identidad de marca (fuentes,
colores, SVG del logo) con un layout tipo flexbox, corre en Node sin navegador y
sin red, por lo que **sí se genera en el build de Vercel**. Es el mismo motor que
el CoA por lote (ver
[`certificados-por-lote.md`](./certificados-por-lote.md)), así que ambos
documentos salen del mismo toolkit.

## 3. Cómo regenerar

```bash
npm run pdf:ficha-tecnica
# => script: node scripts/generate-documentos.mjs --only=ficha
# => escribe public/ficha-tecnica/FECA-Ficha-Tecnica.pdf
```

También se regenera con `npm run documentos` (genera ficha + CoA + índice) y
automáticamente en `prebuild`/`predev`. El PDF **ya no se commitea**: está en
`.gitignore` y se recrea en cada build.

Para editar el contenido, se modifica **`src/lib/technical_sheet.ts`** y se
vuelve a correr el comando. **No** se edita el PDF a mano.

## 4. Diseño (resumen)

Mismo lenguaje que el certificado (ver `brand-pdf-system.md`):

- Franja de encabezado `#cc5e21` con isotipo + wordmark blancos + tagline
  `IMPULSA TU RUTINA`; a la derecha `FICHA TÉCNICA / PRODUCTO`.
- Eyebrow `Documento público — Información técnica`, H1 Zen Dots
  `FICHA TÉCNICA DE PRODUCTO`, regla `#ccb89d`.
- Grilla de **Información del producto** (Producto, Fórmula molecular, Peso
  molecular, Envasado, Origen).
- Tabla **Especificaciones** (21 filas): encabezado `#f1f1f1`, filas alternadas;
  especificaciones numéricas en `#cc5e21`.
- Bloque **Condiciones de almacenamiento** (fondo `#f7f6f5`, `border-left`
  `#cc5e21`).
- Pie `#3f4140` con disclaimer + cajita "SELLO DE CALIDAD / FECA".

## 5. Restricción de una página

El documento **debe** ser exactamente **1 página**. Las 21 filas de
especificaciones son el punto crítico. Si en el futuro crecen los datos:

1. Primero compactar (padding de fila ~1.75 mm, fuente ~9.5 px).
2. Si aún no entra, pasar la tabla a **dos columnas**
   (`PARÁMETRO | ESPECIFICACIÓN | PARÁMETRO | ESPECIFICACIÓN`).

## 6. Verificación

Después de regenerar, comprobá con PyMuPDF (ya instalado: `python3 -c "import pymupdf"`):

```python
import pymupdf
d = pymupdf.open("public/ficha-tecnica/FECA-Ficha-Tecnica.pdf")
print("pages", d.page_count)                 # debe ser 1
pg = d[0]
print("page", pg.rect)                       # A4 ~595x842 pt
ys = [b[3] for b in pg.get_text("blocks")]
print("max text y", max(ys), "of", pg.rect.height)   # debe ser <= height
print(pg.get_text()[:1500])
```

Criterios: `pages == 1`, `max text y <= rect.height`, y que aparezcan los 21
parámetros + la información del producto + el remark.

## 7. Limitaciones conocidas

- **`Loss On Drying` muestra `<= 12 %`** (no `12,0`): el dato de origen es el
  número `12.0`, que al serializar a string pierde el decimal. Si se quiere
  mostrar `12,0`, cambiar la fuente de datos para que ese valor sea string, o
  agregar una regla de formato específica.
