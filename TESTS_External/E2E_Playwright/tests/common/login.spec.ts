import { expect, test } from "@playwright/test";

test("se connecter avec un mauvais compte echoue", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const nameInput = page.getByPlaceholder(/Username/);
    const pwdInput = page.getByPlaceholder(/Password/);
    const loginButton = page.getByRole("button", { name: /Log in/i });
    await expect(nameInput).toBeVisible();
    await expect(pwdInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    await nameInput.fill("Smitty Werbenjägermanjansen");
    await pwdInput.fill("jesaispas");
    await loginButton.click();

    await expect(page.getByText(/Invalid username or password/i)).toBeVisible();
});

test("se connecter avec des infos avec la mauvaise casse echoue", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const nameInput = page.getByPlaceholder(/Username/);
    const pwdInput = page.getByPlaceholder(/Password/);
    const loginButton = page.getByRole("button", { name: /Log in/i });
    await expect(nameInput).toBeVisible();
    await expect(pwdInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    await nameInput.fill("admin");
    await pwdInput.fill("Admin");
    await loginButton.click();

    await expect(page.getByText(/Invalid username or password/i)).toBeVisible();
});

test("se connecter sans infos echoue", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const loginButton = page.getByRole("button", { name: /Log in/i });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const err1 = page.getByText("Please input your username!");
    const err2 = page.getByText("Please input your Password!");

    await expect(err1).toBeVisible();
    await expect(err2).toBeVisible();
});

test("se connecter avec un mauvais mot de passe echoue", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const nameInput = page.getByPlaceholder(/Username/);
    const pwdInput = page.getByPlaceholder(/Password/);
    const loginButton = page.getByRole("button", { name: /Log in/i });
    await expect(nameInput).toBeVisible();
    await expect(pwdInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    await nameInput.fill("admin");
    await pwdInput.fill("jesaispas");
    await loginButton.click();

    await expect(page.getByText(/Invalid username or password/i)).toBeVisible();
});

test("se connecter avec des infos correctes réussit", async ({ page }) => {
    await page.goto("http://localhost:4444/customers/add");

    const username = "admin";

    const nameInput = page.getByPlaceholder(/Username/);
    const pwdInput = page.getByPlaceholder(/Password/);
    const loginButton = page.getByRole("button", { name: /Log in/i });
    await expect(nameInput).toBeVisible();
    await expect(pwdInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    await nameInput.fill(username);
    await pwdInput.fill("admin");
    await loginButton.click();

    await expect(page).toHaveURL(/dashboard/, { timeout: 6_000 });
    await expect(page.getByText(username).first()).toBeVisible(); //mmmhh ca marche mais si le user s'appelle invoicika ou VAT ?
});
