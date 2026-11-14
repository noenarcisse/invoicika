import { CustomersAllPage } from "@models/CustomersAllPage";
import { CustomersEditPage } from "@models/CustomersEditPage";
import { expect, test } from "@playwright/test";
import { extractIdFromURL } from "@helpers/helpers";

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
            const cusall = new CustomersAllPage(page);
            const cusedit = new CustomersEditPage(page);
            await cusall.goto();

            await page.locator(cusall.editButtonsPattern).first()
                .click();

            expect(page.getByText(/edit customer/i));

            await cusedit.expectReached();
            await cusedit.page.getByPlaceholder(locatorName).fill("");

            await cusedit.expectErrorMessage(errMsg, 3_000);
            await cusedit.expectSubmitDisabled();
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
            const cusall = new CustomersAllPage(page);
            const cusedit = new CustomersEditPage(page);
            await cusall.goto();

            await page.locator(cusall.editButtonsPattern).first()
                .click();

            expect(page.getByText(/edit customer/i));

            await cusedit.expectReached();
            await cusedit.addEmail(email);

            await cusedit.expectErrorMessage(errMsg, 3_000);
            await cusedit.expectSubmitDisabled();
        });
    });
});

test.describe("Tests positifs de modification de client", () => {
    test("modifier un client réussit", async ({ page }) => {
        const cusall = new CustomersAllPage(page);
        const cusedit = new CustomersEditPage(page);
        await cusall.goto();

        await page.locator(cusall.editButtonsPattern).first()
            .click();

        expect(page.getByText(/edit customer/i));

        await cusedit.expectReached();

        await cusedit.addCustomer({
            name: `${await cusedit.nameInput.inputValue()} 2`,
            email: `${await cusedit.emailInput.inputValue()}2`,
            phone: `${await cusedit.phoneInput.inputValue()} 2`,
            address: "truc",
        });

        await cusedit.submit();

        // the point of this?
        // const id = page.url().split("/").at(-1) ?? "";
        // if (id === "") {
        //     throw new Error("Couldn't get customer ID from the link");
        // }
        // console.log(id);
        //END  the point of this?

        await cusall.expectReached();
        await cusall.expectErrorMessage(cusall.validationMessage.edit);
    });

    test("modifier un client avec un numéro de téléphone vide réussit", async ({ page }) => {
        const cusall = new CustomersAllPage(page);
        const cusedit = new CustomersEditPage(page);
        await cusall.goto();

        await page.locator(cusall.editButtonsPattern).first()
            .click();

        expect(page.getByText(/edit customer/i));

        const id = extractIdFromURL(page.url());
        console.log(id);

        await cusedit.addCustomer({
            name: `${await cusedit.nameInput.inputValue()} 2`,
            email: `${await cusedit.emailInput.inputValue()} 2`,
            address: `${await cusedit.addressInput.inputValue()} 2`,
        });

        await cusedit.submit();

        await cusall.expectReached();
        await cusall.expectErrorMessage(cusall.validationMessage.add);
    });

    test("modifier un client avec un email valide réussit : caractere speciaux dans le domaine", async ({ page }) => {
        const cusall = new CustomersAllPage(page);
        const cusedit = new CustomersEditPage(page);
        await cusall.goto();

        await page.locator(cusall.editButtonsPattern).first()
            .click();

        expect(page.getByText(/edit customer/i));
        await cusedit.expectReached();

        await cusedit.addEmail("smitty@werberjägermanjensen.com");
        await cusedit.expectSubmitDisabled();

        await cusall.expectReached();
        await cusall.expectErrorMessage(cusall.validationMessage.edit);
    });
});
