import { expect, test } from "@playwright/test";

test("arrondi mathematique du prix", async ({ page }) => {
    page.goto("http://localhost:4444/invoices/add");

    const priceInput = page.getByRole("spinbutton", { name: "Price :" });
    const subTotalInput = page.getByRole("textbox", { disabled: true }).nth(0);

    await expect(priceInput).toBeVisible();
    await expect(subTotalInput).toBeVisible();

    const valuesRounded: Record<string, number> = {
        "0.105": 0.11,
        "0.115": 0.12,
        "0.125": 0.13,
        "0.135": 0.14,
        "0.145": 0.15,
        "0.155": 0.16,
    };

    for (const [value, expected] of Object.entries(valuesRounded)) {
        await priceInput.fill(value);

        const price = Number.parseFloat(await priceInput.inputValue());
        const subTotal = Number.parseFloat(await subTotalInput.inputValue());

        console.log(price);
        console.log(subTotal);

        expect.soft(subTotal).toBe(expected);
    }
});

test("arrondi bancaire du prix", async ({ page }) => {
    page.goto("http://localhost:4444/invoices/add");

    const priceInput = page.getByRole("spinbutton", { name: "Price :" });
    const subTotalInput = page.getByRole("textbox", { disabled: true }).nth(0);

    await expect(priceInput).toBeVisible();
    await expect(subTotalInput).toBeVisible();

    const valuesRounded: Record<string, number> = {
        "0.105": 0.10,
        "0.115": 0.12,
        "0.125": 0.12,
        "0.135": 0.14,
        "0.145": 0.14,
        "0.155": 0.16,
    };

    for (const [value, expected] of Object.entries(valuesRounded)) {
        await priceInput.fill(value);

        const price = Number.parseFloat(await priceInput.inputValue());
        const subTotal = Number.parseFloat(await subTotalInput.inputValue());

        console.log(price);
        console.log(subTotal);

        expect.soft(subTotal).toBe(expected);
    }
});
