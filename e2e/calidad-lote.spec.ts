import { expect, test } from "@playwright/test";

const LOT = "202604-013";

test.describe("Calidad — detalle de lote", () => {
  test("la especificación y el resultado caen cada uno en su columna", async ({
    page,
  }) => {
    await page.goto(`/calidad/${LOT}`);

    const specHeader = page.getByText("Especificación", { exact: true });
    const resultHeader = page.getByText("Resultado", { exact: true });
    const specCell = page.getByText("White Crystalline Powder", { exact: true });
    const resultCell = page.getByText("Qualified", { exact: true }).first();

    await expect(specHeader).toBeVisible();
    await expect(resultHeader).toBeVisible();
    await expect(specCell).toBeVisible();
    await expect(resultCell).toBeVisible();

    const specHeaderBox = await specHeader.boundingBox();
    const resultHeaderBox = await resultHeader.boundingBox();
    const specBox = await specCell.boundingBox();
    const resultBox = await resultCell.boundingBox();

    expect(specHeaderBox && resultHeaderBox && specBox && resultBox).toBeTruthy();

    // La celda de especificación arranca alineada con su encabezado...
    expect(Math.abs(specBox!.x - specHeaderBox!.x)).toBeLessThan(6);
    // ...y el resultado con el suyo (no queda pegado a la especificación).
    expect(Math.abs(resultBox!.x - resultHeaderBox!.x)).toBeLessThan(6);
    // La especificación está en una columna anterior a la del resultado.
    expect(specBox!.x).toBeLessThan(resultBox!.x);
  });
});
