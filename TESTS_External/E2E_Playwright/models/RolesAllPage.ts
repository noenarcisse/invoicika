import { expect, Locator, Page } from "@playwright/test";
import { IDataList } from "@interfaces/IDataList.ts";

export class RolesAllPage implements IDataList {
    readonly page: Page;

    readonly title: Locator;
    readonly rolesCells: Locator;

    constructor(p: Page) {
        this.page = p;

        this.title = p.getByText("Roles List");
        this.rolesCells = p.locator("table tbody tr td");
    }

    async goto() {
        await this.page.goto("/roles/all");
    }

    async expectReached() {
        await expect(this.page).toHaveURL("/roles/all");
        await expect(this.title).toBeVisible();
    }

    async getRoles(): Promise<string[]> {
        const roles = [];
        for (const r of await this.rolesCells.all()) {
            roles.push(await r.innerText());
        }

        return roles;
    }
    async hasEmptyData() {
        await expect(this.page.getByText(/No Data/i)).toBeVisible();
    }
    async hasData() {
        await expect(this.page.getByText(/No Data/i)).not.toBeVisible({ timeout: 3_000 });
    }
}
