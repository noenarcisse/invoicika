import { expect, test } from "@playwright/test";

test(`Le menu Settings/Users est visible par les admins`, async ({ page }) => {
    await page.goto("/");
    //recup du menu
    //on degage settings qui a un sous ul D:
    const menuitems = page.getByRole("listitem").filter({
        hasNot: page.locator("ul"),
    });
    const menulinks = menuitems.getByRole("link");

    const usersMenu = menulinks.getByText(/users/i);
    await expect(usersMenu).toBeVisible();
});
