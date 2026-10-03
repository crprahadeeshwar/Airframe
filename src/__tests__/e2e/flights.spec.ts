import { test, expect } from "@playwright/test";
import { createTestUser, deleteTestuser } from "./fixtures";

test("User can create, view, update, and delete a flight", async ({ page }) => {

    const email = `e2e-${crypto.randomUUID()}@example.com`;
    const password = "Abc12345#";
    const user = await createTestUser(email, password);

    try {
        await page.goto("/login");

        await page.getByLabel("Email").fill(email);
        await page.getByLabel("Password").fill(password);

        await page.getByRole("button", {
        name: "Login",
        }).click();

        await expect(page).toHaveURL("/dashboard");

        await page.getByRole("link", {
            name: 'Flights',
        }).click();

        await expect(page).toHaveURL('/flights');

        await expect(page.getByRole("heading", {
            name: "Flights",
        })).toBeVisible();

        await page.getByRole("button", {
            name: "Add Flight", 
        }).click();

        await expect(page).toHaveURL("/flights/new");

        await expect(page.getByRole("heading", {
            name: "Add Flight"
        })).toBeVisible();

        await page.getByLabel("Flight Number").fill("LH454");
        await page.getByLabel("Notes").fill("This is a test.");

        await page.getByRole("button", {
            name: "Add Flight"
        }).click();

        await expect(page).toHaveURL('/flights');

        await expect(page.getByText("LH454")).toBeVisible();

        await page.getByText("LH454").click();

        await page.getByRole("heading", {
            name: "LH454",
        });

        await expect(page.getByText("This is a test.")).toBeVisible();

        await page.getByRole("button", {
            name: "Edit"
        }).click();

        await expect(page.getByRole("heading", {
            name: "Edit Flight",
        })).toBeVisible();

        await expect(page.getByPlaceholder("Anything worth remembering...")).toBeVisible();

        await page.getByPlaceholder("Anything worth remembering...").clear();

        await page.getByPlaceholder("Anything worth remembering...")
            .fill("This is an edit.");

        await page.getByRole("button", {
            name: "Save Changes",
        }).click();

        await expect(page.getByText("LH454")).toBeVisible();

        await page.getByText("LH454").click();

        await expect(page.getByText("This is an edit.")).toBeVisible();

        await page.getByRole("button", { name: "Delete" }).click();

        await expect(
        page.getByRole("alertdialog")
        ).toBeVisible();
        
        await page.getByRole("button", { name: "Delete" }).click();
        await page.getByRole("button", { name: "Deleting..." }).waitFor({
        state: "detached",
        });

        await expect(
        page.getByRole("button", { name: /LH454/ })
        ).not.toBeVisible();

        await page.getByRole("button", {
        name: "Log out",
        }).click();

        await expect(page).toHaveURL('/login');

    } finally {
        await deleteTestuser(user.id);
    };
});
