import { expect, Locator, Page } from "@playwright/test";

export class ItemsAllPage {
    readonly page: Page;

    readonly title: Locator;
    readonly addButton: Locator;
    readonly itemsRows: Locator;

    readonly editButtonsPattern: string;
    readonly deleteButtonsPattern: string;

    readonly validationMessage: {
        add: string | RegExp;
        edit: string | RegExp;
        delete: string | RegExp;
    };

    constructor(p: Page) {
        this.page = p;

        this.title = p.getByText("Items List");
        this.addButton = p.getByRole("button", { name: /add/i });
        this.itemsRows = p.locator("table tbody tr");

        this.editButtonsPattern = 'a[href^="/items/edit/"]';
        this.deleteButtonsPattern = 'svg[data-icon="delete"]';

        this.validationMessage = {
            add: /VAT added successfully/i,
            edit: /User updated successfully/i,
            delete: /User deleted successfully/i,
        };
    }

    async goto() {
        await this.page.goto("/users/all");
    }

    async removeItem(i: number) {
        if (i >= (await this.itemsRows.all()).length) return;
        await this.itemsRows.nth(i).locator(this.deleteButtonsPattern).click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL("/users/all");
        await expect(this.title).toBeVisible();
    }
}
