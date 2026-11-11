import { expect, Locator, Page } from "@playwright/test";

export class InvoicesAllPage {
    readonly page: Page;

    readonly idCells: Locator;

    readonly currentPage: Locator;
    readonly resetButton: Locator;
    readonly addButton: Locator;

    readonly previousPageButton: Locator;
    readonly nextPageButton: Locator;

    readonly validationMessage = /invoice added successfully/i;

    constructor(p: Page) {
        this.page = p;
        this.idCells = p.locator("tbody tr td:first-child");
        this.resetButton = p.getByRole("button", { name: /reset/i });
        this.addButton = p.getByRole("button", { name: /add/i });

        this.currentPage = p.locator("li.ant-pagination-item-active");
        this.previousPageButton = p.locator('li[title="Previous Page"]>button');
        this.nextPageButton = p.locator('li[title="Next Page"]>button');
    }

    async goto() {
        await this.page.goto("/invoices/all");
    }

    async getAllInvoiceIds(): Promise<Set<string>> {
        const ids = new Set<string>();
        await expect(this.idCells.first()).toBeVisible();
        for (const c of await this.idCells.all()) {
            const content = await c.innerText();
            ids.add(content);
        }
        return ids;
    }

    async getAllInvoiceIdsOnAllPages(): Promise<Set<string>> {
        let ids = new Set<string>();

        while (!(await this.nextPageButton.isDisabled())) {
            ids = ids.union(await this.getAllInvoiceIds());

            //parano de claude pour attendre forcément
            //je decommenterai si j'me prend un bug d'attente
            // const before = await this.currentPage.innerText();
            await this.nextPageButton.click();
            // await expect(this.currentPage).not.toHaveText(before);
        }
        //derniere page a lire
        ids = ids.union(await this.getAllInvoiceIds());
        return ids;
    }

    async expectValidationMessage() {
        await expect(this.page.getByText(this.validationMessage))
            .toBeVisible();
    }
}
