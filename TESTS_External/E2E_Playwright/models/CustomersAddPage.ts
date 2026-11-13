import { expect, Locator, Page } from "@playwright/test";

type Customer = {
    name: string;
    email: string;
    address?: string;
    phone?: string;
};

export class CustomersAddPage {
    readonly page: Page;

    readonly title: Locator;

    readonly nameInput: Locator;
    readonly addressInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;

    readonly submitButton: Locator;

    constructor(p: Page) {
        this.page = p;
        this.title = p.getByText("Add Customer");

        this.nameInput = p.getByPlaceholder("Enter customer name");
        this.addressInput = p.getByPlaceholder("Enter address");
        this.phoneInput = p.getByPlaceholder("Enter phone number");
        this.emailInput = p.getByPlaceholder("Enter email");

        this.submitButton = p.getByRole("button", { name: "Create" });
    }

    async goto() {
        await this.page.goto("/customers/add");
    }

    async addName(n: string) {
        await this.nameInput.fill(n);
    }
    async addAddress(a: string) {
        await this.addressInput.fill(a);
    }
    async addPhone(p: string) {
        await this.addressInput.fill(p);
    }
    async addEmail(e: string) {
        await this.addressInput.fill(e);
    }

    async addCustomer(c: Customer) {
        await this.addName(c.name);
        await this.addAddress(c.address ?? "");
        await this.addPhone(c.phone ?? "");
        await this.addEmail(c.email);
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL("/customers/add");
    }

    async expectSubmitDisabled(soft: boolean = false) {
        if (!soft) {
            await expect(this.submitButton).toBeDisabled();
            return;
        }
        await expect.soft(this.submitButton).toBeDisabled();
    }

    async expectErrorMessage(e: string | RegExp, timeout?: number) {
        await expect(this.page.getByText(e)).not.toBeVisible({ timeout });
    }
}
