import { expect, test } from "@playwright/test";

const TOTAL = 13; // 12 lotes de ejemplo + 1 lote real (202604-013)

test.describe("Calidad — certificados", () => {
  test(`muestra los ${TOTAL} certificados por defecto`, async ({ page }) => {
    await page.goto("/calidad");

    await expect(page.getByRole("heading", { name: "Calidad" })).toBeVisible();
    await expect(
      page.getByText(`${TOTAL} certificados encontrados`, { exact: true })
    ).toBeVisible();
    await expect(page.locator("article")).toHaveCount(TOTAL);
  });

  test("filtra por número de lote en vivo", async ({ page }) => {
    await page.goto("/calidad");

    await page.getByLabel("Buscar por número de lote").fill("FECA-2026-003");

    await expect(
      page.getByText("1 certificado encontrado", { exact: true })
    ).toBeVisible();
    await expect(page.locator("article")).toHaveCount(1);
    await expect(page.getByText("FECA-2026-003", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Limpiar" }).click();
    await expect(
      page.getByText(`${TOTAL} certificados encontrados`, { exact: true })
    ).toBeVisible();
  });

  test("busca también por producto", async ({ page }) => {
    await page.goto("/calidad");

    await page.getByLabel("Buscar por número de lote").fill("Saborizada");

    await expect(page.locator("article")).toHaveCount(2);
    for (const lot of ["FECA-2026-005", "FECA-2026-010"]) {
      await expect(page.getByText(lot, { exact: true })).toBeVisible();
    }
  });

  test("lote inválido muestra estado vacío", async ({ page }) => {
    await page.goto("/calidad");

    await page.getByLabel("Buscar por número de lote").fill("gdfg");

    await expect(page.getByText("No encontramos ese lote")).toBeVisible();
    await expect(page.locator("article")).toHaveCount(0);
    await expect(
      page.getByText("0 certificados encontrados", { exact: true })
    ).toBeVisible();
  });

  test("query ?lote= pre-carga el buscador y arma el enlace PDF", async ({
    page,
  }) => {
    await page.goto("/calidad?lote=FECA-2026-001");

    await expect(page.getByLabel("Buscar por número de lote")).toHaveValue(
      "FECA-2026-001"
    );
    await expect(
      page.getByText("1 certificado encontrado", { exact: true })
    ).toBeVisible();

    const pdf = page.getByRole("link", { name: "Descargar certificado PDF" });
    await expect(pdf).toHaveAttribute(
      "href",
      "/certificados/FECA-2026-001.pdf"
    );
    await expect(pdf).toHaveAttribute("target", "_blank");
  });

  test("el lote real incluye el certificado de materia prima (2 páginas)", async ({
    page,
  }) => {
    await page.goto("/calidad?lote=202604-013");

    await expect(page.getByText("202604-013", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Creatine Monohydrate 200 Mesh", { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText(/Incluye el certificado de materia prima del proveedor/)
    ).toBeVisible();

    const pdf = page.getByRole("link", { name: "Descargar certificado PDF" });
    await expect(pdf).toHaveAttribute("href", "/certificados/202604-013.pdf");
  });

  test("los PDFs de certificados existen", async ({ page, request }) => {
    await page.goto("/calidad");

    const links = await page
      .locator('a[href^="/certificados/"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href") as string));

    expect(links).toHaveLength(TOTAL);

    for (const href of links) {
      const res = await request.get(href);
      expect(res.ok(), `${href} no responde 200`).toBeTruthy();
    }
  });
});
