import { expect, test } from "@playwright/test";

test("email invalide sans @", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty-werberjägermanjansen.com");

    const err = page.getByText(/valid email/);
    await expect(err).toBeVisible();
});

test("email invalide sans extension de domaine", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty@werberjagermanjansen");

    const err = page.getByText(/valid email/);
    await expect(err).toBeVisible();
});

test("email valide avec double extension de domaine", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty@amazon.com.be");

    const err = page.getByText(/valid email/);
    await expect(err).not.toBeVisible();
});

test("email valide avec caractere speciaux", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty@werberjägermanjansen.com");

    const err = page.getByText(/valid email/);
    await expect(err).not.toBeVisible();
});
test("email invalide avec caractere speciaux", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty.werberjägermanjansen@google.com");

    const err = page.getByText(/valid email/);
    await expect(err).toBeVisible();
});
