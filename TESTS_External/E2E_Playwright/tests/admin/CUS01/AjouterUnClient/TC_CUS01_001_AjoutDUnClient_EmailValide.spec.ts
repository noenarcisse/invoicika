import { API_BASEURL } from "@data/constants.ts";
import { CustomersAddPage } from "@models/CustomersAddPage.ts";
import { CustomersAllPage } from "@models/CustomersAllPage.ts";
import { test } from "@playwright/test";

test.describe("Tests positifs d'ajout d'un client", {
    tag: "@customers",
}, () => {
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
            title: "entrer un email valide avec double extension de domaine réussit",
            email: "smitty@amazon.com.be",
        },
        {
            title: "entrer un email valide avec caractere speciaux dans le domaine réussit",
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
});

test("entrer un email invalide sans @ echoue", {
    tag: "@customers",
}, async ({ page }) => {
    const cusadd = new CustomersAddPage(page);
    await cusadd.goto();

    await cusadd.addCustomer({
        name: "smitty",
        email: "smitty-werberjägermanjansen.com",
    });

    await cusadd.expectErrorMessage(/valid email/i);
});

test("entrer un email invalide sans extension de domaine echoue", {
    tag: "@customers",
}, async ({ page }) => {
    const cusadd = new CustomersAddPage(page);
    await cusadd.goto();
    await cusadd.addEmail("smitty@werberjagermanjansen");

    await cusadd.expectErrorMessage(/valid email/i);
});

test("entrer un email avec caractere speciaux dans la partie locale échoue", {
    tag: "@customers",
}, async ({ page }) => {
    const cusadd = new CustomersAddPage(page);
    await cusadd.goto();
    await cusadd.addEmail("smitty.werberjägermanjansen@google.com");

    await cusadd.expectErrorMessage(/valid email/i);
});
