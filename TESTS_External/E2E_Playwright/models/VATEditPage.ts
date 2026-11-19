import { expect, Locator, Page } from "@playwright/test";

export class VATEditPage {
    readonly page: Page;

    readonly title: Locator;

    readonly percentageInput: Locator;

    readonly submitButton: Locator;
    readonly resetButton: Locator;

    readonly errMessages: {
        add: string | RegExp;
        empty: string | RegExp;
        less: string | RegExp;
        more: string | RegExp;
    };

    constructor(p: Page) {
        this.page = p;
        this.title = p.getByText(/edit vat/i);

        this.percentageInput = p.getByPlaceholder("Enter VAT percentage");

        this.submitButton = p.getByRole("button", { name: /edit/i });
        this.resetButton = p.getByRole("button", { name: /reset/i });

        this.errMessages = {
            add: /error updating/i,
            empty: /please input the VAT percentage!/,
            less: /cannot be less than 0/,
            more: /cannot be more than 100/,
        };
    }

    async goto(id: string) {
        await this.page.goto(`/vat/edit/${id}`);
    }

    async addPercentage(v: number | string) {
        await this.percentageInput.fill(`${v}`);
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL(/\/vat\/edit\/.+/);
        await expect(this.title).toBeVisible();
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

    async expectEmptyError(timeout?: number) {
        await expect(this.page.getByText(this.errMessages.empty)).toBeVisible({
            timeout,
        });
    }
    async expectLessThanError(timeout?: number) {
        await expect(this.page.getByText(this.errMessages.less)).toBeVisible({
            timeout,
        });
    }
    async expectMoreThanError(timeout?: number) {
        await expect(this.page.getByText(this.errMessages.more)).toBeVisible({
            timeout,
        });
    }
}
