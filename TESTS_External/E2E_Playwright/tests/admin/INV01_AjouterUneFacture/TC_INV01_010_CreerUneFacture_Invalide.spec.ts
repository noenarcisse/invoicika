import { InvoicesAddPage } from "@models/InvoicesAddPage.ts";
import { expect, test } from "@playwright/test";

/***
 * The frontend doesn't display any errors. Should be added later in the tests
 */
test.describe("Tests négatifs d'ajout d'une facture", () => {
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

    test(`Ajouter une facture sans objet échoue`, async ({ page }) => {
        const invAdd = new InvoicesAddPage(page);
        await invAdd.goto();

        await invAdd.selectCustomer(/jotaro/i);
        await invAdd.fillDate();

        await invAdd.minusButton.click();

        //soft temp, honnetement je laisse juste prouver plus loin que ca passe
        //mais en cas d'err le bouton est en général disabled dans l'app donc
        await invAdd.expectSubmitDisabled(true);

        await invAdd.submit();

        //pas de redir
        await expect(page).toHaveURL("/invoices/add");
    });

    test(`Ajouter une facture avec un objet vide échoue`, async ({ page }) => {
        const invAdd = new InvoicesAddPage(page);
        await invAdd.goto();

        await invAdd.selectCustomer(/jotaro/i);
        await invAdd.fillDate();

        await invAdd.expectSubmitDisabled(true);
        await invAdd.submit();
        //pas de redir
        await expect(page).toHaveURL("/invoices/add");
    });
    test(`Ajouter une facture sans client échoue`, async ({ page }) => {
        const invAdd = new InvoicesAddPage(page);
        await invAdd.goto();

        await invAdd.fillDate();
        await invAdd.selectItem(/billy/i);

        await invAdd.expectSubmitDisabled(true);
        await invAdd.submit();
        //pas de redir
        await expect(page).toHaveURL("/invoices/add");
    });
    test(`Ajouter une facture sans date échoue`, async ({ page }) => {
        const invAdd = new InvoicesAddPage(page);
        await invAdd.goto();

        await invAdd.selectCustomer(/jotaro/i);
        await invAdd.selectItem(/billy/i);

        await invAdd.expectSubmitDisabled(true);
        await invAdd.submit();
        //pas de redir
        await expect(page).toHaveURL("/invoices/add");
    });
});
