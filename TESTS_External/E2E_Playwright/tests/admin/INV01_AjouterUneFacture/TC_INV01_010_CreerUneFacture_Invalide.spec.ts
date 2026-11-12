import { InvoicesAddPage } from "@models/InvoicesAddPage";
import { expect, test } from "@playwright/test";

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
        const addPage = new InvoicesAddPage(page);
        await addPage.goto();

        await addPage.selectCustomer(/jotaro/i);
        await addPage.fillDate();

        await addPage.minusButton.click();

        //soft temp, honnetement je laisse juste prouver plus loin que ca passe
        //mais en cas d'err le bouton est en général disabled dans l'app donc
        await addPage.expectSubmitDisabled(true);

        await addPage.submit();

        //pas de redir
        await expect(page).toHaveURL("/invoices/add");
    });
});
