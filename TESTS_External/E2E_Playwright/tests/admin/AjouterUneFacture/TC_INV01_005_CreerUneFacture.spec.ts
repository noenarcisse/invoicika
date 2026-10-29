import { expect, test } from "@playwright/test";

//TODO
//describe + teardown des succes qui ecrivent la DB

test(`Ajouter une facture correcte réussit`, async ({ page }) => {
    await page.goto("/invoices/add");

    //customerList = page.getByText("Select Customer").locator("..");
    const customerList = page.locator("[formcontrolname=customerId]");
    await expect(customerList).toBeVisible();

    const dateInput = page.getByRole("textbox", { name: "Select date" });

    const itemList = page.locator("[formcontrolname=item]").first();
    await expect(itemList).toBeVisible();

    await customerList.click();
    const jotaro = page.getByText(/jotaro/i);
    await jotaro.click();

    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    const dateStr = future.toISOString().slice(0, 10); // "2027-10-29"

    await dateInput.pressSequentially(dateStr, { delay: 30 });
    await expect(dateInput).toHaveValue(dateStr);

    await itemList.click();
    await page.getByText(/billy/i).click();
    await page.getByRole("button", { name: "Create" }).click();

    await expect(page).toHaveURL("/invoices/all");
    await expect(page.getByText("Invoice added successfully")).toBeVisible();
});

//todo
//focus sur Invoice Date et press enter -> ajoute une ligne d'une nouvel obj
//faut recount

/**
 * Validation test, press enter to spawn a new item line.
 */
test.fixme(`Appuyer sur Enter bugge et ajoute toujours un nouvel objet dans la liste`, async ({ page }) => {
    await page.goto("/invoices/add");

    const dateInput = page.getByRole("textbox", { name: "Select date" });

    await dateInput.click();
    for (let i = 0; i < 10; i++) {
        await dateInput.press("Enter");
    }

    //recup les lignes items et length === 1
    const divnulle = page.locator("div").filter({
        hasText: "New InvoiceCustomer Select",
    });
    const itemLines = divnulle.getByText("Item");
    const count = (await itemLines.all()).length;
    console.log(count);
    expect(count).toBe(1);
});
