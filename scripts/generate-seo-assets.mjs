#!/usr/bin/env node
// Generador de activos SEO / agentes (corre en `prebuild` / `predev`).
//
//  1. public/productos.json      → catálogo para agentes
//  2. public/lotes.json          → índice de certificados
//  3. public/lotes/<LOT>.json    → detalle por lote
//  4. public/llms.txt            → resumen para LLMs (spec llms.txt)
//  5. public/llms-full.txt       → versión extendida
//
// JavaScript puro: reutiliza la fuente de verdad del sitio (productos, lotes y
// artículos). Los `.ts` se importan con el type-stripping nativo de Node; los
// `import type` se eliminan, por eso alcanza con resolver a `.ts`.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { products } from "../src/lib/products.ts";
import { articles } from "../src/content/creatina/articles.ts";
import { loadLots } from "./lib/lots.mjs";
import { formatDecimalComma } from "./lib/brand-pdf.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const LOTES_DIR = join(ROOT, "data/lotes");
const PUBLIC_DIR = join(ROOT, "public");
const LOTES_OUT_DIR = join(PUBLIC_DIR, "lotes");

const SITE_URL = (process.env.SITE_URL ?? "https://feca.com.ar").replace(/\/$/, "");
const SITE_NAME = "FECA";
const WHATSAPP = "+5493516195674";

const url = (path) => `${SITE_URL}${path}`;

function productEntry(product) {
  return {
    slug: product.slug,
    name: `${product.name} ${product.size}`,
    size: product.size,
    grams: product.grams,
    servings: product.servings,
    price: product.price,
    currency: "ARS",
    pricePerKg: Math.round(product.price / (product.grams / 1000)),
    description: product.description,
    url: url(`/productos/${product.slug}`),
    image: url(product.image),
    purity: "≥ 99,5 % (HPLC)",
    form: "Creatina monohidrato 200 mesh",
    origin: "China",
    brand: SITE_NAME,
  };
}

function lotEntry(lot) {
  return {
    lot: lot.lot,
    product: lot.product,
    analysisDate: lot.analysisDate,
    status: lot.status,
    demo: lot.demo,
    certificateUrl: url(`/calidad/${lot.lot}`),
    coaPdfUrl: url(`/certificados/${lot.lot}.pdf`),
    tests: lot.tests.map((test) => ({
      name: test.name,
      spec: formatDecimalComma(test.spec),
      result: formatDecimalComma(test.result),
      method: test.method,
    })),
  };
}

function buildLlmsTxt(lots) {
  const productLines = products
    .map(
      (product) =>
        `- [${product.name} ${product.size}](${url(`/productos/${product.slug}`)}): AR$${product.price} · ${product.servings} servicios · pureza ≥ 99,5 %.`
    )
    .join("\n");

  const lotLines = lots
    .map(
      (lot) =>
        `- [Certificado lote ${lot.lot}](${url(`/calidad/${lot.lot}`)}): ${lot.product}, analizado el ${lot.analysisDate}, estado ${lot.status}.`
    )
    .join("\n");

  const articleLines = articles
    .map(
      (article) =>
        `- [${article.title}](${url(`/creatina/${article.slug}`)}): ${article.description}`
    )
    .join("\n");

  return `# ${SITE_NAME}

> ${SITE_NAME} es una marca argentina de creatina monohidrato 200 mesh, pura y trazable. Cada lote cuenta con un certificado de análisis público y verificable. Precio en pesos argentinos (ARS). Compra coordinada por WhatsApp.

## Productos
${productLines}

## Calidad
- [Verificar un lote](${url("/calidad")}): ingresá el número de lote del envase y accedé a su certificado de análisis.
- [Ficha técnica](${url("/ficha-tecnica")}): especificaciones completas, origen y almacenamiento.
${lotLines}

## Aprender sobre creatina
- [Hub de contenido](${url("/creatina")}): guías basadas en evidencia.
${articleLines}

## Contacto

- WhatsApp: ${WHATSAPP}
- Calidad: ${url("/calidad")}
- Ficha técnica: ${url("/ficha-tecnica")}

## Optional

- [Contenido completo](${url("/llms-full.txt")}): texto íntegro de las guías, resultados de laboratorio por lote y precios.
`;
}

// Convierte los bloques tipados de un artículo a Markdown, para que
// `llms-full.txt` lleve el contenido real (no solo el resumen).
function renderBlocks(blocks, headingShift = 0) {
  const hash = (level) => "#".repeat(level + headingShift);
  return blocks
    .map((block) => {
      switch (block.type) {
        case "h2":
          return `${hash(2)} ${block.text}`;
        case "h3":
          return `${hash(3)} ${block.text}`;
        case "p":
          return block.text;
        case "ul":
          return block.items.map((item) => `- ${item}`).join("\n");
        case "ol":
          return block.items.map((item, i) => `${i + 1}. ${item}`).join("\n");
        case "table": {
          const head = `| ${block.head.join(" | ")} |`;
          const sep = `| ${block.head.map(() => "---").join(" | ")} |`;
          const rows = block.rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
          const caption = block.caption ? `\n\n_${block.caption}_` : "";
          return `${head}\n${sep}\n${rows}${caption}`;
        }
        case "callout": {
          const title = block.title ? `**${block.title}.** ` : "";
          return `> ${title}${block.text}`;
        }
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

function buildLlmsFullTxt(lots) {
  const productsFull = products
    .map((product) => {
      const entry = productEntry(product);
      return [
        `### ${entry.name}`,
        `- URL: ${entry.url}`,
        `- Precio: AR$${entry.price} (${entry.currency})`,
        `- Precio por kg: AR$${entry.pricePerKg}`,
        `- Servicios (a 5 g): ${entry.servings}`,
        `- Pureza: ${entry.purity}`,
        `- Forma: ${entry.form}`,
        `- Origen: ${entry.origin}`,
        `- Descripción: ${entry.description}`,
      ].join("\n");
    })
    .join("\n\n");

  const lotsFull = lots
    .map((lot) => {
      const tests = lot.tests
        .map(
          (test) =>
            `  - ${test.name}: ${formatDecimalComma(test.result)} (spec ${formatDecimalComma(test.spec)}${test.method ? `, ${test.method}` : ""})`
        )
        .join("\n");
      return [
        `### Lote ${lot.lot} — ${lot.product}`,
        `- Fecha de análisis: ${lot.analysisDate}`,
        `- Estado: ${lot.status}`,
        `- Certificado: ${url(`/calidad/${lot.lot}`)}`,
        `- PDF: ${url(`/certificados/${lot.lot}.pdf`)}`,
        `- Resultados:`,
        tests,
      ].join("\n");
    })
    .join("\n\n");

  const articlesFull = articles
    .map((article) => {
      const faqs = article.faqs.length
        ? [
            "#### Preguntas frecuentes",
            ...article.faqs.map((faq) => `**${faq.question}**\n\n${faq.answer}`),
          ].join("\n\n")
        : "";
      const meta = [
        `- URL: ${url(`/creatina/${article.slug}`)}`,
        `- Actualizado: ${article.updated}`,
        `- Intención: ${article.intent}`,
        `- Tiempo de lectura: ${article.readingMinutes} min`,
      ].join("\n");
      return [
        `### ${article.title}`,
        meta,
        `**Respuesta directa:** ${article.intro}`,
        renderBlocks(article.blocks, 2),
        faqs,
      ]
        .filter((part) => part && part.length > 0)
        .join("\n\n");
    })
    .join("\n\n---\n\n");

  return `# ${SITE_NAME} — contenido completo para agentes

## Productos

${productsFull}

## Certificados de análisis

${lotsFull}

## Guías sobre creatina

${articlesFull}

## Contacto

- WhatsApp: ${WHATSAPP}
- Calidad: ${url("/calidad")}
- Ficha técnica: ${url("/ficha-tecnica")}
`;
}

async function main() {
  const lots = await loadLots(LOTES_DIR);
  console.log(
    `[seo] ${products.length} producto(s), ${lots.length} lote(s), ${articles.length} artículo(s).`
  );

  await mkdir(LOTES_OUT_DIR, { recursive: true });

  const productFiles = products.map(productEntry);
  await writeFile(
    join(PUBLIC_DIR, "productos.json"),
    JSON.stringify({ brand: SITE_NAME, currency: "ARS", products: productFiles }, null, 2) + "\n"
  );
  console.log(`[seo] public/productos.json (${productFiles.length})`);

  const lotFiles = lots.map(lotEntry);
  await writeFile(
    join(PUBLIC_DIR, "lotes.json"),
    JSON.stringify({ brand: SITE_NAME, lots: lotFiles }, null, 2) + "\n"
  );
  for (const entry of lotFiles) {
    // Barandilla: el nombre del lote viene de un nombre de carpeta; nunca
    // debería permitir salir del directorio de salida.
    if (!/^[A-Za-z0-9._-]+$/.test(entry.lot) || entry.lot.includes("..")) {
      throw new Error(`Lote con nombre inválido: "${entry.lot}".`);
    }
    await writeFile(
      join(LOTES_OUT_DIR, `${entry.lot}.json`),
      JSON.stringify(entry, null, 2) + "\n"
    );
  }
  console.log(`[seo] public/lotes.json + public/lotes/*.json (${lotFiles.length})`);

  await writeFile(join(PUBLIC_DIR, "llms.txt"), buildLlmsTxt(lots));
  await writeFile(join(PUBLIC_DIR, "llms-full.txt"), buildLlmsFullTxt(lots));
  console.log("[seo] public/llms.txt + public/llms-full.txt");
}

main().catch((err) => {
  console.error(`\n[seo] ERROR: ${err.message}\n`);
  process.exit(1);
});
