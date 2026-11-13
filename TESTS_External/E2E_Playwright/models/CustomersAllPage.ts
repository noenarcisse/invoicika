import { expect, Locator, Page } from "@playwright/test";

type Customer = {
    name: string;
    email: string;
    address?: string;
    phone?: string;
};

export class CustomersAllPage {
    readonly page: Page;

    readonly title: Locator;

    readonly customersRows: Locator;

    readonly addButton: Locator;

    readonly editButtonsPattern: string;
    readonly deleteButtonsPattern: string;

    readonly currentPage: Locator;
    readonly previousPageButton: Locator;
    readonly nextPageButton: Locator;

    readonly validationMessage: {
        add: string | RegExp;
        edit: string | RegExp;
        delete: string | RegExp;
    };

    constructor(p: Page) {
        this.page = p;
        this.title = p.getByText("Customers List");

        this.customersRows = p.locator("table tbody tr");
        this.addButton = p.getByRole("button", { name: /add/i });

        this.currentPage = p.locator("li.ant-pagination-item-active");
        this.previousPageButton = p.locator('li[title="Previous Page"]>button');
        this.nextPageButton = p.locator('li[title="Next Page"]>button');

        this.editButtonsPattern = 'a[href^="/customers/edit/"]';
        this.deleteButtonsPattern = 'svg[data-icon="delete"]';

        this.validationMessage = {
            add: /customer added successfully/i,
            edit: /customer updated successfully/i,
            delete: /customer deleted successfully/i,
        };
    }

    async goto() {
        await this.page.goto("/customers/all");
    }

    async expectReached() {
        await expect(this.page).toHaveURL("/customers/all");
    }

    async expectErrorMessage(e: string | RegExp, timeout?: number) {
        await expect(this.page.getByText(e)).not.toBeVisible({ timeout });
    }
}
