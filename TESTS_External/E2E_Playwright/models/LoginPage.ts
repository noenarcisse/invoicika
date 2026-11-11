import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    // readonly defaultTimeout = 1_000;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    readonly emptyUsernameErr = /input your username/i;
    readonly emptyPasswordErr = /input your password/i;
    readonly wrongCrendentialsErr = /invalid username or password/i;

    constructor(p: Page) {
        this.page = p;
        this.usernameInput = p.getByPlaceholder("Username");
        this.passwordInput = p.getByPlaceholder("Password");
        this.submitButton = p.getByRole("button", { name: "Log in" });
    }

    async goto() {
        await this.page.goto("/login");
    }

    /***
     * Login on the LoginPage
     * @param u - Username
     * @param p - Password
     */
    async login(u: string, p: string) {
        await this.usernameInput.fill(u);
        await this.passwordInput.fill(p);
        await this.submitButton.click();
    }

    async expectEmptyUsernameError() {
        await expect(this.page.getByText(this.emptyUsernameErr))
            .toBeVisible();
    }

    async expectEmptyPasswordError() {
        await expect(this.page.getByText(this.emptyPasswordErr))
            .toBeVisible();
    }
    async expectWrongCredentialsError() {
        await expect(this.page.getByText(this.wrongCrendentialsErr))
            .toBeVisible();
    }
}
