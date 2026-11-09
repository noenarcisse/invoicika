import { expect, test } from "@playwright/test";

/**
 * Validation test, press enter while the date picker is open does not spawn a new item line.
 */
test(`Appuyer sur Enter buggue et ajoute toujours un nouvel objet dans la liste`, async ({ page }) => {
    await page.goto("/invoices/add");

    const dateInput = page.getByRole("textbox", { name: "Select date" });

    //recup les lignes items et length === 1
    const divnulle = page.locator("div").filter({
        hasText: "New InvoiceCustomer Select",
    });
    let itemLines = divnulle.getByText("Item");
    let count = (await itemLines.all()).length;

    expect(count).toBe(2);

    await dateInput.click();
    for (let i = 0; i < 10; i++) {
        await dateInput.press("Enter");
    }

    itemLines = divnulle.getByText("Item");
    count = (await itemLines.all()).length;
    console.log(count);
    expect(count).toBe(2);
});
