import { expect, test as setup } from "@playwright/test";

const file = "playwright/.auth/session_admin.json";

setup("connexion en tant qu'admin", async ({ page }) => {
    const url = "http://localhost:4444/";
    await page.goto(url);

    await page.getByPlaceholder("Username").fill("admin");
    await page.getByPlaceholder("Password").fill("admin");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByText(/monthly income/i)).toBeVisible();

    await page.context().storageState({ path: file });
});
