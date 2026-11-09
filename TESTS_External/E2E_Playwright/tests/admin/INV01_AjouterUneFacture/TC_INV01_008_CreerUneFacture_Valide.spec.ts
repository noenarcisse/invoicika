import { expect, test } from "@playwright/test";

test.describe("Test positif d'ajout d'une facture", () => {
    let guuidsSeenBefore = new Set<string>();

    test.beforeEach(async ({ page }) => {
        await page.goto("/invoices/all");
        const firstCells = page.locator("tbody tr td:first-child");

        for (const c of await firstCells.all()) {
            const content = await c.innerText();
            guuidsSeenBefore.add(content);
        }

        console.log(guuidsSeenBefore);
    });

    //impossible de passer par la request, l'API renvoie des valeurs bugguées
    test.afterEach(async ({ page, request }) => {
        await page.goto("/invoices/all");

        const firstCells = page.locator("tbody tr td:first-child");
        await firstCells.first().waitFor();

        for (const c of await firstCells.all()) {
            const id = await c.innerText();
            if (!guuidsSeenBefore.has(id)) {
                const res = await request.delete(
                    `http://localhost:5000/api/CustomerInvoices/${id}`,
                );
                // console.log(res.status());
                expect(res.ok()).toBeTruthy();
            }
        }
    });

    /***
     * Adding an invoice with correct values
     * Cannot be mocked as the validation message appears after the click on the next page
     */
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
        await expect(page.getByText("Invoice added successfully"))
            .toBeVisible();
    });
});
