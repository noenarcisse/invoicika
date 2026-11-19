import { expect, Locator, Page } from "@playwright/test";

type User = {
    username: string;
    email: string;
    role?: string | RegExp;
    password?: string;
};

export class UsersEditPage {
    readonly page: Page;

    readonly title: Locator;

    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly roleList: Locator;
    readonly photoInput: Locator;
    readonly passwordInput: Locator;

    readonly submitButton: Locator;
    readonly resetButton: Locator;

    readonly errorMessages = {
        username: /Please input the username/i,
        email: /Please input the username/i,
        // c'est une err si quoi que ce soit manque dans la DB, ca peut etre 500 ou 404 etc
        dbError: /Error loading user details/i,
    };

    constructor(p: Page) {
        this.page = p;
        this.title = p.getByText(/edit user/i);

        this.usernameInput = p.getByPlaceholder("Enter username");
        this.emailInput = p.getByPlaceholder("Enter email");
        this.roleList = p.locator('[formcontrolname="role_id"]');
        this.photoInput = p.locator('input[type="file"]');
        this.passwordInput = p.locator('[formcontrolname="passwordHash"]');

        this.submitButton = p.getByRole("button", { name: /edit/i });
        this.resetButton = p.getByRole("button", { name: /reset/i });
    }

    async goto(id: string) {
        await this.page.goto(`/users/edit/${id}`);
    }

    async addUsername(u: string) {
        await this.usernameInput.fill(u);
    }
    async addEmail(e: string) {
        await this.emailInput.fill(e);
    }
    async selectRole(r: string | RegExp) {
        await this.roleList.click();
        await this.page.getByText(r).click();
    }
    async addPassword(pw: string) {
        await this.passwordInput.fill(pw);
    }

    // todo : test further this before use
    /***
     * todo : test further this before use
     */
    async addPhoto(path: string) {
        await this.photoInput.setInputFiles(path);
    }

    async editUser(u: User) {
        await this.addUsername(u.username);
        await this.addEmail(u.email);
        if (u.role !== undefined) {
            await this.selectRole(u.role);
        }
        if (u.password !== undefined) {
            await this.addPassword(u.password);
        }
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL(/\/users\/edit\/.+/);
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
