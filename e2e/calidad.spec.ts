import { expect, test } from "@playwright/test";

const LOT = "202604-013";
const TOTAL = 1; // único lote real cargado

test.describe("Calidad — certificados", () => {
  test(`muestra los ${TOTAL} certificados por defecto`, async ({ page }) => {
    await page.goto("/calidad");

    await expect(page.getByRole("heading", { name: "Calidad" })).toBeVisible();
    await expect(
      page.getByText(`${TOTAL} certificado encontrado`, { exact: true })
    ).toBeVisible();
    await expect(page.locator("article")).toHaveCount(TOTAL);
    await expect(page.getByText(LOT, { exact: true })).toBeVisible();
  });

  test("filtra por número de lote en vivo", async ({ page }) => {
    await page.goto("/calidad");

    await page.getByLabel("Buscar por número de lote").fill("2026");
    await expect(
      page.getByText(`${TOTAL} certificado encontrado`, { exact: true })
    ).toBeVisible();

    await page.getByLabel("Buscar por número de lote").fill("9999");
    await expect(
      page.getByText("0 certificados encontrados", { exact: true })
    ).toBeVisible();
    await expect(page.locator("article")).toHaveCount(0);
  });

  test("busca por nombre de producto", async ({ page }) => {
    await page.goto("/calidad");

    await page.getByLabel("Buscar por número de lote").fill("Creatine");
    await expect(page.getByText(LOT, { exact: true })).toBeVisible();
    await expect(page.locator("article")).toHaveCount(TOTAL);
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
    await page.goto(`/calidad?lote=${LOT}`);

    await expect(page.getByLabel("Buscar por número de lote")).toHaveValue(LOT);
    await expect(
      page.getByText(`${TOTAL} certificado encontrado`, { exact: true })
    ).toBeVisible();

    const pdf = page.getByRole("link", { name: "Descargar certificado PDF" });
    await expect(pdf).toHaveAttribute("href", `/certificados/${LOT}.pdf`);
    await expect(pdf).toHaveAttribute("target", "_blank");
  });

  test("el lote real incluye el certificado de materia prima (2 páginas)", async ({
    page,
  }) => {
    await page.goto(`/calidad?lote=${LOT}`);

    await expect(page.getByText(LOT, { exact: true })).toBeVisible();
    await expect(
      page.getByText("Creatine Monohydrate 200 Mesh", { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText(/Incluye el certificado de materia prima del proveedor/)
    ).toBeVisible();

    const pdf = page.getByRole("link", { name: "Descargar certificado PDF" });
    await expect(pdf).toHaveAttribute("href", `/certificados/${LOT}.pdf`);
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
