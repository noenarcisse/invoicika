import { CustomersAddPage } from "@models/CustomersAddPage.ts";
import { CustomersAllPage } from "@models/CustomersAllPage.ts";
import { test } from "@playwright/test";

test("ajouter un client avec email réussit", {
    tag: "@customers",
}, async ({ page }) => {
    const cusadd = new CustomersAddPage(page);
    const cusall = new CustomersAllPage(page);
    await cusadd.goto();

    await cusadd.addCustomer({
        name: "Smitty Werbenjägermanjansen",
        email: "smitty@werberjagermanjansen.com",
    });

    await cusadd.submit();

    await cusall.expectReached();
    await cusall.expectErrorMessage(cusall.validationMessage.add);
});

//doit echouer -> voir RM
test("ajouter un client sans email échoue", {
    tag: "@customers",
}, async ({ page }) => {
    const cusadd = new CustomersAddPage(page);
    await cusadd.goto();

    await cusadd.addCustomer({
        name: "Smitty Werbenjägermanjansen",
        email: "",
    });
    cusadd.expectSubmitDisabled();
});
