#!/usr/bin/env node
// Generador de documentos de marca FECA (corre en `prebuild` / `predev`).
//
//  1. Ficha Técnica  → public/ficha-tecnica/FECA-Ficha-Tecnica.pdf
//  2. Por cada lote  → public/certificados/<LOT>.pdf
//        - página 1: CoA de marca (generado desde el JSON)
//        - página 2: PDF de materia prima del proveedor (si existe)
//  3. Índice         → src/lib/certificates.generated.ts
//
// Todo es JavaScript puro (react-pdf + pdf-lib): no requiere Chromium, por lo
// que corre en el build de Vercel. Las fuentes son locales (`assets/fonts`).
//
// Flags: `--check` (solo valida y sale), `--only=ficha|certificados`.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";

import technicalSheet from "../src/lib/technical_sheet.ts";
import { buildFichaDocument } from "./lib/ficha.mjs";
import { buildCoaDocument } from "./lib/coa.mjs";
import { loadLots } from "./lib/lots.mjs";
import { formatDecimalComma, formatDisplayDate } from "./lib/brand-pdf.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const LOTES_DIR = join(ROOT, "data/lotes");
const CERTS_DIR = join(ROOT, "public/certificados");
const FICHA_OUT = join(ROOT, "public/ficha-tecnica/FECA-Ficha-Tecnica.pdf");
const INDEX_OUT = join(ROOT, "src/lib/certificates.generated.ts");

const args = process.argv.slice(2);
const CHECK_ONLY = args.includes("--check");
const ONLY = (args.find((a) => a.startsWith("--only=")) || "").split("=")[1] || null;

async function renderFicha() {
  const buffer = await renderToBuffer(buildFichaDocument(technicalSheet));
  await mkdir(dirname(FICHA_OUT), { recursive: true });
  await writeFile(FICHA_OUT, buffer);
  return { path: FICHA_OUT, bytes: buffer.length };
}

/**
 * Renderiza el CoA y, si hay PDF de materia prima, lo anexa como página 2.
 * Devuelve el buffer final y la cantidad de páginas.
 */
async function renderCoa(lot) {
  const ourBuffer = await renderToBuffer(
    buildCoaDocument(lot, { pageLabel: lot.rawMaterialPdf ? "Página 1 de 2" : "Página 1" })
  );

  if (!lot.rawMaterialPdf) {
    const doc = await PDFDocument.load(ourBuffer);
    return { buffer: ourBuffer, pageCount: doc.getPageCount() };
  }

  const rawPath = join(LOTES_DIR, lot.lot, lot.rawMaterialPdf);
  const { readFile } = await import("node:fs/promises");
  const rawBytes = await readFile(rawPath);
  // Guardas ante un PDF de proveedor malformado o desmedido (entrada no confiable).
  const MAX_BYTES = 25 * 1024 * 1024;
  const MAX_PAGE_COUNT = 25;
  if (rawBytes.length > MAX_BYTES) {
    throw new Error(
      `El PDF de materia prima de "${lot.lot}" supera ${MAX_BYTES / 1024 / 1024} MB.`
    );
  }
  const raw = await PDFDocument.load(rawBytes);
  if (raw.getPageCount() > MAX_PAGE_COUNT) {
    throw new Error(
      `El PDF de materia prima de "${lot.lot}" tiene demasiadas páginas (${raw.getPageCount()} > ${MAX_PAGE_COUNT}).`
    );
  }

  const merged = await PDFDocument.create();
  merged.setTitle(`Certificado de análisis — Lote ${lot.lot}`);
  merged.setAuthor("FECA");
  merged.setSubject(`Certificado de análisis del lote ${lot.lot}`);
  const fixedDate = new Date(`${lot.analysisDate}T00:00:00Z`);
  merged.setCreationDate(fixedDate);
  merged.setModificationDate(fixedDate);

  const ours = await PDFDocument.load(ourBuffer);
  for (const p of await merged.copyPages(ours, ours.getPageIndices())) merged.addPage(p);
  for (const p of await merged.copyPages(raw, raw.getPageIndices())) merged.addPage(p);

  const bytes = await merged.save();
  return { buffer: Buffer.from(bytes), pageCount: merged.getPageCount() };
}

function toCertificateEntry(lot, pageCount) {
  return {
    lot: lot.lot,
    filename: `${lot.lot}.pdf`,
    title: `Certificado de análisis — Lote ${lot.lot}`,
    date: formatDisplayDate(lot.analysisDate),
    product: lot.product,
    status: lot.status,
    demo: lot.demo,
    pageCount,
    rawMaterialFilename: lot.rawMaterialPdf,
    tests: lot.tests.map((t) => ({
      name: t.name,
      result: formatDecimalComma(t.result),
      spec: formatDecimalComma(t.spec),
      method: t.method,
    })),
  };
}

function renderIndex(entries) {
  const body = JSON.stringify(entries, null, 2);
  return `// ARCHIVO GENERADO AUTOMÁTICAMENTE por scripts/generate-documentos.mjs
// NO editar a mano: se regenera en \`prebuild\`/\`predev\`.
// Fuente: data/lotes/<LOT>/<LOT>.json
import type { Certificate } from "./certificates";

export const certificates: Certificate[] = ${body};
`;
}

async function main() {
  console.log("[documentos] Cargando lotes desde data/lotes …");
  const lots = await loadLots(LOTES_DIR);
  console.log(`[documentos] ${lots.length} lote(s) válido(s).`);

  if (CHECK_ONLY) {
    for (const lot of lots) {
      console.log(`  ✓ ${lot.lot} — ${lot.product} (${lot.tests.length} análisis)`);
    }
    console.log("[documentos] --check OK.");
    return;
  }

  const entries = [];

  if (!ONLY || ONLY === "ficha") {
    const ficha = await renderFicha();
    console.log(`[documentos] Ficha técnica: ${ficha.path} (${ficha.bytes} bytes)`);
  }

  if (!ONLY || ONLY === "certificados") {
    await mkdir(CERTS_DIR, { recursive: true });
    for (const lot of lots) {
      const { buffer, pageCount } = await renderCoa(lot);
      const out = join(CERTS_DIR, `${lot.lot}.pdf`);
      await writeFile(out, buffer);
      entries.push(toCertificateEntry(lot, pageCount));
      console.log(
        `[documentos] CoA ${lot.lot}: ${out} (${pageCount} pág., ${buffer.length} bytes)`
      );
    }
    await writeFile(INDEX_OUT, renderIndex(entries), "utf8");
    console.log(`[documentos] Índice: ${INDEX_OUT} (${entries.length} entradas)`);
  }
}

main().catch((err) => {
  console.error(`\n[documentos] ERROR: ${err.message}\n`);
  process.exit(1);
});
