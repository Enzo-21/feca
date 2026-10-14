// Toolkit compartido para los PDFs de marca FECA.
//
// Lo usan tanto el Certificado de Análisis por lote (`coa.mjs`) como la Ficha
// Técnica (`ficha.mjs`). La fuente de verdad visual es
// `docs/brand-pdf-system.md`: colores, tipografías, logo y anatomía.
//
// Escribimos los componentes con `React.createElement` (alias `h`) a propósito:
// el repo no es ESM ("type": "module" no está en package.json) y `tsx` fuerza
// salida CJS, que rompe la resolución de `@react-pdf/renderer`. Con `.mjs`
// puro + `createElement` todo corre sin transpilación.
import React from "react";
import { Font, View, Text, Svg, Polygon, Path, G } from "@react-pdf/renderer";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = resolve(__dirname, "../../assets/fonts");

/** Alias corto de `React.createElement`. */
export const h = React.createElement;

/** 1 milímetro en puntos (react-pdf trabaja en pt). */
export const MM = 2.834645;

/** Tokens de color (espejo de `src/app/globals.css` / `docs/brand-pdf-system.md`). */
export const COLORS = {
  brand: "#cc5e21",
  brandDark: "#a34a18",
  brandLight: "#f2d8c4",
  sand: "#ccb89d",
  ink: "#3f4140",
  graphite: "#5b5d5c",
  feather: "#f1f1f1",
  cream: "#f7f6f5",
  border: "#e4e1dc",
  muted: "#8d908f",
  white: "#ffffff",
  rowAlt: "#fcfcfc",
};

/**
 * Registra las fuentes de marca auto-hospedadas en `assets/fonts` (TTF).
 * No depende de la red → la generación es determinista.
 */
let fontsRegistered = false;
export function registerBrandFonts() {
  if (fontsRegistered) return;
  Font.register({
    family: "Montserrat",
    fonts: [400, 500, 600, 700, 800].map((weight) => ({
      src: resolve(FONTS_DIR, `Montserrat-${weight}.ttf`),
      fontWeight: weight,
    })),
  });
  Font.register({
    family: "ZenDots",
    src: resolve(FONTS_DIR, "ZenDots-400.ttf"),
  });
  // Sin guionado automático: evita cortes raros en tablas y métodos de análisis.
  Font.registerHyphenationCallback((word) => [word]);
  fontsRegistered = true;
}
registerBrandFonts();

// ---------------------------------------------------------------------------
// Logo (mismos puntos/paths que `src/components/logo.tsx`; no redibujar)
// ---------------------------------------------------------------------------

const MARK_VIEWBOX = "76.7 76.5 146.6 147";
const MARK_POLYGONS = [
  "108.06 217.31 96.22 205.47 151.91 149.78 96.36 94.23 108.2 82.39 175.59 149.78 108.06 217.31",
  "158.71 85.17 149.95 76.47 130.07 96.36 141.92 108.22 150 100.14 199.63 149.78 150 199.41 141.92 191.33 130.09 203.17 141.2 214.29 150 223.53 158.8 214.29 223.31 149.78 158.71 85.17",
  "100.37 149.78 122.19 127.95 110.34 116.1 76.69 149.78 110.35 183.44 122.19 171.6 100.37 149.78",
];

const WORDMARK_VIEWBOX = "27 178 246 53";
const WORDMARK_PATHS = [
  "M27.32,230.14l19.52-51.04h54.54l-3.55,9.28h-43.12l-5.4,14.13h37.55l-3.55,9.28h-37.55l-7.01,18.35h-11.42Z",
  "M89.71,230.14l19.52-51.04h55.97l-3.55,9.28h-44.54l-4.31,11.28h40.4l-3.55,9.28h-40.4l-4.56,11.92h44.54s-3.55,9.28-3.55,9.28h-55.97Z",
  "M179.67,230.5c-9.42,0-15.8-2.18-19.13-6.53-3.33-4.36-3.36-10.81-.08-19.38,3.26-8.52,8.22-14.97,14.89-19.35,6.67-4.38,14.71-6.54,24.11-6.5l25.64.14-3.49,9.14h-24.91c-6.19,0-11.28,1.31-15.28,3.93-4,2.62-7.11,6.83-9.33,12.64-2.22,5.81-2.34,10.03-.35,12.67,1.99,2.64,6.08,3.96,12.26,3.96h25.63l-3.55,9.28h-26.41Z",
  "M209.07,230.14l42.5-51.04h17.63l3.47,51.04h-12.42l-.73-10.78h-29.05l-8.98,10.78h-12.42ZM238.16,210.09h20.77l-1.49-22.06h-.93l-18.36,22.06Z",
];

/** Isotipo FECA. `color` por defecto blanco (para la franja naranja). */
export function LogoMark({ size = 34, color = COLORS.white } = {}) {
  return h(
    Svg,
    { width: size, height: size, viewBox: MARK_VIEWBOX },
    ...MARK_POLYGONS.map((points, i) =>
      h(Polygon, { key: i, fill: color, points })
    )
  );
}

/** Wordmark "FECA". `ratio` = 246/53 ≈ 4.64. */
export function Wordmark({ width = 96, color = COLORS.white } = {}) {
  return h(
    Svg,
    { width, height: (width * 53) / 246, viewBox: WORDMARK_VIEWBOX },
    h(
      G,
      { fill: color },
      ...WORDMARK_PATHS.map((d, i) => h(Path, { key: i, d }))
    )
  );
}

// ---------------------------------------------------------------------------
// Primitivas de layout
// ---------------------------------------------------------------------------

/** Franja de encabezado naranja con logo + etiquetas apiladas. */
export function HeaderBand({ labelMain, labelSub }) {
  return h(
    View,
    {
      style: {
        backgroundColor: COLORS.brand,
        paddingVertical: 15,
        paddingHorizontal: 34,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    h(
      View,
      { style: { flexDirection: "column" } },
      h(
        View,
        { style: { flexDirection: "row", alignItems: "center", gap: 8 } },
        h(LogoMark, { size: 27 }),
        h(Wordmark, { width: 80 })
      ),
      h(
        Text,
        {
          style: {
            marginTop: 5,
            fontSize: 6.5,
            fontWeight: 700,
            letterSpacing: 2.4,
            color: "rgba(255,255,255,0.92)",
          },
        },
        "IMPULSA TU RUTINA"
      )
    ),
    h(
      View,
      { style: { alignItems: "flex-end" } },
      h(
        Text,
        {
          style: {
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: 1,
            color: COLORS.white,
          },
        },
        labelMain
      ),
      h(
        Text,
        {
          style: {
            marginTop: 2,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 3,
            color: "rgba(255,255,255,0.86)",
          },
        },
        labelSub
      )
    )
  );
}

/** Eyebrow + título (Zen Dots) + regla `sand`. */
export function TitleBlock({ eyebrow, title }) {
  return h(
    View,
    { style: { marginBottom: 8 } },
    eyebrow
      ? h(
          Text,
          {
            style: {
              fontSize: 6.6,
              fontWeight: 800,
              letterSpacing: 0.6,
              color: COLORS.brand,
            },
          },
          String(eyebrow).toUpperCase()
        )
      : null,
    h(
      Text,
      {
        style: {
          marginTop: 3,
          fontFamily: "ZenDots",
          fontSize: 15,
          lineHeight: 1.15,
          color: COLORS.ink,
        },
      },
      title
    ),
    h(View, {
      style: { marginTop: 6, height: 1.5, backgroundColor: COLORS.sand },
    })
  );
}

/** Título de sección (mayúsculas, tracking amplio). */
export function SectionTitle({ children }) {
  return h(
    Text,
    {
          style: {
            fontSize: 7,
            fontWeight: 800,
            letterSpacing: 1.4,
            color: COLORS.graphite,
            marginBottom: 4,
          },
        },
        String(children).toUpperCase()
      );
}

/** Grilla de campos etiqueta/valor. */
export function InfoGrid({ items, columns = 3 }) {
  const visible = items.filter((it) => it && it.value !== undefined && it.value !== null && it.value !== "");
  return h(
    View,
    { style: { flexDirection: "row", flexWrap: "wrap", marginBottom: 8 } },
    ...visible.map((it, i) =>
      h(
        View,
        {
          key: `${it.label}-${i}`,
          style: {
            width: `${100 / columns}%`,
            paddingRight: 12,
            marginBottom: 5,
          },
        },
        h(
          Text,
          {
            style: {
              fontSize: 5.9,
              fontWeight: 800,
              letterSpacing: 0.6,
              color: COLORS.muted,
              marginBottom: 1,
            },
          },
          String(it.label).toUpperCase()
        ),
        h(
          Text,
          { style: { fontSize: 8.6, fontWeight: 600, color: COLORS.ink } },
          String(it.value)
        )
      )
    )
  );
}

/**
 * Tabla de datos sin bordes verticales.
 * `columns`: [{ key, label, width (%), align, color, weight, fontSize }]
 */
export function DataTable({ columns, rows, fontSize = 7.2, rowPadding = 2.5 }) {
  return h(
    View,
    { style: { borderBottomWidth: 1, borderBottomColor: COLORS.border } },
    h(
      View,
      { style: { flexDirection: "row", backgroundColor: COLORS.feather } },
      ...columns.map((c) =>
        h(
          Text,
          {
            key: `h-${c.key}`,
            style: {
              width: `${c.width}%`,
              paddingVertical: 3,
              paddingHorizontal: 5,
              fontSize: 6.5,
              fontWeight: 800,
              letterSpacing: 0.7,
              color: COLORS.ink,
              textAlign: c.align || "left",
            },
          },
          String(c.label).toUpperCase()
        )
      )
    ),
    ...rows.map((row, i) =>
      h(
        View,
        {
          key: `r-${i}`,
          style: {
            flexDirection: "row",
            backgroundColor: i % 2 === 0 ? COLORS.rowAlt : COLORS.white,
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.feather,
          },
        },
        ...columns.map((c) => {
          const resolve = (v, fallback) =>
            typeof v === "function" ? v(row) : (v ?? fallback);
          return h(
            Text,
            {
              key: `c-${c.key}`,
              style: {
                width: `${c.width}%`,
                paddingVertical: rowPadding,
                paddingHorizontal: 5,
                fontSize: resolve(c.fontSize, fontSize),
                fontWeight: resolve(c.weight, 500),
                color: resolve(c.color, COLORS.ink),
                textAlign: c.align || "left",
              },
            },
            String((c.value ? c.value(row) : row[c.key]) ?? "")
          );
        })
      )
    )
  );
}

/** Bloque de nota (fondo crema + borde izquierdo de marca). */
export function NoteBlock({ label, children, style }) {
  return h(
    View,
    {
      style: {
        marginTop: 8,
        backgroundColor: COLORS.cream,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.brand,
        paddingVertical: 6,
        paddingHorizontal: 11,
        ...(style || {}),
      },
    },
    label
      ? h(
          Text,
          {
            style: {
              fontSize: 6.3,
              fontWeight: 800,
              letterSpacing: 0.8,
              color: COLORS.muted,
              marginBottom: 3,
            },
          },
          String(label).toUpperCase()
        )
      : null,
    h(
      Text,
      { style: { fontSize: 8.6, fontWeight: 500, color: COLORS.ink, lineHeight: 1.4 } },
      children
    )
  );
}

/** Chip de estado (APROBADO / RECHAZADO / PENDIENTE). */
export function StatusChip({ label, tone = "brand" }) {
  const bg = tone === "rejected" ? COLORS.ink : COLORS.brand;
  return h(
    View,
    {
      style: {
        alignSelf: "flex-start",
        backgroundColor: bg,
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 9,
      },
    },
    h(
      Text,
      { style: { fontSize: 7, fontWeight: 800, letterSpacing: 1, color: COLORS.white } },
      String(label).toUpperCase()
    )
  );
}

/** Franja de pie (tinta) con título y, opcionalmente, etiqueta de página. */
export function FooterBand({ title, pageLabel }) {
  return h(
    View,
    {
      style: {
        backgroundColor: COLORS.ink,
        paddingVertical: 9,
        paddingHorizontal: 34,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    h(
      Text,
      {
        style: {
          flexGrow: 1,
          paddingRight: 12,
          fontSize: 7,
          fontWeight: 700,
          color: COLORS.white,
        },
      },
      title
    ),
    pageLabel
      ? h(
          Text,
          { style: { fontSize: 6.4, fontWeight: 600, color: "rgba(255,255,255,0.8)" } },
          pageLabel
        )
      : null
  );
}

// ---------------------------------------------------------------------------
// Formateo (reglas de `docs/brand-pdf-system.md`)
// ---------------------------------------------------------------------------

/**
 * Convierte separadores decimales a coma, pero **solo** entre dígitos para no
 * romper strings como `U.S.P.<731>` (cuyos puntos no son decimales).
 */
export function formatDecimalComma(value) {
  return String(value).replace(/(\d)\.(\d)/g, "$1,$2");
}

/**
 * Normaliza glifos "fullwidth" (U+FF01–U+FF5E) a su equivalente ASCII. Las
 * fuentes de marca no incluyen esos glifos (ej. `＆` del proveedor se ve como
 * tofu sin esta normalización). No cambia el significado, solo la forma.
 */
export function sanitizeText(value) {
  return String(value).replace(/[\uFF01-\uFF5E]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0xfee0)
  );
}

const MONTHS = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

/** Normaliza a ISO `AAAA-MM-DD` desde varios formatos; devuelve "" si no puede. */
export function toIsoDate(value) {
  if (!value) return "";
  const str = String(value).trim();
  let m = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  m = str.match(/^([A-Za-z]+)\.?\s*(\d{1,2}),?\s*(\d{4})/);
  if (m) {
    const mm = MONTHS[m[1].slice(0, 3).toLowerCase()];
    if (mm) return `${m[3]}-${mm}-${m[2].padStart(2, "0")}`;
  }
  return "";
}

/** ISO `AAAA-MM-DD` → `DD/MM/AAAA` (passthrough si ya viene en display). */
export function formatDisplayDate(value) {
  if (!value) return "";
  const iso = toIsoDate(value);
  if (iso) {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }
  return String(value);
}

export const STATUS_LABELS = {
  approved: "APROBADO",
  rejected: "RECHAZADO",
  pending: "PENDIENTE",
};
