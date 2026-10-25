import { expect, test as setup } from "@playwright/test";

const file = "playwright/.auth/session_employee.json";

setup("connexion en tant qu'employee", async ({ page }) => {
    await page.goto("");

    await page.getByPlaceholder("Username").fill("Jacques Houille");
    await page.getByPlaceholder("Password").fill("cestokay");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByText(/monthly income/i)).toBeVisible();

    await page.context().storageState({ path: file });
});
