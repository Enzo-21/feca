import { expect, test } from "@playwright/test";

test.describe("Metadatos e íconos", () => {
  test("head expone theme-color, iconos y manifest", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.locator('meta[name="theme-color"][content="#cc5e21"]')
    ).toHaveCount(1);

    await expect(
      page.locator('link[rel="apple-touch-icon"]')
    ).toHaveAttribute("href", "/icons/apple-touch-icon.png");

    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      "href",
      "/manifest.webmanifest"
    );

    for (const icon of ["/icons/icon-192.png", "/icons/icon-512.png"]) {
      await expect(page.locator(`link[rel="icon"][href*="${icon}"]`)).toHaveCount(
        1
      );
    }
  });

  test("open graph y twitter image apuntan a la marca", async ({ page }) => {
    await page.goto("/");

    const og = page.locator('meta[property="og:image"]').first();
    await expect(og).toHaveAttribute("content", /https:\/\/.*\/icons\/og\.png/);

    const ogWidth = page.locator('meta[property="og:image:width"]').first();
    await expect(ogWidth).toHaveAttribute("content", "1200");

    const twitterImage = page.locator('meta[name="twitter:image"]');
    await expect(twitterImage).toHaveAttribute(
      "content",
      /https:\/\/.*\/icons\/og-twitter\.png/
    );
  });

  test("los archivos de marca responden 200", async ({ request }) => {
    const files = [
      "/favicon.ico",
      "/icons/apple-touch-icon.png",
      "/icons/icon-192.png",
      "/icons/icon-512.png",
      "/icons/og.png",
      "/icons/og-twitter.png",
      "/manifest.webmanifest",
    ];

    for (const file of files) {
      const res = await request.get(file);
      expect(res.ok(), `${file} no responde 200`).toBeTruthy();
    }
  });
});