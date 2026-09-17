import { expect, test } from "@playwright/test";

test.describe("Comprar", () => {
  test("listado con 3 productos, precios y badges", async ({ page }) => {
    await page.goto("/comprar");

    await expect(page.getByRole("heading", { name: "Comprar" })).toBeVisible();
    await expect(page.getByText("Comprar FECA").first()).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Añadir al carrito" })
    ).toHaveCount(3);

    for (const price of ["$28.000", "$43.500", "$82.000"]) {
      await expect(page.getByText(price, { exact: true })).toBeVisible();
    }

    for (const badge of ["Clásico", "Más elegido", "Mejor precio por kg"]) {
      await expect(page.getByText(badge, { exact: true })).toBeVisible();
    }

    await expect(page.getByText("Oferta · 15% dcto")).toBeVisible();
    await expect(page.getByText("Oferta · 25% dcto")).toBeVisible();

    for (const size of ["300 g", "500 g", "1 kg"]) {
      await expect(page.getByText(size, { exact: true }).first()).toBeVisible();
    }
  });

  test("muestra los servicios según dosis de 5 g", async ({ page }) => {
    await page.goto("/comprar");

    for (const servings of ["60", "100", "200"]) {
      await expect(page.getByText(servings, { exact: true }).first()).toBeVisible();
    }
    await expect(page.getByText("servicios", { exact: true })).toHaveCount(3);

    await expect(page.getByText("Pureza")).toHaveCount(0);
    await expect(page.getByText(/Lote ref/i)).toHaveCount(0);
    await expect(page.getByText("FECA-2026", { exact: false })).toHaveCount(0);
  });

  test("carrito vacío muestra estado vacío", async ({ page }) => {
    await page.goto("/comprar");

    await page.getByRole("button", { name: "Abrir carrito" }).click();
    await expect(page.getByText("Tu carrito está vacío")).toBeVisible();
  });

  test("agrega al carrito y llega hasta WhatsApp con vendedor asignado", async ({
    page,
  }) => {
    await page.goto("/comprar");

    await page.getByRole("button", { name: "Añadir al carrito" }).first().click();

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Tu pedido")).toBeVisible();
    await expect(page.getByText("$28.000", { exact: true }).first()).toBeVisible();

    await page.getByRole("button", { name: "Continuar" }).click();

    const provinceSelect = page.getByRole("combobox", { name: "Provincia" });
    await expect(provinceSelect).toBeVisible();
    await provinceSelect.click();

    const option = page.getByRole("option", { name: "Córdoba" });
    await option.click();

    await expect(
      page.getByRole("link", { name: "Continuar por WhatsApp" })
    ).toBeVisible();

    const wa = page.getByRole("link", { name: "Continuar por WhatsApp" });
    await expect(wa).toHaveAttribute("href", /wa\.me\/5493516195674/);
    await expect(wa).toHaveAttribute("href", /FECA%20Creatina%20Monohidrato/);
  });

  test("suma y resta cantidades y actualiza subtotal", async ({ page }) => {
    await page.goto("/comprar");

    await page.getByRole("button", { name: "Añadir al carrito" }).first().click();

    await page
      .getByRole("button", { name: "Sumar una unidad de 300 g" })
      .click();

    await expect(page.getByText("$56.000", { exact: true }).first()).toBeVisible();

    await page
      .getByRole("button", { name: "Restar una unidad de 300 g" })
      .click();

    await expect(page.getByText("$28.000", { exact: true }).first()).toBeVisible();
  });

  test("muestra perks y CTA final a /calidad", async ({ page }) => {
    await page.goto("/comprar");

    for (const perk of [
      "Envío a todo el país",
      "Calidad trazable",
      "Satisfacción garantizada",
    ]) {
      await expect(page.getByRole("heading", { name: perk })).toBeVisible();
    }

    await expect(
      page.getByRole("heading", { name: "¿Listo para impulsar tu rutina?" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Verificar mi lote" })
    ).toHaveAttribute("href", "/calidad");
  });
});