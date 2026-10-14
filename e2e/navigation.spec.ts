import { expect, test } from "@playwright/test";

test.describe("Navegación", () => {
  test("header en desktop navega entre Inicio, Comprar y Calidad", async ({
    page,
  }) => {
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Principal" });
    await expect(nav.getByRole("link", { name: "Inicio", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Comprar", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Calidad" })).toBeVisible();

    await nav.getByRole("link", { name: "Comprar", exact: true }).click();
    await expect(page).toHaveURL(/\/comprar$/);

    await nav.getByRole("link", { name: "Calidad" }).click();
    await expect(page).toHaveURL(/\/calidad$/);
  });

  test("logo enlaza al home", async ({ page }) => {
    await page.goto("/comprar");

    await page.getByLabel("FECA — Inicio").click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("menú móvil abre, navega y cierra", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Abrir menú" });
    await expect(toggle).toBeVisible();
    await toggle.click();

    const mobile = page.getByRole("navigation", { name: "Móvil" });
    await expect(mobile.getByRole("link", { name: "Calidad" })).toBeVisible();

    await mobile.getByRole("link", { name: "Calidad" }).click();
    await expect(page).toHaveURL(/\/calidad$/);
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeVisible();
  });

  test("en móvil, fuera del home no se marca Inicio como activo", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/comprar");

    await page.getByRole("button", { name: "Abrir menú" }).click();
    const mobile = page.getByRole("navigation", { name: "Móvil" });

    await expect(mobile.getByRole("link", { name: "Comprar", exact: true })).toHaveClass(
      /bg-brand-light/
    );
    await expect(mobile.getByRole("link", { name: "Inicio", exact: true })).not.toHaveClass(
      /bg-brand-light/
    );
  });

  test("en móvil, Inicio queda activo solo en el home", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Abrir menú" }).click();
    const mobile = page.getByRole("navigation", { name: "Móvil" });

    await expect(mobile.getByRole("link", { name: "Inicio", exact: true })).toHaveClass(
      /bg-brand-light/
    );
    await expect(mobile.getByRole("link", { name: "Comprar", exact: true })).not.toHaveClass(
      /bg-brand-light/
    );
  });

  test("header es transparente arriba y opaco al scrollear", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header").first();
    await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(header).toHaveCSS(
      "background-color",
      "oklab(0.973625 0.00069043 0.00160331 / 0.9)"
    );

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  });

  test("footer muestra identidad y enlaces principales", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer.getByLabel("Isotipo FECA").first()).toBeVisible();
    await expect(footer.getByText("Impulsa tu rutina").first()).toBeVisible();

    await expect(
      footer.getByRole("link", { name: "Comprar", exact: true }).first()
    ).toHaveAttribute("href", "/comprar");
    await expect(
      footer.getByRole("link", { name: "Verificar lote" }).first()
    ).toHaveAttribute("href", "/calidad");
  });
});