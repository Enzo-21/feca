# Sistema de diseño de PDFs de marca

Fuente de verdad para **cualquier documento PDF con identidad FECA**:
la Ficha Técnica, el Certificado de Análisis por lote y cualquier otro
documento futuro. Si vas a crear o modificar un PDF de marca, esto es lo que
tenés que respetar.

Los tokens provienen de `src/app/globals.css` y del logo en
`src/components/logo.tsx`. **No inventes colores, tipografías ni formas nuevas.**

> **Implementación de referencia:** los primitivos de este sistema (franjas,
> títulos, tablas, chips, sello, logo) viven en `scripts/lib/brand-pdf.mjs` y
> son los que usan la Ficha Técnica (`scripts/lib/ficha.mjs`) y el CoA
> (`scripts/lib/coa.mjs`). Si vas a generar un PDF de marca, reutilizá ese
> módulo en vez de redibujar colores, fuentes o paths.

## 1. Colores

| Token | Hex | Uso en documentos |
| --- | --- | --- |
| `brand` | `#cc5e21` | Franja de encabezado, acentos, valores numéricos destacados, reglas/eyebrow, bordes de la "sección de sello". |
| `brand-dark` | `#a34a18` | Hover / énfasis secundario (sobre todo en web). |
| `brand-light` | `#f2d8c4` | Fondos suaves, chips. |
| `sand` | `#ccb89d` | Regla fina bajo el título (línea divisoria). |
| `ink` | `#3f4140` | Texto principal y franja de pie. |
| `graphite` | `#5b5d5c` | Texto secundario / etiquetas de valor no numérico. |
| `feather` | `#f1f1f1` | Fondo de encabezado de tabla. |
| `cream` | `#f7f6f5` | Fondos suaves de bloques (ej. "condiciones de almacenamiento"). |
| `border` | `#e4e1dc` | Bordes y separadores. |
| `muted-foreground` | `#8d908f` | Etiquetas en mayúsculas pequeñas (labels). |

Referencia exacta de la muestra del certificado (producido con MuPDF):

- Franja de encabezado relleno = `rgb(0.8, 0.369, 0.129)` = `#cc5e21`.
- Franja de pie relleno = `rgb(0.239, 0.255, 0.247)` = `#3f4140`.
- Regla del título = `#ccb89d` (1.5 px).
- Encabezado de tabla = `#f1f1f1`; filas alternadas `#fcfcfc` / `#ffffff`.
- Resultados/valores = `#cc5e21` (bold).

## 2. Tipografía

| Rol | Familia | Uso |
| --- | --- | --- |
| Display | **Zen Dots** | Título del documento y el wordmark "FECA". Uso **escaso** (es una tipografía de acento). |
| Texto/UI | **Montserrat** | Todo el resto: títulos de sección, etiquetas, cuerpo, tablas. Pesos 400/500/600/700/800. |

- Etiquetas (labels): mayúsculas, 7–8 px, `font-weight 800`, `letter-spacing ~0.14em`, color `#8d908f`.
- Títulos de sección: mayúsculas, ~9 px, `font-weight 800`, `letter-spacing ~0.2em`, color `#5b5d5c`.
- Encabezados de tabla: mayúsculas, ~8 px, `font-weight 800`, color `#3f4140`, fondo `#f1f1f1`.
- Celdas: ~9.5 px; parámetro en `#3f4140` peso 500, especificación/resultado numérico en `#cc5e21` peso 700.

> **En producción:** las fuentes están **auto-hospedadas** en `assets/fonts/`
> (Montserrat 400–800 + Zen Dots) y las registra `scripts/lib/brand-pdf.mjs` con
> `Font.register`. No se depende de Google Fonts ni de la red: la generación es
> determinista. El módulo también desactiva el guionado automático
> (`Font.registerHyphenationCallback`), para evitar cortes raros en tablas y
> métodos de análisis.

## 3. Logo

Definido en `src/components/logo.tsx`:

- **Isotipo (`LogoMark`)**: SVG `viewBox="76.7 76.5 146.6 147"`, 3 `<polygon>`.
  - Variante color: chevron `#cc5e21`, flechas `#5b5d5c`.
  - Variante blanca (para fondos de marca): todo `#ffffff`.
- **Wordmark (`Wordmark`)**: SVG `viewBox="27 178 246 53"`, 4 `<path>`.

Al reutilizarlos en un PDF, copiá los **mismos** puntos/paths (no redibujes).
Ya están implementados como `LogoMark` / `Wordmark` en
`scripts/lib/brand-pdf.mjs`. En la franja naranja del encabezado va la variante
**blanca**.

## 4. Anatomía de un documento

Estructura estándar (se ve igual en el certificado y en la ficha técnica):

1. **Franja de encabezado** — full-width, `#cc5e21`, ~110 px de alto.
   - Izquierda: isotipo (blanco) + wordmark (blanco) + tagline
     `IMPULSA TU RUTINA` (mayúsculas, tracking amplio, blanco 90%).
   - Derecha: etiqueta apilada en mayúsculas blanca bold
     (ej. `CERTIFICADO / DE ANÁLISIS` o `FICHA TÉCNICA / PRODUCTO`).
2. **Bloque de título** — eyebrow (pequeño, mayúsculas, `#cc5e21`) + H1 en
   Zen Dots, color `#3f4140`. Debajo, una **regla fina** `#ccb89d` (1.5 px).
3. **Cuerpo**:
   - Campos etiqueta/valor (label gris pequeño arriba, valor `#3f4140`).
   - Tablas: encabezado `#f1f1f1`, filas alternadas, sin bordes verticales.
   - Bloques de nota: fondo `cream` + `border-left` `#cc5e21`.
4. **Franja de pie** — full-width, `#3f4140`, texto blanco chico + disclaimer.
   Opcional: cajita "SELLO DE CALIDAD / FECA" con borde blanco translúcido.

## 5. Reglas no negociables

- **Tamaño**: A4 (595 × 842 pt / 210 × 297 mm). Márgenes laterales 12 mm.
- **Fondos de color**: siempre imprimirlos (`printBackground` / `-webkit-print-color-adjust: exact`).
- **Idioma**: chrome del documento en español (es-AR). Datos técnicos verbatim.
- **Números**: separador decimal **coma** (`99,5 %`, `149,15 g/mol`), preservando
  los decimales del origen (`12,0 %`, no `12 %`). Operadores con los glifos
  `≥` / `≤` (tanto en los PDF como en la web). Unidades con espacio: `0,03 %`,
  `430 g/L`, `100 ppm`, `100 cfu/g`. La conversión de separador la hace
  `formatDecimalComma()`, que reemplaza `.` por `,` **solo entre dígitos**: así
  no rompe strings como `U.S.P.<731>` (cuyos puntos no son decimales).
- **Glifos**: las fuentes de marca no incluyen glifos *fullwidth*
  (U+FF01–U+FF5E). `sanitizeText()` los normaliza a ASCII antes de dibujar (ej.
  `＆` U+FF06 → `&`), sin cambiar el significado; evita el "tofu" cuando el
  proveedor manda textos con esos caracteres.
- **Fechas**: mostrar `DD/MM/AAAA` (guardar en ISO `AAAA-MM-DD`).
- **Una página cuando corresponda**: la ficha técnica del producto debe caber en
  **una** sola página. El CoA **de marca** también es de una página; si el lote
  trae el PDF del proveedor, se **mergea como página 2** (ver
  [`certificados-por-lote.md`](./certificados-por-lote.md)). Si el contenido de
  marca crece, primero compactar; recién después evaluar multi-página (y en ese
  caso numera y repite encabezado).
- **Disclaimers**: los documentos públicos llevan una leyenda en el pie aclarando
  que es informativo (ej. "Documento público de carácter informativo. No posee
  validez oficial.").
- **Rastro de marca**: `FECA®` con el símbolo de marca registrada donde figure.

## 6. Checklist de verificación (antes de dar por bueno un PDF)

- [ ] Es A4 y tiene la cantidad de páginas esperada (1 para ficha y CoA).
- [ ] Ningún contenido se corta ni se sale de la página por abajo.
- [ ] La franja de encabezado es `#cc5e21` y el pie `#3f4140`.
- [ ] El logo es el SVG real (no un placeholder) y va en blanco sobre naranja.
- [ ] Los números usan coma decimal y las unidades con espacio.
- [ ] Toda la información fuente aparece (sin inventar ni omitir campos).
- [ ] El texto extraído del PDF coincide con los datos de entrada (ver
      `ficha-tecnica-pdf.md` § "Verificación").
