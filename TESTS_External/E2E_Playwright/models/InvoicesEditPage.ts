import { expect, Locator, Page } from "@playwright/test";

//devin + retake

export class InvoicesEditPage {
    readonly page: Page;

    readonly title: Locator;

    readonly customerList: Locator;
    readonly dateInput: Locator;
    readonly vatList: Locator;

    readonly lineItems: Locator;
    readonly addLineItemButton: Locator;

    readonly subTotalInput: Locator;
    readonly taxInput: Locator;
    readonly totalInput: Locator;

    readonly submitButton: Locator;

    readonly errorMessage = /Error updating invoice/i;

    constructor(p: Page) {
        this.page = p;
        this.title = p.getByText(/invoice details/i);

        this.customerList = p.locator('[formcontrolname="customerId"]');
        this.dateInput = p.locator('[formcontrolname="invoiceDate"] input');
        this.vatList = p.locator('[formcontrolname="vatId"]');

        //weak, pas d'autre moyen de recupérer proprement
        this.lineItems = p.locator(".line-item-row");
        this.addLineItemButton = p.getByRole("button", {
            name: /add line item/i,
        });

        this.submitButton = p.getByRole("button", { name: "Create" });

        //todo:
        //weak a fixer apres ajout coté dev d'un dataId
        this.subTotalInput = p.getByRole("textbox", { disabled: true }).nth(0);
        this.taxInput = p.getByRole("textbox", { disabled: true }).nth(1);
        this.totalInput = p.getByRole("textbox", { disabled: true }).nth(2);

        this.submitButton = p.getByRole("button", { name: /edit/i });
    }

    async goto(id: string) {
        await this.page.goto(`/invoices/edit/${id}`);
    }

    async selectCustomer(c: string | RegExp) {
        await this.customerList.click();
        await this.page.getByText(c).click();
    }

    async selectItem(i: number, item: string | RegExp) {
        const itemSelect = this.lineItems
            .nth(i)
            .locator('[formcontrolname="item"]');
        await itemSelect.click();
        await this.page.getByText(item).click();
    }

    async fillDescription(i: number, d: string) {
        await this.lineItems
            .nth(i)
            .locator('[formcontrolname="description"]')
            .fill(d);
    }

    async fillQuantity(i: number, q: number | string) {
        await this.lineItems
            .nth(i)
            .locator('[formcontrolname="quantity"]')
            .fill(`${q}`);
    }

    async fillPrice(i: number, price: number | string) {
        await this.lineItems
            .nth(i)
            .locator('[formcontrolname="price"]')
            .fill(`${price}`);
    }

    async selectVat(v: string | RegExp) {
        await this.vatList.click();
        await this.page.getByText(v).click();
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

    async addLineItem() {
        await this.addLineItemButton.click();
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL(/\/invoices\/edit\/.+/);
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
