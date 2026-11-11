import { expect, Locator, Page } from "@playwright/test";

export class InvoicesAddPage {
    readonly page: Page;

    readonly title: Locator;
    readonly customerList: Locator;
    readonly dateInput: Locator;
    readonly itemList: Locator;
    readonly submitButton: Locator;

    readonly minusButton: Locator;

    constructor(p: Page) {
        this.page = p;
        this.title = p.getByText("Add Customer");
        this.customerList = p.locator("[formcontrolname=customerId]");
        this.dateInput = p.getByRole("textbox", { name: "Select date" });

        //off ca non ? j'ai reucp d'un test écrit vite et concret le first est sus
        //il est prep par defaut sur la page actuelle
        //mais rien garantit qu'il reste la tout le temps
        this.itemList = p.locator("[formcontrolname=item]").first();
        //meme comm, unsafe
        this.minusButton = p.locator('[formcontrolname="total"]')
            .locator("xpath=following-sibling::*[1]");
        this.submitButton = p.getByRole("button", { name: "Create" });
    }

    async goto() {
        await this.page.goto("/invoices/add");
    }

    async selectCustomer(c: string | RegExp) {
        await this.customerList.click();
        await this.page.getByText(c).click();
    }
    async selectItem(i: string | RegExp) {
        await this.itemList.click();
        await this.page.getByText(i).click();
    }
    /***
     * Automatically fill the date input with the current time + one year
     */
    async fillDate() {
        const future = new Date();
        future.setFullYear(future.getFullYear() + 1);
        const dateStr = future.toISOString().slice(0, 10); // "2027-10-29"

        this.dateInput.pressSequentially(dateStr, { delay: 30 });
        await expect(this.dateInput).toHaveValue(dateStr);
    }

    async expectSubmitDisabled(soft: boolean = false) {
        if (!soft) {
            await expect(this.submitButton).toBeDisabled();
            return;
        }
        await expect.soft(this.submitButton).toBeDisabled();
    }
}
