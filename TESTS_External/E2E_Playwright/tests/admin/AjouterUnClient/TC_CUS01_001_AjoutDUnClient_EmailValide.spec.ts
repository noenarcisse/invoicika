import { expect, test } from "@playwright/test";
import { afterEach, describe } from "node:test";

describe("Tests positifs d'ajout d'un client", () => {
    //teardown
    test.afterEach(async ({ request }) => {
        type Customer = { customerId: string; name: string };

        const res = await request.get("http://localhost:5000/api/Customers");
        if (res.status() != 200) return;

        const customers = (await res.json()).items;
        const smitties: Customer[] = customers.filter((c: Customer) =>
            c.name.toLowerCase().includes("smitty")
        );

        console.log(smitties);

        for (const s of smitties) {
            await request.delete(
                `http://localhost:5000/api/Customers/${s.customerId}`,
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
            await page.goto("/customers/add");

            const nameInput = page.getByRole("textbox", {
                name: "Enter customer name",
            });
            const emailInput = page.getByPlaceholder(/email/);
            const submitButton = page.getByRole("button", { name: /create/i });

            await expect(nameInput).toBeVisible();
            await expect(emailInput).toBeVisible();
            await expect(submitButton).toBeVisible();

            await nameInput.fill("smitty");
            await emailInput.fill(email);

            const err = page.getByText(/valid email/);
            await expect(err).not.toBeVisible({ timeout: 3_000 });

            await expect(submitButton).toBeEnabled();

            await submitButton.click();
            await expect(page).toHaveURL("http://localhost:4444/customers/all");
            const greatSuccess = page.getByText("Customer added successfully");
            await expect(greatSuccess).toBeVisible();
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
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty-werberjägermanjansen.com");

    const err = page.getByText(/valid email/);
    await expect(err).toBeVisible();
});

test("entrer un email invalide sans extension de domaine echoue", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty@werberjagermanjansen");

    const err = page.getByText(/valid email/);
    await expect(err).toBeVisible();
});

test("entrer un email avec caractere speciaux dans la partie locale échoue", async ({ page }) => {
    await page.goto("/customers/add");

    const emailInput = page.getByPlaceholder(/email/);
    await expect(emailInput).toBeVisible();

    await emailInput.fill("smitty.werberjägermanjansen@google.com");

    const err = page.getByText(/valid email/);
    await expect(err).toBeVisible();
});
