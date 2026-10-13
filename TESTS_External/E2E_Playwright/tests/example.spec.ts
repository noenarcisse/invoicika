import { expect, test } from "@playwright/test";

test("Test setup invoicika", async ({ page }) => {
  const url = "http://localhost:4444/dashboard";
  await page.goto(url);
  const logo = page.getByRole("heading", { level: 1, name: "invoicika" });
  await expect(logo).toBeVisible();
});

test("Test setup login", async ({ page }) => {
  const url = "http://localhost:4444/dashboard";
  await page.goto(url);

  await page.getByPlaceholder("Username").fill("admin");
  await page.getByPlaceholder("Password").fill("admin");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page.getByText(/monthly income/i)).toBeVisible();
});
