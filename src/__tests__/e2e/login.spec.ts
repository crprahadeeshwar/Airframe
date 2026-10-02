import { test, expect } from "@playwright/test";

test("Airframe login page loads", async ({ page }) => {
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

test("Signup page loads and signs up user", async ({ page }) => {
  await page.goto('/signup');

  await page.getByLabel("Email").fill("crp@gmail.com");

  await page.getByLabel("Password").fill('abAB123$');

  await page.getByRole("button", {
    name: "Create Account"
  }).click();

  await expect(page).toHaveURL('/login');

}); 

test("login page redirects to dashboard after login", async ({ page }) => {

  await page.goto('/login');

  await page.getByLabel("Email").fill("crp@gmail.com");

  await page.getByLabel("Password").fill('abAB123$');

  await page.getByRole("button", {
    name: "Login"
  }).click();

  await expect(page).toHaveURL('/dashboard');

});