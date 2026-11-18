#!/usr/bin/env node
// Generador de las imágenes sociales (Open Graph / Twitter).
//
//   npm run og
//
// Renderiza una tarjeta HTML con Chromium (Playwright) y la guarda en
// `public/icons/`. NO corre en el `prebuild`: Vercel no trae Chromium, así que
// las imágenes se generan a mano y se commitean.
//
// Reglas de la tarjeta (para que se vea bien en Instagram, WhatsApp, iMessage,
// Facebook, LinkedIn, X, Slack, Telegram y Discord):
//  - Texto grande: la tarjeta se muestra a ~350 px de ancho en el celular.
//  - Nada importante a menos de ~60 px de los bordes (X recorta a 2:1 y varias
//    apps redondean las esquinas).
//  - JPEG liviano (< 300 KB): WhatsApp no muestra la vista previa grande si la
//    imagen pesa más.
//  - Si cambia el diseño, cambiar también el nombre del archivo (`OG_VERSION`)
//    para que Facebook/Instagram/WhatsApp no sigan mostrando la versión en caché.
import { readFile, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const FONTS = join(ROOT, "assets/fonts");

export const OG_VERSION = "2";

const outputs = [
  { file: `public/icons/og-v${OG_VERSION}.jpg`, width: 1200, height: 630 },
  { file: `public/icons/og-twitter-v${OG_VERSION}.jpg`, width: 1200, height: 675 },
];

const dataUri = async (path, mime) =>
  `data:${mime};base64,${(await readFile(path)).toString("base64")}`;

// Mismos puntos/paths que `src/components/logo.tsx` (no redibujar).
const logoMark = `
<svg viewBox="76.7 76.5 146.6 147" class="mark" aria-hidden="true">
  <g fill="#ffffff">
    <polygon points="108.06 217.31 96.22 205.47 151.91 149.78 96.36 94.23 108.2 82.39 175.59 149.78 108.06 217.31"/>
    <polygon points="158.71 85.17 149.95 76.47 130.07 96.36 141.92 108.22 150 100.14 199.63 149.78 150 199.41 141.92 191.33 130.09 203.17 141.2 214.29 150 223.53 158.8 214.29 223.31 149.78 158.71 85.17"/>
    <polygon points="100.37 149.78 122.19 127.95 110.34 116.1 76.69 149.78 110.35 183.44 122.19 171.6 100.37 149.78"/>
  </g>
</svg>`;

const wordmark = `
<svg viewBox="27 178 246 53" class="wordmark" aria-hidden="true">
  <g fill="#ffffff">
    <path d="M27.32,230.14l19.52-51.04h54.54l-3.55,9.28h-43.12l-5.4,14.13h37.55l-3.55,9.28h-37.55l-7.01,18.35h-11.42Z"/>
    <path d="M89.71,230.14l19.52-51.04h55.97l-3.55,9.28h-44.54l-4.31,11.28h40.4l-3.55,9.28h-40.4l-4.56,11.92h44.54s-3.55,9.28-3.55,9.28h-55.97Z"/>
    <path d="M179.67,230.5c-9.42,0-15.8-2.18-19.13-6.53-3.33-4.36-3.36-10.81-.08-19.38,3.26-8.52,8.22-14.97,14.89-19.35,6.67-4.38,14.71-6.54,24.11-6.5l25.64.14-3.49,9.14h-24.91c-6.19,0-11.28,1.31-15.28,3.93-4,2.62-7.11,6.83-9.33,12.64-2.22,5.81-2.34,10.03-.35,12.67,1.99,2.64,6.08,3.96,12.26,3.96h25.63l-3.55,9.28h-26.41Z"/>
    <path d="M209.07,230.14l42.5-51.04h17.63l3.47,51.04h-12.42l-.73-10.78h-29.05l-8.98,10.78h-12.42ZM238.16,210.09h20.77l-1.49-22.06h-.93l-18.36,22.06Z"/>
  </g>
</svg>`;

async function html({ width, height }) {
  const font = (weight) => dataUri(join(FONTS, `Montserrat-${weight}.ttf`), "font/ttf");
  const photo = await dataUri(
    join(ROOT, "public/images/producto-creatina-1kg-1x1.jpg"),
    "image/jpeg"
  );
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: Montserrat; font-weight: 500; src: url(${await font(500)}); }
  @font-face { font-family: Montserrat; font-weight: 600; src: url(${await font(600)}); }
  @font-face { font-family: Montserrat; font-weight: 800; src: url(${await font(800)}); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${width}px; height: ${height}px; overflow: hidden; }
  body {
    display: flex;
    font-family: Montserrat, sans-serif;
    background: #ebebeb;
    -webkit-font-smoothing: antialiased;
  }
  .panel {
    position: relative;
    width: 620px;
    height: 100%;
    padding: 0 0 0 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #cc5e21;
    color: #ffffff;
    overflow: hidden;
  }
  /* Isotipo gigante de fondo, apenas visible. */
  .panel .ghost {
    position: absolute;
    right: -150px;
    bottom: -120px;
    width: 460px;
    height: 460px;
    opacity: 0.08;
  }
  .panel .ghost .mark { width: 100%; height: 100%; }
  .brand { display: flex; align-items: center; gap: 18px; }
  .mark { width: 74px; height: 74px; }
  .wordmark { height: 40px; width: auto; }
  .eyebrow {
    margin-top: 40px;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.24em;
    color: rgba(255, 255, 255, 0.85);
  }
  h1 {
    margin-top: 14px;
    font-size: 64px;
    line-height: 1.02;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .sub {
    margin-top: 26px;
    font-size: 27px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.92);
  }
  .url {
    margin-top: 34px;
    display: inline-flex;
    align-self: flex-start;
    padding: 12px 22px;
    border-radius: 999px;
    background: #ffffff;
    color: #3f4140;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.01em;
  }
  .photo {
    flex: 1;
    background: #ececec url(${photo}) center / cover no-repeat;
  }
</style></head>
<body>
  <section class="panel">
    <div class="ghost">${logoMark}</div>
    <div class="brand">${logoMark}${wordmark}</div>
    <p class="eyebrow">IMPULSA TU RUTINA</p>
    <h1>Creatina<br>monohidrato pura</h1>
    <p class="sub">Certificada lote a lote · 200 mesh</p>
    <p class="url">creatinafeca.com.ar</p>
  </section>
  <div class="photo"></div>
</body></html>`;
}

const browser = await chromium.launch();
try {
  for (const out of outputs) {
    const page = await browser.newPage({
      viewport: { width: out.width, height: out.height },
      deviceScaleFactor: 1,
    });
    await page.setContent(await html(out), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const path = join(ROOT, out.file);
    await page.screenshot({ path, type: "jpeg", quality: 88 });
    await page.close();
    const { size } = await stat(path);
    console.log(`✓ ${out.file} (${out.width}×${out.height}, ${Math.round(size / 1024)} KB)`);
    if (size > 300 * 1024) {
      throw new Error(`${out.file} pesa más de 300 KB: WhatsApp no mostraría la vista previa grande.`);
    }
  }
} finally {
  await browser.close();
}
