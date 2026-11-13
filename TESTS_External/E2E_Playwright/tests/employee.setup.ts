import { expect, test as setup } from "@playwright/test";
import { LoginPage } from "@models/LoginPage";
import { EMPLOYE } from "../data/constants";
import { DashboardPage } from "@models/DashboardPage";

const file = "playwright/.auth/session_employee.json";

setup("connexion en tant qu'employee", async ({ page }) => {
    const lp = new LoginPage(page);
    const dp = new DashboardPage(page);

    await lp.goto();
    await lp.login(EMPLOYE.name, EMPLOYE.pwd);

    await dp.expectReached();
    await expect(page.getByText(EMPLOYE.name)).toBeVisible();

    await page.context().storageState({ path: file });
});
