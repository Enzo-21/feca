import { expect, test } from "@playwright/test";

const PDF_HREF = "/ficha-tecnica/FECA-Ficha-Tecnica.pdf";

test.describe("Ficha técnica", () => {
  test("muestra el titular, el producto y una muestra de parámetros", async ({
    page,
  }) => {
    await page.goto("/ficha-tecnica");

    await expect(
      page.getByRole("heading", { level: 1, name: "Ficha técnica" })
    ).toBeVisible();

    await expect(
      page.getByText("Creatine Monohydrate 200 mesh", { exact: true })
    ).toBeVisible();

    for (const param of ["Assay", "Appearance", "Salmonella"]) {
      await expect(page.getByText(param, { exact: true })).toBeVisible();
    }
  });

  test("los enlaces de descarga apuntan al PDF en una pestaña nueva", async ({
    page,
  }) => {
    await page.goto("/ficha-tecnica");

    const pdfLinks = page.locator(`a[href="${PDF_HREF}"]`);
    const count = await pdfLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      const link = pdfLinks.nth(i);
      await expect(link).toHaveAttribute("href", PDF_HREF);
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("el PDF de la ficha técnica responde 200", async ({ request }) => {
    const res = await request.get(PDF_HREF);
    expect(res.ok(), `${PDF_HREF} no responde 200`).toBeTruthy();
  });

  test("el footer incluye el enlace a la ficha técnica", async ({ page }) => {
    await page.goto("/ficha-tecnica");

    await expect(
      page
        .locator("footer")
        .getByRole("link", { name: "Ficha técnica", exact: true })
        .first()
    ).toHaveAttribute("href", "/ficha-tecnica");
  });
});
