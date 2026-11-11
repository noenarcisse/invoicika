import { expect, test } from "@playwright/test";
import { InvoicesAddPage } from "@models/InvoicesAddPage";
import { InvoicesAllPage } from "@models/InvoicesAllPage";

test.describe("Test positif d'ajout d'une facture", () => {
    let guuidsSeenBefore = new Set<string>();

    test.beforeEach(async ({ page }) => {
        const invAll = new InvoicesAllPage(page);
        await invAll.goto();

        guuidsSeenBefore = await invAll.getAllInvoiceIds();
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
        const invAdd = new InvoicesAddPage(page);
        const invAll = new InvoicesAllPage(page);

        await invAdd.goto();

        await invAdd.selectCustomer(/jotaro/i);
        await invAdd.fillDate();
        await invAdd.selectItem(/billy/i);

        await invAdd.submit();

        await expect(page).toHaveURL("/invoices/all");
        await invAll.expectValidationMessage();
    });
});
