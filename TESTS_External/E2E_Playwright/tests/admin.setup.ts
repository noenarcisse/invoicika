import { expect, test as setup } from "@playwright/test";
import { LoginPage } from "../models/LoginPage";
import { ADMIN } from "../constants";
import { DashboardPage } from "../models/DashboardPage";

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
