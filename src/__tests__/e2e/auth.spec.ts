import { test, expect } from "@playwright/test";
import { createTestUser, deleteTestuser, getUserIdByEmail } from "./fixtures";

test.describe("Authentication", () => {

    test("login page loads", async ({ page }) => {
        await page.goto("/");

        await expect(page).toHaveTitle("Airframe");

        await expect(
            page.getByRole("heading", {
            name: "Welcome to Airframe.",
            })
        ).toBeVisible();

        await expect(page.getByLabel("Email")).toBeVisible();
        await expect(page.getByLabel("Password")).toBeVisible();

        await expect(
            page.getByRole("button", {
            name: "Login",
            })
        ).toBeVisible();
    });

    test("signup redirects to login", async ({ page }) => {
        const email = `e2e-${crypto.randomUUID()}@example.com`;
        const password = "Abc12345#";

        try {
            await page.goto("/signup");

            await page.getByLabel("Email").fill(email);
            await page.getByLabel("Password").fill(password);

            await page.getByRole("button", {
                name: "Create Account",
            }).click();

            await expect(page).toHaveURL("/login");

        } finally {
            const userId = await getUserIdByEmail(email);

            if (userId) {
                await deleteTestuser(userId);
            }
        }
    });

    test("login redirects to dashboard", async ({ page }) => {
        const email = `e2e-${crypto.randomUUID()}@example.com`;
        const password = "ABCabc123#";

        const user = await createTestUser(email, password);

        try {
            await page.goto("/login");

            await page.getByLabel("Email").fill(email);
            await page.getByLabel("Password").fill(password);

            await page.getByRole("button", {
            name: "Login",
            }).click();

            await expect(page).toHaveURL("/dashboard");

        } finally {
            await deleteTestuser(user.id);
        }
    });

    test("anonymous users cannot access protected routes", async ({ page }) => {
        
        await page.goto("/dashboard");

        await expect(page).toHaveURL("/login");
        await expect(
            page.getByRole("heading", {
                name: "Welcome to Airframe.",
            })
        ).toBeVisible();

        await page.goto("/flights");

        await expect(page).toHaveURL("/login");
});
});