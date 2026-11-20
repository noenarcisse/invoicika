import { CustomersAllPage } from "@models/CustomersAllPage.ts";
import { expect, test } from "@playwright/test";

test(`Supprimer un client réussit`, {
    tag: "@customers",
}, async ({ page }) => {
    const cusall = new CustomersAllPage(page);
    await cusall.goto();
    await cusall.hasData();
    const firstCustomer = await cusall.page.locator("tbody tr td").first().innerText();

    await cusall.page.locator(cusall.deleteButtonsPattern).first()
        .click();

    await cusall.page.getByText(/yes/i).click();
    await expect(cusall.page.getByText(firstCustomer)).not.toBeVisible({ timeout: 1_000 });
});
