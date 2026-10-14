import { expect, test, type Page } from "@playwright/test";

/** Devuelve todos los bloques JSON-LD de la página, aplanados. */
async function getJsonLd(page: Page): Promise<Record<string, unknown>[]> {
  const blobs = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const nodes: Record<string, unknown>[] = [];
  for (const blob of blobs) {
    const parsed = JSON.parse(blob);
    if (Array.isArray(parsed)) nodes.push(...parsed);
    else nodes.push(parsed);
  }
  return nodes;
}

const typesOf = (nodes: Record<string, unknown>[]) =>
  nodes.map((n) => String(n["@type"]));

test.describe("SEO — rastreo y datos estructurados", () => {
  test("robots.txt permite crawlers y declara el sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("Sitemap: https://feca.com.ar/sitemap.xml");
    expect(body).toContain("User-Agent: GPTBot");
    expect(body).toContain("Allow: /");
  });

  test("sitemap.xml incluye productos, artículos y lotes", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const xml = await res.text();
    for (const path of [
      "https://feca.com.ar/productos/creatina-monohidrato-300g",
      "https://feca.com.ar/creatina/que-es",
      "https://feca.com.ar/calidad/202604-013",
      "https://feca.com.ar/nosotros",
    ]) {
      expect(xml, `sitemap debería incluir ${path}`).toContain(path);
    }
  });

  test("los activos para agentes existen y son válidos", async ({ request }) => {
    for (const file of ["/llms.txt", "/llms-full.txt"]) {
      const res = await request.get(file);
      expect(res.status(), `${file}`).toBe(200);
      expect(await res.text()).toContain("# FECA");
    }

    // El índice curado enlaza la versión larga.
    const llms = await (await request.get("/llms.txt")).text();
    expect(llms).toContain("/llms-full.txt");

    // `llms-full.txt` lleva el cuerpo completo de los artículos (no solo el
    // resumen): debe incluir texto del cuerpo, una tabla, una FAQ y el lote.
    const full = await (await request.get("/llms-full.txt")).text();
    expect(full).toContain("Disolvé el polvo en un vaso de agua");
    expect(full).toContain("| Presentación | Servicios aproximados |");
    expect(full).toContain("#### Preguntas frecuentes");
    expect(full).toContain("Lote 202604-013");
    expect(full).toContain("Assay: 99,80%");

    const productos = await request.get("/productos.json");
    expect(productos.status()).toBe(200);
    const productosJson = await productos.json();
    expect(productosJson.products).toHaveLength(3);
    expect(productosJson.products[0]).toHaveProperty("url");
    expect(productosJson.currency).toBe("ARS");

    const lotes = await request.get("/lotes.json");
    expect(lotes.status()).toBe(200);
    const lotesJson = await lotes.json();
    expect(lotesJson.lots).toHaveLength(1);

    const lote = await request.get("/lotes/202604-013.json");
    expect(lote.status()).toBe(200);
    const loteJson = await lote.json();
    expect(loteJson.lot).toBe("202604-013");
    expect(Array.isArray(loteJson.tests)).toBeTruthy();
  });

  test("home emite Organization, WebSite y FAQPage", async ({ page }) => {
    await page.goto("/");
    const types = typesOf(await getJsonLd(page));
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    expect(types).toContain("FAQPage");
  });

  test("ficha de producto emite Product + Offer y breadcrumbs", async ({
    page,
  }) => {
    await page.goto("/productos/creatina-monohidrato-500g");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("500 g");

    const nodes = await getJsonLd(page);
    const product = nodes.find((n) => n["@type"] === "Product") as
      | Record<string, unknown>
      | undefined;
    expect(product).toBeTruthy();
    const offers = product?.offers as Record<string, unknown>;
    expect(offers.priceCurrency).toBe("ARS");
    expect(offers.price).toBe(43500);
    expect(nodes.some((n) => n["@type"] === "BreadcrumbList")).toBeTruthy();
  });

  test("artículo del hub emite Article y FAQPage", async ({ page }) => {
    await page.goto("/creatina/que-es");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const nodes = await getJsonLd(page);
    const types = typesOf(nodes);
    expect(types).toContain("Article");
    expect(types).toContain("FAQPage");
    expect(types).toContain("BreadcrumbList");

    // E-E-A-T: la autoría es institucional (FECA). No se inventan personas ni
    // credenciales; mientras no haya un revisor real, no hay `reviewedBy`.
    const article = nodes.find((n) => n["@type"] === "Article")!;
    const author = article.author as Record<string, unknown>;
    expect(author["@type"]).toBe("Organization");
    expect(author.name).toBe("FECA");
    expect(article.reviewedBy).toBeUndefined();
  });

  test("el hub de creatina lista los artículos enlazados", async ({ page }) => {
    await page.goto("/creatina");
    const links = page.locator('a[href^="/creatina/"]');
    expect(await links.count()).toBeGreaterThanOrEqual(12);
  });

  test("la página de lote muestra el análisis y su JSON-LD", async ({ page }) => {
    await page.goto("/calidad/202604-013");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Certificado"
    );
    await expect(page.getByText("202604-013").first()).toBeVisible();

    const types = typesOf(await getJsonLd(page));
    expect(types).toContain("Product");
    expect(types).toContain("BreadcrumbList");
  });

  test("la guía de precio muestra la tabla y su JSON-LD", async ({ page }) => {
    await page.goto("/precio-creatina-argentina");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Precio de la creatina"
    );

    // La tabla se deriva de la fuente única de productos: debe incluir las tres
    // presentaciones y su equivalencia por kilo.
    await expect(
      page.getByRole("columnheader", { name: "Por kilo" })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "1 kg" })).toBeVisible();

    const types = typesOf(await getJsonLd(page));
    expect(types).toContain("Article");
    expect(types).toContain("FAQPage");
    expect(types).toContain("BreadcrumbList");
  });

  test("páginas legales responden y son indexables", async ({ page }) => {
    for (const route of ["/nosotros", "/contacto", "/terminos", "/privacidad"]) {
      const res = await page.goto(route);
      expect(res?.status(), route).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });
});
