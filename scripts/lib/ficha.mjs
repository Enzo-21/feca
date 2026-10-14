// Ficha Técnica del producto (una página) con el toolkit de marca.
//
// Reemplaza la generación vía Playwright: mismo motor JS puro que el CoA, así
// corre en el build de Vercel (sin Chromium) y comparte la identidad visual.
import { Document, Page, View } from "@react-pdf/renderer";
import {
  h,
  COLORS,
  HeaderBand,
  TitleBlock,
  SectionTitle,
  InfoGrid,
  DataTable,
  NoteBlock,
  FooterBand,
  formatDecimalComma,
} from "./brand-pdf.mjs";

const PAGE_PADDING = 34;

const OPERATOR_GLYPH = { ">=": "≥", "<=": "≤" };

function formatSpec(spec) {
  if (spec.specification !== undefined) {
    return { text: String(spec.specification), numeric: false };
  }
  const op = OPERATOR_GLYPH[spec.operator] ?? spec.operator;
  return {
    text: `${op} ${formatDecimalComma(spec.value)} ${spec.unit}`,
    numeric: true,
  };
}

const TABLE_COLUMNS = [
  { key: "item", label: "Parámetro", width: 58, weight: 500, color: COLORS.ink },
  {
    key: "spec",
    label: "Especificación",
    width: 42,
    weight: (r) => (r.numeric ? 700 : 600),
    color: (r) => (r.numeric ? COLORS.brand : COLORS.graphite),
  },
];

/** Construye el `<Document>` (react-pdf) de la Ficha Técnica. */
export function buildFichaDocument(sheet) {
  const { product_information: info, specifications, country_of_origin, remark } = sheet;

  const infoItems = [
    { label: "Producto", value: info.product_name },
    { label: "Fórmula molecular", value: info.molecular_formula },
    {
      label: "Peso molecular",
      value: `${formatDecimalComma(info.molecular_weight)} g/mol`,
    },
    { label: "Envasado", value: info.packing_spec },
    { label: "Origen", value: country_of_origin },
  ];

  const rows = specifications.map((spec) => {
    const { text, numeric } = formatSpec(spec);
    return { item: spec.item, spec: text, numeric };
  });

  return h(
    Document,
    {
      title: "FECA — Ficha Técnica",
      author: "FECA",
      subject: "Ficha técnica del producto",
      keywords: "FECA, ficha técnica, creatina",
      creator: "FECA",
      producer: "FECA",
      // Fecha fija → salida determinista entre builds (no depende del reloj).
      creationDate: new Date("2026-01-01T00:00:00Z"),
      modificationDate: new Date("2026-01-01T00:00:00Z"),
    },
    h(
      Page,
      {
        size: "A4",
        style: {
          fontFamily: "Montserrat",
          color: COLORS.ink,
          backgroundColor: COLORS.white,
        },
      },
      h(HeaderBand, { labelMain: "FICHA TÉCNICA", labelSub: "PRODUCTO" }),
      h(
        View,
        {
          style: {
            paddingHorizontal: PAGE_PADDING,
            paddingTop: 18,
            flexGrow: 1,
            flexDirection: "column",
          },
        },
        h(TitleBlock, {
          eyebrow: "Documento público — Información técnica",
          title: "FICHA TÉCNICA DE PRODUCTO",
        }),
        h(InfoGrid, { items: infoItems, columns: 3 }),
        h(SectionTitle, null, "Especificaciones"),
        h(DataTable, { columns: TABLE_COLUMNS, rows }),
        h(NoteBlock, { label: "Condiciones de almacenamiento" }, remark)
      ),
      h(FooterBand, {
        title: "FECA® — Ficha técnica del producto. Impulsa tu rutina.",
        disclaimer: "Documento público de carácter informativo. No posee validez oficial.",
        pageLabel: "Página 1",
      })
    )
  );
}
