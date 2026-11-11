import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly statTexts = [
        /monthly income/i,
        /monthly invoices/i,
        /monthly customers/i,
    ];

    constructor(p: Page) {
        this.page = p;
    }

    async goto() {
        await this.page.goto("/dashboard");
    }

    async expectReached() {
        await expect(this.page).toHaveURL("/dashboard");
        for (const st of this.statTexts) {
            await expect(this.page.getByText(st)).toBeVisible();
        }
    }
}
