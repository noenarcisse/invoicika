import { expect, request, test } from "@playwright/test";

const data = {
    jwt: "",
    user: {
        username: "admin",
        password: "admin",
    },
    item: {
        name: "Un tambourrin bourrin",
        desc: "Instrument de prédilection pour les barbares les plus aguerris",
        price: "24.45",
        salePrice: "39.99",
        qty: "42",
    },
    vat: "21",
    customer: {
        name: "Smitty Werberjägermanjensen",
        address: "Deutsche Straße, 401, Bikini Bottom, Sous l'océan",
        phone: "+49 30 9010 1090",
        email: "smitty.w@bikinibottom.de",
    },
};

let dataToClean = {
    item: {
        route: "items/",
        id: "",
    },
    vat: {
        route: "vat/",
        id: "",
    },
    customer: {
        route: "customers/",
        id: "",
    },
};

test.afterEach(async ({ request, page }) => {
    //FR, faut contourner comme l'api renvoie une id erronée
    //faut le chercher a la main en ui
    //recup le nom pour la facture
    const row = page.getByRole("row").filter({ hasText: data.customer.name });
    console.log(await row.count());
    await row.locator('[data-icon="delete"]').click();
    await page.getByRole("button", { name: /yes/i }).click();

    for (const v of Object.values(dataToClean)) {
        const res = await request.delete(
            `http://localhost:5000/api/${v.route}${v.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${data.jwt}`,
                },
            },
        );
        console.log(res.status());
    }
});

test(`Parcours typique d'un administrateur`, async ({ request, page }) => {
    // s'inscrire
    //todo : a implémenter lorsque la feature sera disponible sur le frontend

    // Se connecter
    await page.goto("");
    await expect(page).toHaveURL("/login");

    await page.getByPlaceholder("Username").fill(data.user.username);
    await page.getByPlaceholder("Password").fill(data.user.password);
    const loginButton = page.getByRole("button", { name: "Log in" });

    let [res] = await Promise.all([
        page.waitForResponse(
            (r) =>
                r.url().includes("/api/auth/login") &&
                r.request().method() === "POST",
        ),
        loginButton.click(),
    ]);

    expect(res.ok()).toBeTruthy();
    let content = await res.json();
    expect(content.token).toBeTruthy();

    data.jwt = content.token;
    console.log(data.jwt);

    await expect(page.getByText(/monthly income/i)).toBeVisible();
    await expect(page).toHaveURL("/dashboard");

    //recup du menu
    //on degage settings qui a un sous ul D:
    const menuitems = page.getByRole("listitem").filter({
        hasNot: page.locator("ul"),
    });
    const menulinks = menuitems.getByRole("link");

    // Ajouter un objet

    await menulinks.getByText("Items").click();
    await expect(page).toHaveURL("/items/all");
    await page.getByRole("button", { name: "Add Item" }).click();
    await expect(page).toHaveURL("/items/add");

    await page.getByPlaceholder("Enter item name").fill(data.item.name);
    await page.getByPlaceholder("Enter description").fill(data.item.desc);
    await page.getByPlaceholder("Enter purchase price").fill(data.item.price);
    await page.getByPlaceholder(/sale price/i).fill(data.item.salePrice);
    await page.getByPlaceholder(/quantity/i).fill(data.item.qty);

    let submitButton = page.getByRole("button", { name: /create/i });
    await expect(submitButton).toBeEnabled();

    //403 en employe -_-
    // page.on("response", async (r) => {
    //     if (!r.ok()) {
    //         console.log(r.status(), r.request().method(), r.url());
    //         console.log(await r.text());
    //     }
    // });
    [res] = await Promise.all([
        page.waitForResponse(
            (r) =>
                r.url().includes("/api/items") &&
                r.request().method() === "POST",
        ),
        submitButton.click(),
    ]);

    expect(res.ok()).toBeTruthy();
    content = await res.json();
    expect(content.itemId).toBeTruthy();
    dataToClean.item.id = content.itemId;

    await expect(page).toHaveURL("/items/all");
    await expect(page.getByText(/item added successfully/i)).toBeVisible();

    // Ajouter une TVA
    await menulinks.getByText("VAT").click();
    await expect(page).toHaveURL("/vat/all");
    await page.getByRole("button", { name: "Add VAT" }).click();
    await expect(page).toHaveURL("/vat/add");

    await page.getByPlaceholder("Enter VAT percentage").fill(data.vat);
    submitButton = page.getByRole("button", { name: /create/i });
    await expect(submitButton).toBeEnabled();

    [res] = await Promise.all([
        page.waitForResponse(
            (r) =>
                r.url().includes("/api/vat") &&
                r.request().method() === "POST",
        ),
        submitButton.click(),
    ]);

    expect(res.ok()).toBeTruthy();
    content = await res.json();
    expect(content.vatId).toBeTruthy();
    dataToClean.vat.id = content.vatId;

    // Ajouter un client
    await menulinks.getByText("Customers").click();
    await expect(page).toHaveURL("/customers/all");
    await page.getByRole("button", { name: "Add Customer" }).click();
    await expect(page).toHaveURL("/customers/add");

    await page.getByPlaceholder("Enter customer name").fill(data.customer.name);
    await page.getByPlaceholder("Enter address").fill(data.customer.address);
    await page.getByPlaceholder("Enter phone number").fill(data.customer.phone);
    await page.getByPlaceholder("Enter email").fill(data.customer.email);
    submitButton = page.getByRole("button", { name: /create/i });
    await expect(submitButton).toBeEnabled();

    [res] = await Promise.all([
        page.waitForResponse(
            (r) =>
                r.url().includes("/api/customers") &&
                r.request().method() === "POST",
        ),
        submitButton.click(),
    ]);

    expect(res.ok()).toBeTruthy();
    content = await res.json();
    expect(content.customerId).toBeTruthy();
    dataToClean.customer.id = content.customerId;

    // Créer une facture

    await menulinks.getByText("Invoices").click();
    await expect(page).toHaveURL("/invoices/all");
    await page.getByRole("button", { name: "Add Invoice" }).click();
    await expect(page).toHaveURL("/invoices/add");

    // --

    const customerList = page.locator("[formcontrolname=customerId]");
    await expect(customerList).toBeVisible();

    const dateInput = page.getByRole("textbox", { name: "Select date" });

    const itemList = page.locator("[formcontrolname=item]").first();
    await expect(itemList).toBeVisible();

    await customerList.click();
    const jotaro = page.getByText(data.customer.name);
    await jotaro.click();

    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    const dateStr = future.toISOString().slice(0, 10); // "2027-10-29"

    await dateInput.pressSequentially(dateStr, { delay: 30 });
    await expect(dateInput).toHaveValue(dateStr);

    await itemList.click();
    await page.getByText(data.item.name).click();

    // --

    submitButton = page.getByRole("button", { name: /create/i });
    await expect(submitButton).toBeEnabled();

    await submitButton.click();
    await expect(page).toHaveURL("/invoices/all");
    await expect(page.getByText("Invoice added successfully")).toBeVisible();
});
