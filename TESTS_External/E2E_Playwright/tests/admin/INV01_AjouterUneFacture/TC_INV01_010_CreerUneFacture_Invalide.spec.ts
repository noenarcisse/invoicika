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
        await page.goto("/invoices/add");

        const customerList = page.locator("[formcontrolname=customerId]");
        await expect(customerList).toBeVisible();

        const dateInput = page.getByRole("textbox", { name: "Select date" });

        await customerList.click();
        const jotaro = page.getByText(/jotaro/i);
        await jotaro.click();

        const future = new Date();
        future.setFullYear(future.getFullYear() + 1);
        const dateStr = future.toISOString().slice(0, 10); // "2027-10-29"

        await dateInput.pressSequentially(dateStr, { delay: 30 });
        await expect(dateInput).toHaveValue(dateStr);

        const minusButton = page
            .locator('[formcontrolname="total"]')
            .locator("xpath=following-sibling::*[1]");

        await expect(minusButton).toBeVisible();
        await minusButton.click();

        const submitButton = page.getByRole("button", { name: "Create" });
        await expect.soft(submitButton).toBeDisabled();
        await submitButton.click();

        await expect(page.getByText("Invoice added successfully"))
            .not.toBeVisible({ timeout: 1_000 });
    });
});
