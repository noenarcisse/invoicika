import { expect, Locator, Page } from "@playwright/test";

export class VATAllPage {
    readonly page: Page;

    readonly title: Locator;
    readonly addButton: Locator;
    readonly vatRows: Locator;

    readonly editButtonsPattern: string;
    readonly deleteButtonsPattern: string;

    readonly validationMessage: {
        add: string | RegExp;
        edit: string | RegExp;
        delete: string | RegExp;
    };

    constructor(p: Page) {
        this.page = p;

        this.title = p.getByText("VAT List");
        this.addButton = p.getByRole("button", { name: /add vat/i });
        this.vatRows = p.locator("table tbody tr");

        this.editButtonsPattern = 'a[href^="/vat/edit/"]';
        this.deleteButtonsPattern = 'svg[data-icon="delete"]';

        this.validationMessage = {
            add: /VAT added successfully/i,
            edit: /VAT updated successfully/i,
            delete: /VAT deleted successfully/i,
        };
    }

    async goto() {
        await this.page.goto("/vat/all");
    }

    async getPercentages(): Promise<string[]> {
        const percentages = [];
        const firstCells = this.page.locator("tbody tr td:first-child");
        for (const c of await firstCells.all()) {
            percentages.push(await c.innerText());
        }

        return percentages;
    }

    async removePercetage(i: number) {
        if (i >= (await this.vatRows.all()).length) return;
        await this.vatRows.nth(i).locator(this.deleteButtonsPattern).click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL("/vat/all");
        await expect(this.title).toBeVisible();
    }
}
