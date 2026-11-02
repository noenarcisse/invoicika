import { expect, test } from "@playwright/test";
import { describe } from "node:test";

describe("Tests négatifs de modifications de client", () => {
    const cases = [
        {
            title: "modifier un client sans nom echoue",
            locatorName: "Enter customer name",
            errMsg: /please input the customer name/i,
        },
        {
            title: "modifier un client sans email echoue",
            locatorName: "Enter email",
            errMsg: /please input the customer email/i,
        },
        {
            title: "modifier un client sans adresse echoue",
            locatorName: "Enter address",
            errMsg: /please input the customer address/i,
        },
    ];

    cases.forEach(({ title, locatorName, errMsg }) => {
        test(title, async ({ page }) => {
            await page.goto("/customers/all");

            const editButtons = page.locator("a[href^='/customers/edit/']");
            const firstEditButton = editButtons.first();

            expect(firstEditButton).toBeVisible();
            await firstEditButton.click();
            expect(page.getByText(/edit customer/i));

            const nameInput = page.getByRole("textbox", {
                name: locatorName,
            });

            await nameInput.fill("");
            const editButton = page.getByRole("button", { name: /edit/i });
            const err = page.getByText(errMsg);

            await expect(editButton).toBeDisabled();
            await expect(err).toBeVisible();
        });
    });
});

test("modifier un client réussit", async ({ page }) => {
    await page.goto("/customers/all");

    const editButtons = page.locator("a[href^='/customers/edit/']");
    const firstEditButton = editButtons.first();

    expect(firstEditButton).toBeVisible();

    await firstEditButton.click();
    const id = page.url().split("/").at(-1) ?? "";

    if (id === "") throw new Error("Couldn't get customer ID from the link");
    console.log(id);

    expect(page.getByText(/edit customer/i));

    const nameInput = page.getByRole("textbox", {
        name: "Enter customer name",
    });
    const addressInput = page.getByRole("textbox", { name: "Enter address" });
    const phoneInput = page.getByRole("textbox", {
        name: "Enter phone number",
    });
    const emailInput = page.getByRole("textbox", { name: "Enter email" });
    const editButton = page.getByRole("button", { name: /edit/i });

    //je stocke que les visibles, l'adresse est jamais affichée
    const customer = {
        name: `${await nameInput.inputValue()} 2`,
        phone: `${await phoneInput.inputValue()} 2`,
        email: `${await emailInput.inputValue()}2`,
    };

    await nameInput.fill(customer.name);
    await addressInput.fill(`${await addressInput.inputValue()} 2`);
    await phoneInput.fill(customer.phone);
    await emailInput.fill(customer.email);

    await editButton.click();

    expect(page).toHaveURL("/customers/all");
    await expect(page.getByText(/customer updated successfully/i))
        .toBeVisible();

    //todo
    //c'est du E2E ou du compo, ca fait du test d'intégration complet a partir d'ici ?

    //retries, avec la pagination du gars faut possiblement aller chercher dans toutes les pages
    //c'est hyper random, parfois un edit envoie a la fin parfois pas :x
    //j'abandonne si le button next est off
    while (((await page.getByText(customer.name).all()).length <= 0)) {
        const next = page.getByRole("listitem", { name: "Next Page" })
            .getByRole("button");

        expect(next).toBeEnabled();
        await next.click();
    }

    for (const v of Object.values(customer)) {
        await expect(page.getByText(v)).toBeVisible();
    }
});
