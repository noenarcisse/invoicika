import { expect, test } from "@playwright/test";

test.describe("Tests négatifs de modifications de client", () => {
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

    [
        {
            title: "pas de @",
            email: "badmemail-gogole.com",
            errMsg: /a valid email/i,
        },
        {
            title: "manque du domain d'extension",
            email: "badmemail@gogole",
            errMsg: /a valid email/i,
        },
        {
            title: "charactere interdit dans le local",
            email: "werbenjägermanjensen@bikinibottom.com",
            errMsg: /a valid email/i,
        },
    ].forEach(({ title, email, errMsg }) => {
        test(`modifier un client avec un email invalide echoue : ${title}`, async ({ page }) => {
            await page.goto("/customers/all");

            const editButtons = page.locator("a[href^='/customers/edit/']");
            const firstEditButton = editButtons.first();

            expect(firstEditButton).toBeVisible();
            await firstEditButton.click();
            expect(page.getByText(/edit customer/i));

            const emailInput = page.getByRole("textbox", {
                name: "Enter email",
            });

            await emailInput.fill(email);
            const editButton = page.getByRole("button", { name: /edit/i });
            const err = page.getByText(errMsg);

            await expect(editButton).toBeDisabled();
            await expect(err).toBeVisible();
        });
    });
});

test.describe("Tests positifs de modification de client", () => {
    test("modifier un client réussit", async ({ page }) => {
        await page.goto("/customers/all");

        const editButtons = page.locator("a[href^='/customers/edit/']");
        const firstEditButton = editButtons.first();

        expect(firstEditButton).toBeVisible();

        await firstEditButton.click();
        const id = page.url().split("/").at(-1) ?? "";

        if (id === "") {
            throw new Error("Couldn't get customer ID from the link");
        }
        console.log(id);

        expect(page.getByText(/edit customer/i));

        const nameInput = page.getByRole("textbox", {
            name: "Enter customer name",
        });
        const addressInput = page.getByRole("textbox", {
            name: "Enter address",
        });
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
        // while (((await page.getByText(customer.name).all()).length <= 0)) {
        //     const next = page.getByRole("listitem", { name: "Next Page" })
        //         .getByRole("button");

        //     expect(next).toBeEnabled();
        //     await next.click();
        // }

        // for (const v of Object.values(customer)) {
        //     await expect(page.getByText(v)).toBeVisible();
        // }
    });

    test("modifier un client avec un numéro de téléphone vide réussit", async ({ page }) => {
        await page.goto("/customers/all");

        const editButtons = page.locator("a[href^='/customers/edit/']");
        const firstEditButton = editButtons.first();

        expect(firstEditButton).toBeVisible();

        await firstEditButton.click();
        const id = page.url().split("/").at(-1) ?? "";

        if (id === "") {
            throw new Error("Couldn't get customer ID from the link");
        }
        console.log(id);

        expect(page.getByText(/edit customer/i));

        const nameInput = page.getByRole("textbox", {
            name: "Enter customer name",
        });
        const addressInput = page.getByRole("textbox", {
            name: "Enter address",
        });
        const phoneInput = page.getByRole("textbox", {
            name: "Enter phone number",
        });
        const emailInput = page.getByRole("textbox", { name: "Enter email" });
        const editButton = page.getByRole("button", { name: /edit/i });

        //je stocke que les visibles, l'adresse est jamais affichée
        const customer = {
            name: `${await nameInput.inputValue()} 2`,
            phone: "",
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
    });

    test("modifier un client avec un email valide réussit : caractere speciaux dans le domaine", async ({ page }) => {
        await page.goto("/customers/all");

        const editButtons = page.locator("a[href^='/customers/edit/']");
        const firstEditButton = editButtons.first();

        expect(firstEditButton).toBeVisible();

        await firstEditButton.click();
        const id = page.url().split("/").at(-1) ?? "";

        if (id === "") {
            throw new Error("Couldn't get customer ID from the link");
        }
        console.log(id);

        expect(page.getByText(/edit customer/i));

        const emailInput = page.getByRole("textbox", { name: "Enter email" });
        const editButton = page.getByRole("button", { name: /edit/i });

        await emailInput.fill("smitty@werberjägermanjensen.com");

        const err = page.getByText(/a valid email/i);

        expect(err).not.toBeVisible({ timeout: 1_000 });

        expect(editButton).toBeEnabled();
        await editButton.click();

        expect(page).toHaveURL("/customers/all");
        await expect(page.getByText(/customer updated successfully/i))
            .toBeVisible();
    });
});
