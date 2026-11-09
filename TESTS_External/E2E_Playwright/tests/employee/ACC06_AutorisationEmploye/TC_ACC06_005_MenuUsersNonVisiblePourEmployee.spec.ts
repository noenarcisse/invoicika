import { expect, test } from "@playwright/test";

test(`Le menu Settings/Users n'est pas visible par les employés`, async ({ page }) => {
    await page.goto("/");
    //recup du menu
    //on degage settings qui a un sous ul D:
    const menuitems = page.getByRole("listitem").filter({
        hasNot: page.locator("ul"),
    });
    const menulinks = menuitems.getByRole("link");

    const usersMenu = menulinks.getByText(/users/i);
    await expect(usersMenu).not.toBeVisible();
});
