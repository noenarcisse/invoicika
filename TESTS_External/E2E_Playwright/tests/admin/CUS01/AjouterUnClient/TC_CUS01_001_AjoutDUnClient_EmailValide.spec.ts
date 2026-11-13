import { API_BASEURL } from "@data/constants";
import { CustomersAddPage } from "@models/CustomersAddPage";
import { CustomersAllPage } from "@models/CustomersAllPage";
import { expect, test } from "@playwright/test";

test.describe("Tests positifs d'ajout d'un client", () => {
    //teardown
    test.afterEach(async ({ request }) => {
        type Customer = { customerId: string; name: string };

        const res = await request.get(`${API_BASEURL}/Customers`);
        if (res.status() != 200) return;

        const customers = (await res.json()).items;
        const smitties: Customer[] = customers.filter((c: Customer) =>
            c.name.toLowerCase().includes("smitty")
        );

        for (const s of smitties) {
            await request.delete(
                `${API_BASEURL}/Customers/${s.customerId}`,
            );
        }
    });

    [
        {
            title:
                "entrer un email valide avec double extension de domaine réussit",
            email: "smitty@amazon.com.be",
        },
        {
            title:
                "entrer un email valide avec caractere speciaux dans le domaine réussit",
            email: "smitty@werberjägermanjansen.com",
        },
    ].forEach(({ title, email }) => {
        test(title, async ({ page }) => {
            const cusadd = new CustomersAddPage(page);
            const cusall = new CustomersAllPage(page);
            await cusadd.goto();

            await cusadd.addCustomer({
                name: "smitty",
                email,
            });

            await cusadd.submit();

            await cusall.expectReached();
            await cusall.expectErrorMessage(cusall.validationMessage.add);
        });
    });

    // test("entrer un email valide avec double extension de domaine réussit", async ({ page }) => {
    //     await page.goto("/customers/add");

    //     const nameInput = page.getByRole("textbox", {
    //         name: "Enter customer name",
    //     });
    //     const emailInput = page.getByPlaceholder(/email/);
    //     const submitButton = page.getByRole("button", { name: /create/i });

    //     await expect(nameInput).toBeVisible();
    //     await expect(emailInput).toBeVisible();
    //     await expect(submitButton).toBeVisible();

    //     await nameInput.fill("smitty");
    //     await emailInput.fill("smitty@amazon.com.be");

    //     const err = page.getByText(/valid email/);
    //     await expect(err).not.toBeVisible({ timeout: 3_000 });

    //     await expect(submitButton).toBeEnabled();

    //     await submitButton.click();
    //     await expect(page).toHaveURL("http://localhost:4444/customers/all");
    //     const greatSuccess = page.getByText("Customer added successfully");
    //     await expect(greatSuccess).toBeVisible();
    // });

    // test("entrer un email valide avec caractere speciaux dans le domaine réussit", async ({ page }) => {
    //     await page.goto("/customers/add");

    //     const emailInput = page.getByPlaceholder(/email/);
    //     await expect(emailInput).toBeVisible();

    //     await emailInput.fill("smitty@werberjägermanjansen.com");

    //     const err = page.getByText(/valid email/);
    //     await expect(err).not.toBeVisible({ timeout: 3_000 }); //todo : unreliable, ca peut passer frame 1 avant l'apparition ?

    //     //click sur valider et process juqu'a la page suivante
    // });
});

test("entrer un email invalide sans @ echoue", async ({ page }) => {
    const cusadd = new CustomersAddPage(page);
    await cusadd.goto();

    await cusadd.addCustomer({
        name: "smitty",
        email: "smitty-werberjägermanjansen.com",
    });

    await cusadd.expectErrorMessage(/valid email/i);
});

test("entrer un email invalide sans extension de domaine echoue", async ({ page }) => {
    const cusadd = new CustomersAddPage(page);
    await cusadd.goto();
    await cusadd.addEmail("smitty@werberjagermanjansen");

    await cusadd.expectErrorMessage(/valid email/i);
});

test("entrer un email avec caractere speciaux dans la partie locale échoue", async ({ page }) => {
    const cusadd = new CustomersAddPage(page);
    await cusadd.goto();
    await cusadd.addEmail("smitty.werberjägermanjansen@google.com");

    await cusadd.expectErrorMessage(/valid email/i);
});
