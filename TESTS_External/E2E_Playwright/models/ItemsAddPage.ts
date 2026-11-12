import { expect, Locator, Page } from "@playwright/test";

export class ItemsAddPage {
    readonly page: Page;

    readonly title: Locator;

    readonly nameInput: Locator;
    readonly descrInput: Locator;
    readonly purchasePricenput: Locator;
    readonly salePriceInput: Locator;
    readonly quantityInput: Locator;

    readonly submitButton: Locator;

    readonly validationMessage: {
        add: string | RegExp;
        edit: string | RegExp;
        delete: string | RegExp;
    };

    constructor(p: Page) {
        this.page = p;

        this.title = p.getByText("Items List");

        this.nameInput = p.getByPlaceholder("Enter item name");
        this.descrInput = p.getByPlaceholder("Enter description");
        this.purchasePricenput = p.getByPlaceholder("Enter purchase price");
        this.salePriceInput = p.getByPlaceholder("Enter sale price");
        this.quantityInput = p.getByPlaceholder("Enter quantity");

        this.submitButton = p.getByRole("button", { name: /create/i });

        this.validationMessage = {
            add: /VAT added successfully/i,
            edit: /User updated successfully/i,
            delete: /User deleted successfully/i,
        };
    }

    async goto() {
        await this.page.goto("/users/all");
    }

    async addItem(
        name: string,
        purchasePrice: number,
        salePrice: number,
        quantity: number,
        description: string = "",
    ) {
        await this.nameInput.fill(name);
        await this.purchasePricenput.fill(`${purchasePrice}`);
        await this.salePriceInput.fill(`${salePrice}`);
        await this.quantityInput.fill(`${quantity}`);
        await this.descrInput.fill(description);
        await this.submitButton.click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL("/users/all");
        await expect(this.title).toBeVisible();
    }
}
