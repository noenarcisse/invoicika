import { expect, test } from "@playwright/test";
import { ADMIN } from "@data/constants";
import { DashboardPage } from "@models/DashboardPage";
import { LoginPage } from "@models/LoginPage";

test("se deconnecter en tant qu'admin", async ({ page }) => {
    const dp = new DashboardPage(page);
    const lp = new LoginPage(page);
    await dp.goto();

    //obligé de se reposer sur la connexion admin et la connaissance de username pour aller chercher l'element dans ce cas
    const adminButton = page.getByText(ADMIN.name);
    await expect(adminButton).toBeVisible();

    await adminButton.hover();
    const logoutButton = page.getByText(/Logout/i);

    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    await lp.expectReached();
    await expect(lp.submitButton).toBeVisible();
});
