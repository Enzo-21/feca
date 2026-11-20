#!/usr/bin/env node
// Chequeo de "dev time errors":
//
//   npm run check:dev
//
// Levanta `next dev`, recorre todas las URLs del sitemap (más algunas rutas con
// query) y falla si aparece cualquier error o warning: en la consola del
// navegador, como excepción de la página, como respuesta >= 400 o en la salida
// del servidor de desarrollo. Complementa a `e2e/console.spec.ts`, que mira el
// build de producción (donde React y Next no muestran sus warnings de dev).
//
// Es un trabajo pesado (ver AGENTS.md): correr `scripts/cloud/heavy-check.sh` antes.
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3130);
const BASE = `http://localhost:${PORT}`;
const EXTRA_ROUTES = ["/calidad?lote=202604-013"];

const problems = [];
const serverLog = [];

// `npm run dev` (no `next dev` directo) para incluir también el `predev`.
const server = spawn("npm", ["run", "dev", "--", "-p", String(PORT)], {
  env: { ...process.env, FORCE_COLOR: "0", NEXT_TELEMETRY_DISABLED: "1" },
  stdio: ["ignore", "pipe", "pipe"],
  detached: true,
});
for (const stream of [server.stdout, server.stderr]) {
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    for (const line of chunk.split("\n")) {
      if (line.trim()) serverLog.push(line);
    }
  });
}

async function waitForServer() {
  for (let i = 0; i < 240; i++) {
    try {
      const res = await fetch(`${BASE}/sitemap.xml`);
      if (res.ok) return res.text();
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`next dev no respondió en ${BASE}`);
}

let browser;
try {
  const sitemap = await waitForServer();
  const routes = [
    ...new Set(
      [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
    ),
    ...EXTRA_ROUTES,
  ];

  browser = await chromium.launch();
  const page = await browser.newPage();
  let route = "";
  page.on("console", (msg) => {
    if (["error", "warning"].includes(msg.type())) {
      problems.push(`${route} console.${msg.type()}: ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => problems.push(`${route} pageerror: ${err.message}`));
  page.on("response", (res) => {
    if (res.status() >= 400) problems.push(`${route} HTTP ${res.status()}: ${res.url()}`);
  });

  for (route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    // Deja correr efectos y animaciones de entrada (warnings de hidratación, etc.).
    await page.waitForTimeout(500);
    console.log(`· ${route}`);
  }

  const serverProblems = serverLog.filter((line) =>
    /warn|error|⚠|⨯|deprecat|fail/i.test(line)
  );
  problems.push(...serverProblems.map((line) => `server: ${line.trim()}`));
  console.log(`\n${routes.length} rutas recorridas en modo dev.`);
} finally {
  await browser?.close();
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {}
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} problema(s):\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("✓ Sin errores ni warnings en modo dev.");
