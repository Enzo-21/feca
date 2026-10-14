// Carga y normaliza los lotes desde `data/lotes/`.
//
// Estructura en disco (fuente de verdad, commiteada):
//
//   data/lotes/<LOT>/<LOT>.json    # JSON de análisis (formato del proveedor)
//   data/lotes/<LOT>/<LOT>.pdf     # (opcional) PDF del proveedor → página 2
//
// Regla: el nombre de la carpeta y del archivo `.json` deben ser `<LOT>`, y
// `<LOT>` debe coincidir con `product_information.batch_no` (o `lot`) del JSON.
// Si algo no cierra, tiramos un error claro y el build falla.
import { readdir, readFile, lstat } from "node:fs/promises";
import { join } from "node:path";
import { toIsoDate } from "./brand-pdf.mjs";

/** true solo para archivos regulares (rechaza symlinks → no leer fuera del repo). */
async function isRegularFile(path) {
  try {
    const st = await lstat(path);
    return st.isFile();
  } catch {
    return false;
  }
}

function deriveStatus(raw, conclusion) {
  const explicit = String(raw.status || "").toLowerCase();
  if (["approved", "rejected", "pending"].includes(explicit)) return explicit;
  const c = String(conclusion || "").toLowerCase();
  if (!c) return "pending";
  if (/unqualified|fail|reject|no conform/.test(c)) return "rejected";
  if (/qualified|conform|pass|ok|aprobad/.test(c)) return "approved";
  return "pending";
}

/**
 * Normaliza el JSON crudo (formato del proveedor) a un modelo interno estable.
 * `lotId` es el nombre de la carpeta; debe coincidir con el lote del JSON.
 */
export function adaptLot(raw, { lotId, rawMaterialPdf = null }) {
  if (!raw || typeof raw !== "object") {
    throw new Error(`El JSON del lote "${lotId}" no es un objeto válido.`);
  }
  const info = raw.product_information || {};
  const lot = String(info.batch_no || raw.lot || "").trim();
  if (!lot) {
    throw new Error(
      `El lote "${lotId}" no define product_information.batch_no (ni "lot").`
    );
  }
  if (lot !== lotId) {
    throw new Error(
      `El lote del JSON ("${lot}") no coincide con la carpeta ("${lotId}"). ` +
        `Renombrá la carpeta/archivo a "${lot}" o corregí batch_no.`
    );
  }

  const source = raw.analysis_results || raw.tests || [];
  if (!Array.isArray(source) || source.length === 0) {
    throw new Error(`El lote "${lotId}" no tiene resultados de análisis.`);
  }
  const tests = source.map((t, i) => {
    const name = t.item || t.name;
    if (!name) {
      throw new Error(`El lote "${lotId}" tiene una fila sin nombre (índice ${i}).`);
    }
    return {
      name: String(name),
      spec: String(t.specification ?? t.spec ?? ""),
      result: String(t.result ?? ""),
      method: String(t.analysis_method ?? t.method ?? ""),
    };
  });

  const analysisDate = toIsoDate(raw.date || raw.analysisDate);
  if (!analysisDate) {
    throw new Error(
      `El lote "${lotId}" no tiene una fecha de análisis válida ("date").`
    );
  }

  return {
    lot,
    product: String(info.product_name || raw.product || "").trim(),
    productSlug: raw.productSlug || null,
    company: String(raw.company_name || "").trim(),
    address: String(raw.company_address || "").trim(),
    analysisDate,
    manufactureDate: toIsoDate(info.manufacture_date || raw.manufacturingDate),
    expiryDate: toIsoDate(info.expiry_date || raw.expiryDate),
    quantity: String(info.quantity || "").trim(),
    packages: String(info.number_of_packages || "").trim(),
    packingSpec: String(info.packing_spec || "").trim(),
    countryOfOrigin: String(raw.country_of_origin || "").trim(),
    remark: String(raw.remark || "").trim(),
    conclusion: String(raw.conclusion || "").trim(),
    status: deriveStatus(raw, raw.conclusion),
    analyst: String(raw.analyst || "").trim(),
    responsible: String(raw.person_responsible_for_quality || "").trim(),
    tests,
    rawMaterialPdf,
    demo: raw.demo === true,
    notes: raw.notes ? String(raw.notes) : "",
  };
}

/** Lee todos los lotes de `lotesDir`, ordenados por fecha (desc) y lote (asc). */
export async function loadLots(lotesDir) {
  let entries;
  try {
    entries = await readdir(lotesDir, { withFileTypes: true });
  } catch {
    return [];
  }
  const folders = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => e.name)
    .sort();

  const lots = [];
  for (const lotId of folders) {
    const dir = join(lotesDir, lotId);
    const jsonPath = join(dir, `${lotId}.json`);
    if (!(await isRegularFile(jsonPath))) {
      throw new Error(
        `Falta el JSON del lote "${lotId}": esperaba ${jsonPath}. ` +
          `El archivo debe llamarse igual que la carpeta (<LOT>.json).`
      );
    }
    let raw;
    try {
      raw = JSON.parse(await readFile(jsonPath, "utf8"));
    } catch (err) {
      throw new Error(`JSON inválido en ${jsonPath}: ${err.message}`);
    }
    const pdfPath = join(dir, `${lotId}.pdf`);
    const rawMaterialPdf = (await isRegularFile(pdfPath)) ? `${lotId}.pdf` : null;
    lots.push(adaptLot(raw, { lotId, rawMaterialPdf }));
  }

  lots.sort((a, b) =>
    a.analysisDate === b.analysisDate
      ? a.lot.localeCompare(b.lot)
      : b.analysisDate.localeCompare(a.analysisDate)
  );
  return lots;
}
