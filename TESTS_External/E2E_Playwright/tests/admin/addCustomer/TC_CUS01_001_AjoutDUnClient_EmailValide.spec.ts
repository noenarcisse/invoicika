import { expect, test } from "@playwright/test";

test("entrer un email invalide sans @ echoue", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty-werberjägermanjansen.com");

    const err = page.getByText(/valid email/);
    await expect(err).toBeVisible();
});

test("entrer un email invalide sans extension de domaine echoue", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty@werberjagermanjansen");

    const err = page.getByText(/valid email/);
    await expect(err).toBeVisible();
});

test("entrer un email valide avec double extension de domaine réussit", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty@amazon.com.be");

    const err = page.getByText(/valid email/);
    await expect(err).not.toBeVisible({ timeout: 3_000 }); //todo : unreliable, ca peut passer frame 1 avant l'apparition ?
});

test("entrer un email valide avec caractere speciaux dans le domaine réussit", async ({ page }) => {
    await page.goto("/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty@werberjägermanjansen.com");

    const err = page.getByText(/valid email/);
    await expect(err).not.toBeVisible({ timeout: 3_000 });
});
test("entrer un email avec caractere speciaux dans la partie locale échoue", async ({ page }) => {
    await page.goto("/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty.werberjägermanjansen@google.com");

    const err = page.getByText(/valid email/);
    await expect(err).toBeVisible();
});
