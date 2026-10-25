import { expect, test } from "@playwright/test";

test.describe("Tests d'arrondi mathématique", () => {
    [
        { value: "0.105", expected: 0.11 },
        { value: "0.115", expected: 0.12 },
        { value: "0.125", expected: 0.13 },
        { value: "0.135", expected: 0.14 },
        { value: "0.145", expected: 0.15 },
        { value: "0.155", expected: 0.16 },
    ].forEach(({ value, expected }) => {
        test(`arrondi mathematique du prix ${value}`, async ({ page }) => {
            await page.goto("/invoices/add");

            const priceInput = page.getByRole("spinbutton", {
                name: "Price :",
            });
            const subTotalInput = page.getByRole("textbox", { disabled: true })
                .nth(
                    0,
                );

            await expect(priceInput).toBeVisible();
            await expect(subTotalInput).toBeVisible();

            await priceInput.fill(value);
            const subTotal = Number.parseFloat(
                await subTotalInput.inputValue(),
            );

            expect(subTotal).toBe(expected);
        });
    });
});
