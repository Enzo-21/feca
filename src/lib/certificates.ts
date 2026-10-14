// Índice de certificados. El array en sí **no** se escribe acá: lo genera
// `scripts/generate-documentos.mjs` en `src/lib/certificates.generated.ts`
// a partir de `data/lotes/<LOT>/<LOT>.json` (ver `docs/certificados-por-lote.md`).
//
// Este módulo define el tipo y re-exporta el índice para que el resto del sitio
// no sepa de dónde vienen los datos.
export type CertificateStatus = "approved" | "rejected" | "pending";

export type CertificateTest = {
  name: string;
  result: string;
  spec: string;
  method?: string;
};

export type Certificate = {
  /** Número de lote (== nombre de la carpeta en `data/lotes`). */
  lot: string;
  /** Archivo del PDF en `/certificados/<filename>`. */
  filename: string;
  title: string;
  /** Fecha de análisis en formato `DD/MM/AAAA`. */
  date: string;
  product: string;
  status: CertificateStatus;
  /** Total de páginas del PDF (1 = solo marca; 2+ = incluye el PDF del proveedor). */
  pageCount: number;
  /** Nombre del PDF de materia prima incluido como página 2 (null si no hay). */
  rawMaterialFilename: string | null;
  /** ¿Es un lote de ejemplo (no real)? */
  demo: boolean;
  tests: CertificateTest[];
};

export { certificates } from "./certificates.generated";
