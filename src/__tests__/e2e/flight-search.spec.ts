import { test, expect } from "@playwright/test";
import { createTestUser, deleteTestFlights, deleteTestuser } from "./fixtures";

test("User can search and filter flights", async ({ page }) => {
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
            name: "Flights",
        }).click();

        await expect(page).toHaveURL("/flights");

        // Create LH454
        await page.getByRole("button", {
            name: "Add Flight",
        }).click();

        await expect(page).toHaveURL("/flights/new");

        await page.getByLabel("Flight Number").fill("LH454");
        await page.getByLabel("Notes").fill("Lufthansa test flight");

        await page.getByRole("button", {
            name: "Add Flight",
        }).click();

        await expect(page).toHaveURL("/flights");

        const lh454 = page.getByRole("button", {
            name: /LH454/,
        });

        await expect(lh454).toBeVisible();

        // Create EK525
        await page.getByRole("button", {
            name: "Add Flight",
        }).click();

        await expect(page).toHaveURL("/flights/new");

        await page.getByLabel("Flight Number").fill("EK525");
        await page.getByLabel("Notes").fill("Emirates test flight");

        await page.getByRole("button", {
            name: "Add Flight",
        }).click();

        await expect(page).toHaveURL("/flights");

        const ek525 = page.getByRole("button", {
            name: /EK525/,
        });

        await expect(ek525).toBeVisible();

        // Search by flight number
        await page.goto("/flights?search=LH454");

        await expect(page).toHaveURL(
            /\/flights\?search=LH454/
        );

        await expect(lh454).toBeVisible();
        await expect(ek525).not.toBeVisible();

        // Search by airline
        await page.goto("/flights?search=Emirates");

        await expect(page).toHaveURL(
            /\/flights\?search=Emirates/
        );

        await expect(ek525).toBeVisible();
        await expect(lh454).not.toBeVisible();

        // Filter by flight number + search
        await page.goto(
            "/flights?filter=flight_number&search=LH454"
        );

        await expect(page).toHaveURL(
            /filter=flight_number.*search=LH454/
        );

        await expect(lh454).toBeVisible();
        await expect(ek525).not.toBeVisible();

    } finally {
        await deleteTestFlights(user.id);
        await deleteTestuser(user.id);
    }
});


test("User can change flight ordering", async ({ page }) => {
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

        await page.goto("/flights?order=oldest");

        await expect(page).toHaveURL(
            /\/flights\?order=oldest/
        );

        await page.goto("/flights?order=newest");

        await expect(page).toHaveURL(
            /\/flights\?order=newest/
        );

    } finally {
        await deleteTestuser(user.id);
    }
});