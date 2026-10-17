import { expect, test } from "@playwright/test";

test("ajouter un client avec email", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const nameInput = page.getByPlaceholder(/customer name/);
    const emailInput = page.getByPlaceholder(/email/);
    const createButton = page.getByRole("button", { name: /create/i });
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();

    await nameInput.fill("Smitty Werbenjägermanjansen");
    await emailInput.fill("smitty@werberjagermanjansen.com");

    await expect(createButton).not.toBeDisabled();
    await createButton.click();
    await expect(page).toHaveURL(/customers\/all/, { timeout: 6_000 });
    await expect(page.getByText(/customer added successfully/i)).toBeVisible();
});

test("ajouter un client sans email", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const nameInput = page.getByPlaceholder(/customer name/);
    const createButton = page.getByRole("button", { name: /create/i });
    await expect(nameInput).toBeVisible();

    await nameInput.fill("Smitty Werbenjägermanjansen");

    await expect(createButton).not.toBeDisabled();
    await createButton.click();
    await expect(page).toHaveURL(/customers\/all/, { timeout: 6_000 });
    await expect(page.getByText(/customer added successfully/i)).toBeVisible();
});

// vu en manuel, test pour fix et verifier une regression eventuel
test("un client est créé quand l'email est rempli, puis vidé", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const nameInput = page.getByPlaceholder(/customer name/);
    const emailInput = page.getByPlaceholder(/email/);
    const createButton = page.getByRole("button", { name: /create/i });
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();

    await nameInput.fill("Smitty Werbenjägermanjansen");
    await emailInput.fill("smitty@werberjagermanjansen.com");
    await emailInput.fill("");

    await expect(createButton).not.toBeDisabled();
    await createButton.click();

    await expect(page).toHaveURL(/customers\/all/, { timeout: 6_000 });
    await expect(page.getByText(/customer added successfully/i)).toBeVisible();
});
