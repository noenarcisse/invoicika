import { expect, Locator, Page } from "@playwright/test";
import { IDataList } from "@interfaces/IDataList.ts";

export class UsersAllPage implements IDataList {
    readonly page: Page;

    readonly title: Locator;
    readonly addButton: Locator;
    readonly usersRows: Locator;

    readonly editButtonsPattern: string;
    readonly deleteButtonsPattern: string;

    readonly validationMessage: {
        // add: string | RegExp; //not impletmented
        edit: string | RegExp;
        delete: string | RegExp;
    };

    constructor(p: Page) {
        this.page = p;

        this.title = p.getByText("Users List");
        this.addButton = p.getByRole("button", { name: /add user/i });
        this.usersRows = p.locator("table tbody tr");

        this.editButtonsPattern = 'a[href^="/vat/edit/"]';
        this.deleteButtonsPattern = 'svg[data-icon="delete"]';

        this.validationMessage = {
            // add: /VAT added successfully/i,
            edit: /User updated successfully/i,
            delete: /User deleted successfully/i,
        };
    }

    async goto() {
        await this.page.goto("/users/all");
    }

    async removeUser(i: number) {
        if (i >= (await this.usersRows.all()).length) return;
        await this.usersRows.nth(i).locator(this.deleteButtonsPattern).click();
    }

    async expectReached() {
        await expect(this.page).toHaveURL("/users/all");
        await expect(this.title).toBeVisible();
    }
    async hasEmptyData() {
        await expect(this.page.getByText(/No Data/i)).toBeVisible();
    }
    async hasData() {
        await expect(this.page.getByText(/No Data/i)).not.toBeVisible({ timeout: 3_000 });
    }
}
