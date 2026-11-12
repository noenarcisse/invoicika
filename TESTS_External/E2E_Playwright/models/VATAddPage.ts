import { expect, Locator, Page } from "@playwright/test";

export class VATAddPage {
    readonly page: Page;

    readonly title: Locator;
    readonly vatInput: Locator;
    readonly submitButton: Locator;

    readonly errMessages: {
        empty: string | RegExp;
        less: string | RegExp;
        more: string | RegExp;
    };

    constructor(p: Page) {
        this.page = p;

        this.title = p.getByText("Add VAT");
        this.vatInput = p.getByPlaceholder("Enter VAT percentage");
        this.submitButton = p.getByRole("button", { name: /create/i });

        this.errMessages = {
            empty: /please input the VAT percentage!/,
            less: /cannot be less than 0/,
            more: /cannot be more than 100/,
        };
    }

    async goto() {
        await this.page.goto("/vat/add");
    }

    async addVAT(v: number) {
        await this.vatInput.fill(`${v}`);
        await this.submitButton.click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL("/vat/add");
        await expect(this.title).toBeVisible();
    }

    async expectSubmitDisabled() {
        await expect(this.submitButton).toBeDisabled();
    }

    async expectEmptyError() {
        await expect(this.page.getByText(this.errMessages.empty)).toBeVisible();
    }
    async expectLessThanError() {
        await expect(this.page.getByText(this.errMessages.less)).toBeVisible();
    }
    async expectMoreThanError() {
        await expect(this.page.getByText(this.errMessages.more)).toBeVisible();
    }
}
