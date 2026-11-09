import { expect, test } from "@playwright/test";

test(`IN-38 : Un employé peut atteindre la page settings/users en éditant son propre profil. Bouton Edit.`, async ({ page }) => {
    const username = "Jacques Houille";
    await page.goto("/");

    const profileMenu = page.getByText(username);
    await expect(profileMenu).toBeVisible();

    await profileMenu.hover();

    const profileButton = page.getByText(/profil/i);
    await expect(profileButton).toBeVisible();
    await profileButton.click();

    const submitButton = page.getByRole("button", { name: /edit/i });
    await submitButton.click();

    const validationMessage = page.getByText(/User updated successfully/i);
    await expect(validationMessage).toBeVisible();
    await expect(page).not.toHaveURL("/users/all", { timeout: 2_000 });
});

test(`IN-38 : Un employé peut atteindre la page settings/users en éditant son propre profil. Fleche de retour vers Users.`, async ({ page }) => {
    const username = "Jacques Houille";
    await page.goto("/");

    const profileMenu = page.getByText(username);
    await expect(profileMenu).toBeVisible();

    await profileMenu.hover();

    const profileButton = page.getByText(/profil/i);
    await expect(profileButton).toBeVisible();
    await profileButton.click();

    const backArrow = page.locator('[data-icon="arrow-left"]');
    await expect(backArrow).not.toBeVisible();
});
