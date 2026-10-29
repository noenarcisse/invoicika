import { expect, test } from "@playwright/test";

/***
 * wip skipped for now
 */
test(`Ajouter une facture correct réussit`, async ({ page }) => {
    await page.goto("/invoices/add");

    const customerList = page.locator("nz-select-top-control").filter({
        hasText: "Select Customer",
    });
    const dateInput = page.getByRole("textbox", { name: "Select date" });
    const itemList = page.locator("div").filter({ hasText: "Item" }).nth(4);

    await customerList.click();
    const jotaro = page.getByText(/jotaro/i);
    await jotaro.click();

    await dateInput.pressSequentially("2027-12-01", { delay: 30 });
    await expect(dateInput).toHaveValue("2027-12-01");

    await itemList.click();
    await page.getByText(/billy/i).click();
    await page.getByRole("button", { name: "Create" }).click();

    await expect(page).toHaveURL("/invoices/all");
    await expect(page.getByText("Invoice added successfully")).toBeVisible();
});

//todo
//focus sur Invoice Date et press enter -> ajoute une ligne d'une nouvel obj
//faut reount
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
