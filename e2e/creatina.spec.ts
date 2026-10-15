import { expect, test, type Page } from "@playwright/test";

/** Sufijo que Next agrega al `<title>` de cada página (ver layout.tsx). */
const SITE_SUFFIX = " | FECA®";

/** Quita el sufijo del sitio del `<title>` de una página. */
function stripSiteSuffix(title: string): string {
  return title.endsWith(SITE_SUFFIX)
    ? title.slice(0, -SITE_SUFFIX.length)
    : title;
}

/** Tarjetas de "Seguí leyendo": texto visible y href de cada una. */
async function getRelatedCards(
  page: Page
): Promise<{ text: string; href: string }[]> {
  const section = page.locator("section", {
    has: page.getByRole("heading", { name: "Seguí leyendo", exact: true }),
  });
  await expect(section).toBeVisible();

  const links = section.locator("a");
  const count = await links.count();
  const cards: { text: string; href: string }[] = [];
  for (let i = 0; i < count; i++) {
    const link = links.nth(i);
    cards.push({
      text: ((await link.textContent()) ?? "").trim(),
      href: (await link.getAttribute("href")) ?? "",
    });
  }
  return cards;
}

const ARTICLES = [
  "/creatina/que-es",
  "/creatina/cuanta-tomar",
  "/creatina/creatina-monohidrato",
];

test.describe("Hub de creatina — Seguí leyendo", () => {
  for (const path of ARTICLES) {
    test(`en ${path} cada tarjeta muestra el título de su propio artículo`, async ({
      page,
    }) => {
      await page.goto(path);

      const cards = await getRelatedCards(page);

      // Hay al menos dos artículos relacionados.
      expect(cards.length).toBeGreaterThanOrEqual(2);

      // Ni los destinos ni los textos se repiten.
      const hrefs = cards.map((card) => card.href);
      const texts = cards.map((card) => card.text);
      expect(new Set(hrefs).size).toBe(hrefs.length);
      expect(new Set(texts).size).toBe(texts.length);

      // Ninguna tarjeta enlaza al artículo actual.
      expect(hrefs).not.toContain(path);

      // Regresión: el título del artículo actual no aparece como texto de una
      // tarjeta (antes todas repetían el `metaTitle` de la página actual).
      const ownTitle = stripSiteSuffix(await page.title());
      expect(texts).not.toContain(ownTitle);
    });
  }

  test("cada tarjeta coincide con el título de la página a la que enlaza", async ({
    page,
    request,
  }) => {
    await page.goto("/creatina/que-es");

    const cards = await getRelatedCards(page);
    const card = cards[0];

    const res = await request.get(card.href);
    expect(res.status()).toBe(200);

    const html = await res.text();
    const match = html.match(/<title>([^<]*)<\/title>/);
    expect(match, `la página ${card.href} debería tener <title>`).toBeTruthy();

    const targetTitle = stripSiteSuffix(match![1]);
    expect(card.text).toBe(targetTitle);
  });
});
