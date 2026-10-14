import { expect, test } from "@playwright/test";

test.describe("Estabilidad global", () => {
  test("no hay errores de consola ni excepciones al recorrer el sitio", async ({
    page,
  }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
    });
    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

    const routes = [
      "/",
      "/comprar",
      "/calidad",
      "/calidad?lote=202604-013",
      "/calidad/202604-013",
      "/ficha-tecnica",
      "/creatina",
      "/creatina/que-es",
      "/productos/creatina-monohidrato-300g",
      "/productos/creatina-monohidrato-500g",
      "/productos/creatina-monohidrato-1kg",
      "/nosotros",
      "/contacto",
      "/terminos",
      "/privacidad",
    ];
    for (const route of routes) {
      const res = await page.goto(route);
      expect(res?.status(), `${route} no responde 200`).toBe(200);
    }

    expect(errors, "errores de consola detectados").toEqual([]);
  });

  test("imágenes de marca cargan sin 404", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.locator('img[alt="Packaging de FECA Creatina Monohidrato"]')
    ).toBeVisible();
    await expect(page.locator('img[alt="Pouch de FECA Creatina"]')).toBeAttached();
  });
});