import { expect, test } from "@playwright/test";

test.describe("Tests positifs d'ajout de TVA", () => {
    type vatDTO = { vatId: string };

    let vatIdToClean: string = "";

    const cases = [
        {
            title: "Ajouter une valeur a 99% réussit",
            vat: "99",
        },
        {
            title: "Ajouter une valeur a 0.01% réussit",
            vat: "0.01",
        },
        {
            title: "Ajouter une valeur a 0% réussit",
            vat: "0",
        },
    ];

    //teardown
    test.afterEach(async ({ request }) => {
        if (vatIdToClean == "") return;

        const res = await request.get(
            `http://localhost:5000/api/vat/${vatIdToClean}`,
        );
        if (res.status() != 200) return;

        await request.delete(
            `http://localhost:5000/api/vat/${vatIdToClean}`,
        );
    });

    cases.forEach(({ title, vat }) => {
        test(title, async ({ page }) => {
            await page.goto("/vat/add");

            const vatInput = page.getByPlaceholder("Enter VAT percentage");
            const submitButton = page.getByRole("button", {
                name: /create/i,
            });

            await expect(vatInput).toBeVisible();
            await expect(submitButton).toBeVisible();

            await vatInput.fill(vat);

            const err = page.getByText(/Please input the VAT percentage!/);
            await expect(err).not.toBeVisible({ timeout: 3_000 });

            await expect(submitButton).toBeEnabled();

            const [response] = await Promise.all([
                page.waitForResponse((r) =>
                    r.url().includes("/api/vat") &&
                    r.request().method() === "POST"
                ),
                submitButton.click(),
            ]);

            const vatAdded: vatDTO = await response.json();
            vatIdToClean = vatAdded.vatId;

            await expect(page).toHaveURL("/vat/all");
            const greatSuccess = page.getByText("VAT added successfully");
            await expect(greatSuccess).toBeVisible();
            await expect(page.getByText(vat).first()).toBeVisible();
        });
    });
});

/***
 * Les valeurs ont été alignées sur les informations visibles par l'utilisateur dans l'UI
 * En réalité, l'API semble accepter des valeurs allant de 0 à 99.99
 * et renvoie un message d'erreur différent du frontend
 *
 * Les bornes 100 et 101 existent uniquement car j'ai observé une anomalie de gestion d'erreur
 * en test manuel exploratoire
 */
test.describe("Tests négatifs d'ajout de TVA", () => {
    const cases = [
        {
            title: "Ajouter une valeur a 99.99% rate",
            vat: "99.99",
            err: /cannot be more than/,
        },
        {
            title: "Ajouter une valeur a 100% rate",
            vat: "100",
            err: /cannot be more than/,
        },
        {
            title: "Ajouter une valeur a 101% rate",
            vat: "101",
            err: /cannot be more than/,
        },
        {
            title: "Ajouter une valeur a -1% rate",
            vat: "-1",
            err: /cannot be less than/,
        },
    ];

    cases.forEach(({ title, vat, err }) => {
        test(title, async ({ page }) => {
            await page.goto("/vat/add");

            const vatInput = page.getByPlaceholder("Enter VAT percentage");
            const submitButton = page.getByRole("button", {
                name: /create/i,
            });

            await expect(vatInput).toBeVisible();
            await expect(submitButton).toBeVisible();

            await vatInput.fill(vat);

            const errShown = page.getByText(err);
            await expect(errShown).toBeVisible({ timeout: 3_000 });

            await expect(submitButton).toBeDisabled();
        });
    });
});

test("Ajouter une valeur a 0.001% rate", async ({ page }) => {
    await page.goto("/vat/add");

    const vatInput = page.getByPlaceholder("Enter VAT percentage");
    const submitButton = page.getByRole("button", {
        name: /create/i,
    });

    await expect(vatInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    await vatInput.fill("0.001");

    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    //must fail, bad format, expect a VAT with XX,XX%
    const err = page.getByText(/error adding/);
    await expect(err).toBeVisible({ timeout: 3_000 });
});

test.describe("Tests valides liés a la localisation", () => {
    test.use({ locale: "fr-BE" });

    test("Ajouter une valeur a 0,01% réussit", async ({ page }) => {
        await page.goto("/vat/add");

        const vatInput = page.getByPlaceholder("Enter VAT percentage");
        const submitButton = page.getByRole("button", {
            name: /create/i,
        });

        await expect(vatInput).toBeVisible();
        await expect(submitButton).toBeVisible();

        await vatInput.pressSequentially("0,01");

        const err = page.getByText(/Please input the VAT percentage!/);
        await expect(err).not.toBeVisible({ timeout: 3_000 });

        await expect(submitButton).toBeEnabled();

        await submitButton.click();

        await expect(page).toHaveURL("/vat/all");
        const greatSuccess = page.getByText("VAT added successfully");
        await expect(greatSuccess).toBeVisible();
    });

    test("Ajouter une valeur 'a' rate", async ({ page }) => {
        await page.goto("/vat/add");

        const vatInput = page.getByPlaceholder("Enter VAT percentage");
        const submitButton = page.getByRole("button", {
            name: /create/i,
        });

        await expect(vatInput).toBeVisible();
        await expect(submitButton).toBeVisible();

        await vatInput.pressSequentially("aaa");

        const err = page.getByText(/Please input the VAT percentage!/);
        await expect(err).toBeVisible({ timeout: 3_000 });

        await expect(submitButton).toBeDisabled();
    });
});
