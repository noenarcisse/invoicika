import { expect, Locator, Page } from "@playwright/test";

//devin
//+ ajout des errmsg

type Item = {
    name: string;
    description?: string;
    purchasePrice: number;
    salePrice: number;
    quantity: number;
};

export class ItemsEditPage {
    readonly page: Page;

    readonly title: Locator;

    readonly nameInput: Locator;
    readonly descrInput: Locator;
    readonly purchasePriceInput: Locator;
    readonly salePriceInput: Locator;
    readonly quantityInput: Locator;

    readonly submitButton: Locator;
    readonly resetButton: Locator;

    validationMessage = /Item updated successfully/i;

    readonly errorMessages = {
        name: /Please input the item name/i,
        purchasePrice: /Please input the purchase price/i,
        salePrice: /Please input the sale price/i,
        quantity: /Please input the quantity/i,
    };

    constructor(p: Page) {
        this.page = p;
        this.title = p.getByText(/edit item/i);

        this.nameInput = p.getByPlaceholder("Enter item name");
        this.descrInput = p.getByPlaceholder("Enter item description");
        this.purchasePriceInput = p.getByPlaceholder("Enter purchase price");
        this.salePriceInput = p.getByPlaceholder("Enter sale price");
        this.quantityInput = p.getByPlaceholder("Enter quantity");

        this.submitButton = p.getByRole("button", { name: /edit/i });
        this.resetButton = p.getByRole("button", { name: /reset/i });
    }

    async goto(id: string) {
        await this.page.goto(`/items/edit/${id}`);
    }

    async addName(n: string) {
        await this.nameInput.fill(n);
    }
    async addDescription(d: string) {
        await this.descrInput.fill(d);
    }
    async addPurchasePrice(price: number | string) {
        await this.purchasePriceInput.fill(`${price}`);
    }
    async addSalePrice(price: number | string) {
        await this.salePriceInput.fill(`${price}`);
    }
    async addQuantity(q: number | string) {
        await this.quantityInput.fill(`${q}`);
    }

    async editItem(i: Item) {
        await this.addName(i.name);
        await this.addDescription(i.description ?? "");
        await this.addPurchasePrice(i.purchasePrice);
        await this.addSalePrice(i.salePrice);
        await this.addQuantity(i.quantity);
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL(/\/items\/edit\/.+/);
    }

    async expectSubmitDisabled(soft: boolean = false) {
        if (!soft) {
            await expect(this.submitButton).toBeDisabled();
            return;
        }
        await expect.soft(this.submitButton).toBeDisabled();
    }

    async expectErrorMessage(e: string | RegExp, timeout?: number) {
        await expect(this.page.getByText(e)).toBeVisible({ timeout });
    }
}
