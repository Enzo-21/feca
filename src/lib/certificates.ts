export type Certificate = {
  lot: string;
  filename: string;
  title: string;
  date: string;
  product: string;
  tests: { name: string; result: string; spec: string }[];
};

const commonTests = [
  { name: "Creatina (HPLC)", result: "≥ 99,9%", spec: "≥ 99,5%" },
  { name: "Dioxina / HAP", result: "No detectado", spec: "No detectado" },
  { name: "Metales pesados", result: "Conforme", spec: "Ausencia" },
];

export const certificates: Certificate[] = [
  {
    lot: "FECA-2026-001",
    filename: "FECA-2026-001.pdf",
    title: "Certificado de análisis — Lote FECA-2026-001",
    date: "12/01/2026",
    product: "FECA Creatina Monohidrato 300 g",
    tests: commonTests,
  },
  {
    lot: "FECA-2026-002",
    filename: "FECA-2026-002.pdf",
    title: "Certificado de análisis — Lote FECA-2026-002",
    date: "22/01/2026",
    product: "FECA Creatina Monohidrato 300 g",
    tests: commonTests,
  },
  {
    lot: "FECA-2026-003",
    filename: "FECA-2026-003.pdf",
    title: "Certificado de análisis — Lote FECA-2026-003",
    date: "03/02/2026",
    product: "FECA Creatina Monohidrato 500 g",
    tests: commonTests,
  },
  {
    lot: "FECA-2026-004",
    filename: "FECA-2026-004.pdf",
    title: "Certificado de análisis — Lote FECA-2026-004",
    date: "14/02/2026",
    product: "FECA Creatina Monohidrato 300 g",
    tests: commonTests,
  },
  {
    lot: "FECA-2026-005",
    filename: "FECA-2026-005.pdf",
    title: "Certificado de análisis — Lote FECA-2026-005",
    date: "25/02/2026",
    product: "FECA Creatina Saborizada",
    tests: [
      { name: "Creatina (HPLC)", result: "≥ 99,8%", spec: "≥ 99,5%" },
      { name: "Aromatizantes naturales", result: "Conforme", spec: "Conforme" },
      { name: "Metales pesados", result: "Conforme", spec: "Ausencia" },
    ],
  },
  {
    lot: "FECA-2026-006",
    filename: "FECA-2026-006.pdf",
    title: "Certificado de análisis — Lote FECA-2026-006",
    date: "06/03/2026",
    product: "FECA Creatina Monohidrato 500 g",
    tests: commonTests,
  },
  {
    lot: "FECA-2026-007",
    filename: "FECA-2026-007.pdf",
    title: "Certificado de análisis — Lote FECA-2026-007",
    date: "17/03/2026",
    product: "FECA Creatina Monohidrato 300 g",
    tests: commonTests,
  },
  {
    lot: "FECA-2026-008",
    filename: "FECA-2026-008.pdf",
    title: "Certificado de análisis — Lote FECA-2026-008",
    date: "28/03/2026",
    product: "FECA Creatina Monohidrato 300 g",
    tests: commonTests,
  },
  {
    lot: "FECA-2026-009",
    filename: "FECA-2026-009.pdf",
    title: "Certificado de análisis — Lote FECA-2026-009",
    date: "09/04/2026",
    product: "FECA Creatina Monohidrato 500 g",
    tests: commonTests,
  },
  {
    lot: "FECA-2026-010",
    filename: "FECA-2026-010.pdf",
    title: "Certificado de análisis — Lote FECA-2026-010",
    date: "20/04/2026",
    product: "FECA Creatina Saborizada",
    tests: [
      { name: "Creatina (HPLC)", result: "≥ 99,8%", spec: "≥ 99,5%" },
      { name: "Aromatizantes naturales", result: "Conforme", spec: "Conforme" },
      { name: "Metales pesados", result: "Conforme", spec: "Ausencia" },
    ],
  },
  {
    lot: "FECA-2026-011",
    filename: "FECA-2026-011.pdf",
    title: "Certificado de análisis — Lote FECA-2026-011",
    date: "01/05/2026",
    product: "FECA Creatina Monohidrato 300 g",
    tests: commonTests,
  },
  {
    lot: "FECA-2026-012",
    filename: "FECA-2026-012.pdf",
    title: "Certificado de análisis — Lote FECA-2026-012",
    date: "12/05/2026",
    product: "FECA Creatina Monohidrato 500 g",
    tests: commonTests,
  },
];