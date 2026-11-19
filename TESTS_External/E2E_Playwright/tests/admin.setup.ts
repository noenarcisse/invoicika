import { expect, test as setup } from "@playwright/test";
import { LoginPage } from "@models/LoginPage.ts";
import { ADMIN } from "@data/constants.ts";
import { DashboardPage } from "@models/DashboardPage.ts";

const file = "playwright/.auth/session_admin.json";

setup("connexion en tant qu'admin", async ({ page }) => {
    const lp = new LoginPage(page);
    const dp = new DashboardPage(page);

    await lp.goto();
    await lp.login(ADMIN.name, ADMIN.pwd);

    await dp.expectReached();
    await expect(page.getByText(ADMIN.name)).toBeVisible();

    await page.context().storageState({ path: file });
});
