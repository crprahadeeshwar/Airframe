import { test, expect } from "@playwright/test";
import { createTestUser, deleteTestuser } from "./fixtures";

test("User can create, view, update, and delete a flight", async ({ page }) => {
    const email = `e2e-${crypto.randomUUID()}@example.com`;
    const password = "Abc12345#";
    const user = await createTestUser(email, password);

    try {
        // Login
        await page.goto("/login");

        await page.getByLabel("Email").fill(email);
        await page.getByLabel("Password").fill(password);

        await page.getByRole("button", {
            name: "Login",
        }).click();

        await expect(page).toHaveURL("/dashboard");

        // Navigate to flights
        await page.getByRole("link", {
            name: "Flights",
        }).click();

        await expect(page).toHaveURL("/flights");

        await expect(
            page.getByRole("heading", {
                name: "Flights",
            })
        ).toBeVisible();

        // Create flight
        await page.getByRole("button", {
            name: "Add Flight",
        }).click();

        await expect(page).toHaveURL("/flights/new");

        await expect(
            page.getByRole("heading", {
                name: "Add Flight",
            })
        ).toBeVisible();

        await page.getByLabel("Flight Number").fill("LH454");
        await page.getByLabel("Notes").fill("This is a test.");

        await page.getByRole("button", {
            name: "Add Flight",
        }).click();

        await expect(page).toHaveURL("/flights");

        // Locate the flight in the responsive flight list.
        const flight = page.getByRole("button", {
            name: /LH454/,
        });

        await expect(flight).toBeVisible();

        // View flight
        await flight.click();

        // Flight number appears under "Flight No.", not as a heading.
        await expect(
            page.getByText("Flight No.", {
                exact: true,
            })
        ).toBeVisible();

        await expect(
            page.getByText("LH454", {
                exact: true,
            }).last()
        ).toBeVisible();

        await expect(
            page.getByText("This is a test.", {
                exact: true,
            })
        ).toBeVisible();

        // Edit flight
        await page.getByRole("button", {
            name: "Edit",
        }).click();

        await expect(
            page.getByRole("heading", {
                name: "Edit Flight",
            })
        ).toBeVisible();

        const notesInput = page.getByPlaceholder(
            "Anything worth remembering..."
        );

        await expect(notesInput).toBeVisible();

        await notesInput.clear();
        await notesInput.fill("This is an edit.");

        await page.getByRole("button", {
            name: "Save Changes",
        }).click();

        // View updated flight
        await expect(flight).toBeVisible();

        await flight.click();

        await expect(
            page.getByText("This is an edit.", {
                exact: true,
            })
        ).toBeVisible();

        // Delete flight
        await page.getByRole("button", {
            name: "Delete",
            exact: true,
        }).click();

        const deleteDialog = page.getByRole("alertdialog");

        await expect(deleteDialog).toBeVisible();

        await deleteDialog.getByRole("button", {
            name: "Delete",
            exact: true,
        }).click();

        await expect(
            page.getByRole("button", {
                name: "Deleting...",
            })
        ).toBeVisible();

        await expect(
            page.getByRole("button", {
                name: "Deleting...",
            })
        ).toBeHidden();

        await expect(flight).not.toBeVisible();

        // Logout
        await page.getByRole("button", {
            name: "Log out",
        }).click();

        await expect(page).toHaveURL("/login");

    } finally {
        await deleteTestuser(user.id);
    }
});