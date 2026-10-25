import { expect, test as setup } from "@playwright/test";

const file = "playwright/.auth/session_admin.json";

setup("connexion en tant qu'admin", async ({ page }) => {
    await page.goto("");

    await page.getByPlaceholder("Username").fill("admin");
    await page.getByPlaceholder("Password").fill("admin");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByText(/monthly income/i)).toBeVisible();

    await page.context().storageState({ path: file });
});
