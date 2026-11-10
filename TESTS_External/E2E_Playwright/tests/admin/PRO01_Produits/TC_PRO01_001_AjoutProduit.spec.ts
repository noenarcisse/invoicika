import { expect, test } from "@playwright/test";
import { randomUUID as uuid } from "node:crypto";

test.describe("Tests positifs d'ajout d'un produit", () => {
    type itemDTO = { itemId: string };

    let idToClean: string = "";

    const cases = [
        {
            title: "Ajouter un produit valide sans description réussit",
            name: `TestItem_${uuid()}`,
            purchasePrice: "1",
            salePrice: "2",
            quantity: "1",
        },
        {
            title: "Ajouter un produit valide avec description réussit",
            name: `TestItem_${uuid()}`,
            description: "Un autre test mais avec une description",
            purchasePrice: "1",
            salePrice: "2",
            quantity: "1",
        },
        {
            title: "Ajouter un produit valide avec description de 1024 réussit",
            name: `TestItem_${uuid()}`,
            description:
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a diam venenatis, faucibus dui a, luctus nisi. Nullam elementum, lectus at consectetur facilisis, lorem risus auctor urna, non varius libero elit a dolor. Fusce at posuere justo, quis feugiat lectus. Quisque faucibus arcu a feugiat gravida. Vivamus sed consequat felis, non malesuada sem. Cras mollis, tellus eget faucibus interdum, erat leo imperdiet est, eu faucibus tortor magna eu dolor. Nam vel massa faucibus, venenatis ex eget, suscipit quam. Aenean sed ornare tellus. Cras pretium tortor dui, eget dapibus ligula iaculis at. Sed lobortis tristique pharetra. Suspendisse scelerisque, elit quis iaculis accumsan, nunc est consectetur tellus, eu semper tellus tellus at neque. Praesent finibus vehicula mi sed finibus.
Vestibulum vel ex at metus pulvinar euismod. Nulla sodales tempor libero quis feugiat. Vivamus vel euismod felis, eget blandit elit. Vivamus non tempus nunc. Mauris hendrerit justo eu ligula luctus, at varius dolor sodales. Sed iaculis o`,
            purchasePrice: "1",
            salePrice: "2",
            quantity: "1",
        },
    ];

    //teardown
    test.afterEach(async ({ page, request }) => {
        if (idToClean == "") return;

        const token = await page.evaluate(() => localStorage.getItem("token"));

        const res = await request.get(
            `http://localhost:5000/api/items/${idToClean}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (res.status() != 200) return;

        await request.delete(
            `http://localhost:5000/api/items/${idToClean}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    });

    cases.forEach(
        ({ title, name, purchasePrice, salePrice, quantity, description }) => {
            test(title, async ({ page }) => {
                await page.goto("/items/add");

                const nameInput = page.getByPlaceholder("Enter item name");
                const descrInput = page.getByPlaceholder(
                    "Enter description",
                );
                const salePriceInput = page.getByPlaceholder(
                    "Enter sale price",
                );
                const purchasePriceInput = page.getByPlaceholder(
                    "Enter purchase price",
                );
                const quantityInput = page.getByPlaceholder("Enter quantity");
                const submitButton = page.getByRole("button", {
                    name: /create/i,
                });

                await nameInput.fill(name);
                await descrInput.fill(description ?? "");
                await salePriceInput.fill(salePrice);
                await purchasePriceInput.fill(purchasePrice);
                await quantityInput.fill(quantity);

                await expect(submitButton).toBeEnabled();

                const [response] = await Promise.all([
                    page.waitForResponse((r) =>
                        r.url().includes("/api/items") &&
                        r.request().method() === "POST"
                    ),
                    submitButton.click(),
                ]);

                const vatAdded: itemDTO = await response.json();
                idToClean = vatAdded.itemId;

                await expect(page).toHaveURL("/items/all");
                const greatSuccess = page.getByText(/added successfully/i);
                await expect(greatSuccess).toBeVisible();
                await expect(page.getByText(name).first()).toBeVisible();
            });
        },
    );
});

//todo : wip
test.describe.fixme("Tests négatifs d'ajout d'un produit", () => {
    const cases = [
        {
            title: "Ajouter un produit sans nom affiche une erreur",
            name: "",
            purchasePrice: "1",
            salePrice: "2",
            quantity: "1",
            err: /input the item name/i,
        },
        {
            title:
                "Ajouter un produit avec une description de 1025 caractères affiche une erreur",
            name: `TestItem_${uuid()}`,
            description:
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a diam venenatis, faucibus dui a, luctus nisi. Nullam elementum, lectus at consectetur facilisis, lorem risus auctor urna, non varius libero elit a dolor. Fusce at posuere justo, quis feugiat lectus. Quisque faucibus arcu a feugiat gravida. Vivamus sed consequat felis, non malesuada sem. Cras mollis, tellus eget faucibus interdum, erat leo imperdiet est, eu faucibus tortor magna eu dolor. Nam vel massa faucibus, venenatis ex eget, suscipit quam. Aenean sed ornare tellus. Cras pretium tortor dui, eget dapibus ligula iaculis at. Sed lobortis tristique pharetra. Suspendisse scelerisque, elit quis iaculis accumsan, nunc est consectetur tellus, eu semper tellus tellus at neque. Praesent finibus vehicula mi sed finibus.
Vestibulum vel ex at metus pulvinar euismod. Nulla sodales tempor libero quis feugiat. Vivamus vel euismod felis, eget blandit elit. Vivamus non tempus nunc. Mauris hendrerit justo eu ligula luctus, at varius dolor sodales. Sed iaculis od`,
            purchasePrice: "1",
            salePrice: "2",
            quantity: "1",
            err: /too long/i,
        },
    ];
    cases.forEach(
        (
            {
                title,
                name,
                description,
                purchasePrice,
                salePrice,
                quantity,
                err,
            },
        ) => {
            test(title, async ({ page }) => {
                await page.goto("/items/add");

                const nameInput = page.getByPlaceholder("Enter item name");
                const descrInput = page.getByPlaceholder(
                    "Enter description",
                );
                const salePriceInput = page.getByPlaceholder(
                    "Enter sale price",
                );
                const purchasePriceInput = page.getByPlaceholder(
                    "Enter purchase price",
                );
                const quantityInput = page.getByPlaceholder("Enter quantity");
                const submitButton = page.getByRole("button", {
                    name: /create/i,
                });

                await nameInput.fill(name);
                await descrInput.fill(description ?? "");
                await salePriceInput.fill(salePrice);
                await purchasePriceInput.fill(purchasePrice);
                await quantityInput.fill(quantity);

                await expect(submitButton).toBeDisabled();

                const errShown = page.getByText(err);
                await expect(errShown).toBeVisible({ timeout: 3_000 });
            });
        },
    );
});
