import { CustomersAddPage } from "@models/CustomersAddPage";
import { CustomersAllPage } from "@models/CustomersAllPage";
import { test } from "@playwright/test";

test("ajouter un client avec email réussit", async ({ page }) => {
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
test("ajouter un client sans email échoue", async ({ page }) => {
    const cusadd = new CustomersAddPage(page);
    await cusadd.goto();

    await cusadd.addCustomer({
        name: "Smitty Werbenjägermanjansen",
        email: "",
    });
    cusadd.expectSubmitDisabled();
});
