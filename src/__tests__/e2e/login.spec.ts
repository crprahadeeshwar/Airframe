import { test, expect } from "@playwright/test";

test("Airframe login page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Airframe.");

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