import { expect, test } from "@playwright/test";

test("se deconnecter", async ({ page }) => {
    page.goto("/dashboard");

    //obligé de se reposer sur la connexion admin et la connaissance de username pour aller chercher l'element dans ce cas
    const adminButton = page.getByText("admin");
    expect(adminButton).toBeVisible();

    await adminButton.click();
    // const logoutButton = page.getByRole("listitem", { name: /Logout/i });
    const logoutButton = page.getByText(/Logout/i);

    expect(logoutButton).toBeVisible();
    await logoutButton.click();

    expect(page).toHaveURL("/login");
    expect(page.getByRole("button", { name: /log\s*in/i })).toBeVisible();
});
