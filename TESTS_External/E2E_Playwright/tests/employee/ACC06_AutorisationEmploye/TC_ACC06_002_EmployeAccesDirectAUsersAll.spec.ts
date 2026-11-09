import { expect, test } from "@playwright/test";

test(`IN-27 : Un employé ne doit pas atteindre la page settings/users en acces direct.`, async ({ page }) => {
    const to = 1_000;
    await page.goto("/users/all");
    //redirection ?
    await expect.soft(page).not.toHaveURL("/users/all", { timeout: to });
    //ne pas afficher la liste des user mais une erreur dans le cas contraire?
    await expect.soft(page.getByText("Users List")).not.toBeVisible({
        timeout: to,
    });
    await expect.soft(page.getByRole("table")).not.toBeVisible({ timeout: to });
});
