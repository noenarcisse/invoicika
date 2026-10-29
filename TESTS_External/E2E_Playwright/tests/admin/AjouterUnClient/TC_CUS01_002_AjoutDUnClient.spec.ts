import { expect, test } from "@playwright/test";

test("ajouter un client avec email réussit", async ({ page }) => {
    await page.goto("/customers/add");

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

//doit echouer -> voir RM
test("ajouter un client sans email échoue", async ({ page }) => {
    await page.goto("/customers/add");

    const nameInput = page.getByPlaceholder(/customer name/);
    const createButton = page.getByRole("button", { name: /create/i });
    await expect(nameInput).toBeVisible();

    await nameInput.fill("Smitty Werbenjägermanjansen");

    await expect(createButton).toBeDisabled();
    // await createButton.click();
    // await expect(page).toHaveURL(/customers\/all/, { timeout: 6_000 });
    // await expect(page.getByText(/customer added successfully/i)).toBeVisible();
});
