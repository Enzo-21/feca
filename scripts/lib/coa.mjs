// Certificado de Análisis (CoA) de marca, una página, a partir de un lote.
import { Document, Page, View, Text } from "@react-pdf/renderer";
import {
  h,
  COLORS,
  HeaderBand,
  TitleBlock,
  SectionTitle,
  InfoGrid,
  DataTable,
  NoteBlock,
  StatusChip,
  FooterBand,
  formatDecimalComma,
  formatDisplayDate,
  sanitizeText,
  STATUS_LABELS,
} from "./brand-pdf.mjs";

const PAGE_PADDING = 34;

/** Normaliza glifos y separador decimal para mostrar. */
const clean = (value) => formatDecimalComma(sanitizeText(value ?? ""));

const INFO_FIELDS = (lot) => [
  { label: "Lote", value: clean(lot.lot) },
  { label: "Producto", value: clean(lot.product) },
  { label: "Fecha de análisis", value: formatDisplayDate(lot.analysisDate) },
  { label: "Fabricación", value: formatDisplayDate(lot.manufactureDate) },
  { label: "Vencimiento", value: formatDisplayDate(lot.expiryDate) },
  { label: "Cantidad", value: clean(lot.quantity) },
  { label: "Envases", value: clean(lot.packages) },
  { label: "Envasado", value: clean(lot.packingSpec) },
  { label: "Origen", value: clean(lot.countryOfOrigin) },
  { label: "Fabricante", value: clean(lot.company) },
  { label: "Analista", value: clean(lot.analyst) },
  { label: "Responsable de calidad", value: clean(lot.responsible) },
];

const TABLE_COLUMNS = [
  { key: "name", label: "Parámetro", width: 29, weight: 500, color: COLORS.ink },
  { key: "spec", label: "Especificación", width: 26, weight: 600, color: COLORS.graphite },
  { key: "result", label: "Resultado", width: 23, weight: 700, color: COLORS.brand },
  { key: "method", label: "Método", width: 22, weight: 500, color: COLORS.muted, fontSize: 6.6 },
];

/**
 * Construye el `<Document>` (react-pdf) del CoA.
 * @param {object} lot modelo normalizado (ver `lots.mjs`)
 * @param {{ pageLabel?: string }} [options]
 */
export function buildCoaDocument(lot, options = {}) {
  const rows = lot.tests.map((t) => ({
    name: clean(t.name),
    spec: clean(t.spec),
    result: clean(t.result),
    method: clean(t.method),
  }));

  const statusLabel = STATUS_LABELS[lot.status] || lot.status;

  return h(
    Document,
    {
      title: `Certificado de análisis — Lote ${lot.lot}`,
      author: "FECA",
      subject: `Certificado de análisis del lote ${lot.lot}`,
      keywords: `FECA, certificado, análisis, lote, ${lot.lot}`,
      creator: "FECA",
      producer: "FECA",
      // Fecha fija (= fecha de análisis) → salida determinista entre builds.
      creationDate: new Date(`${lot.analysisDate}T00:00:00Z`),
      modificationDate: new Date(`${lot.analysisDate}T00:00:00Z`),
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
      h(HeaderBand, { labelMain: "CERTIFICADO", labelSub: "DE ANÁLISIS" }),
      h(
        View,
        {
          style: {
            paddingHorizontal: PAGE_PADDING,
            paddingTop: 13,
            flexGrow: 1,
            flexDirection: "column",
          },
        },
        h(TitleBlock, {
          eyebrow: "Documento público — Análisis de lote",
          title: "CERTIFICADO DE ANÁLISIS",
        }),
        h(View, { style: { marginBottom: 10 } }, h(StatusChip, { label: statusLabel })),
        h(InfoGrid, { items: INFO_FIELDS(lot), columns: 3 }),
        lot.address
          ? h(
              Text,
              {
                style: {
                  fontSize: 6.4,
                  color: COLORS.muted,
                  marginBottom: 10,
                  lineHeight: 1.35,
                },
              },
              sanitizeText(lot.address)
            )
          : null,
        h(SectionTitle, null, "Resultados del análisis"),
        h(DataTable, { columns: TABLE_COLUMNS, rows }),
        lot.conclusion || lot.status
          ? h(
              View,
              { style: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 } },
              h(StatusChip, { label: statusLabel }),
              h(
                Text,
                { style: { fontSize: 8.4, fontWeight: 700, color: COLORS.ink } },
                lot.conclusion ? `Conclusión: ${sanitizeText(lot.conclusion)}` : "Conclusión del lote"
              )
            )
          : null,
        lot.remark
          ? h(
              NoteBlock,
              { label: "Condiciones de almacenamiento" },
              sanitizeText(lot.remark)
            )
          : null
      ),
      h(FooterBand, {
        title: "FECA® — Certificado de análisis de materia prima.",
        pageLabel: options.pageLabel || "Página 1",
      })
    )
  );
}
