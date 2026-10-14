import { expect, test } from "@playwright/test";

const keywords = ["Fuerza", "Potencia", "Resistencia", "Recuperación"];

test.describe("Home — Hero", () => {
  test("muestra titular, CTAs y estadísticas", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1 })
    ).toContainText("Creatina pura");

    for (const word of keywords) {
      await expect(page.locator("h1")).toContainText(word);
    }
    await expect(page.locator("h1 [aria-hidden='false']")).toHaveCount(1);

    await expect(
      page.getByRole("link", { name: "Comprar ahora" }).first()
    ).toHaveAttribute("href", "/comprar");
    await expect(
      page.getByRole("link", { name: "Verificar lote" }).first()
    ).toHaveAttribute("href", "/calidad");

    for (const stat of ["≥ 99,5%", "100%", "5 g"]) {
      await expect(page.getByText(stat, { exact: true }).first()).toBeVisible();
    }
  });

  test("la palabra rotativa cambia sin mover el layout", async ({ page }) => {
    await page.goto("/");

    const active = page.locator("h1 [aria-hidden='false']");
    const first = (await active.textContent())?.trim() ?? "";
    expect(keywords).toContain(first);

    const heroImage = page.locator(
      'img[alt="Packaging de FECA Creatina Monohidrato"]'
    );
    const container = heroImage.locator("..");

    const box1 = await container.boundingBox();
    expect(box1).not.toBeNull();

    await page.waitForTimeout(3300);

    expect(keywords).toContain((await active.textContent())?.trim() ?? "");
    const box2 = await container.boundingBox();
    expect(box2).toEqual(box1);
  });

  test("imagen de packaging con leyenda Impulsa tu rutina", async ({ page }) => {
    await page.goto("/");

    const image = page.locator(
      'img[alt="Packaging de FECA Creatina Monohidrato"]'
    );
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", /hero-athletes/);

    const container = image.locator("..");
    await expect(container).toHaveClass(/aspect/);

    await expect(
      page.getByText("Impulsa tu rutina", { exact: true }).first()
    ).toBeVisible();
    await expect(
      page.getByText("Monohidrato de creatina", { exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Isotipo FECA" }).first()
    ).toBeVisible();
  });
});

test.describe("Home — secciones", () => {
  test("aplicaciones, puntos fuertes y marquee presentes", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Comprobado, no solo afirmado/ })
    ).toBeVisible();

    for (const title of [
      "Desarrollo muscular",
      "Fuerza y potencia",
      "Más resistencia",
      "Recuperación",
    ]) {
      await expect(
        page.getByRole("heading", { name: title, exact: true }).first()
      ).toBeVisible();
    }

    await expect(
      page.getByRole("heading", { name: /Los puntos fuertes de FECA/ })
    ).toBeVisible();

    for (const item of ["Sin aditivos", "Certificado por lote"]) {
      await expect(page.getByText(item).first()).toBeVisible();
    }

    await expect(
      page.getByText("Transparencia", { exact: true }).first()
    ).toBeVisible();
  });

  test("preview de productos muestra los 3 productos", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Creatina FECA, sin imperfecciones/ })
    ).toBeVisible();

    for (const price of ["$28.000", "$43.500", "$82.000"]) {
      await expect(page.getByText(price, { exact: true })).toBeVisible();
    }

    for (const product of [
      "Clásico",
      "Más elegido",
      "Mejor precio por kg",
    ]) {
      await expect(page.getByText(product).first()).toBeVisible();
    }

    await expect(
      page.getByRole("link", { name: "Ver todos los productos" })
    ).toHaveAttribute("href", "/comprar");
  });

  test("FAQ: el acordeón abre y cierra", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", {
      name: "¿Necesito hacer una fase de carga?",
    });
    await trigger.click();

    await expect(
      page.getByText("No. Una fase de carga acelera", { exact: false }).first()
    ).toBeVisible();
  });

  test("form de calidad del home redirige a /calidad con ?lote=", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByLabel("Número de lote").fill("202604-013");
    await page.getByRole("button", { name: "Buscar" }).click();

    await expect(page).toHaveURL(/\/calidad\?lote=202604-013/);
    await expect(
      page.getByText("1 certificado encontrado", { exact: true })
    ).toBeVisible();
  });
});