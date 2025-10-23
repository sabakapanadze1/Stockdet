
import { test, expect } from '@playwright/test';

test.describe("Sign in page", () => {
  test("check correct title", async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page).toHaveTitle("Stockdet");
  });

  test("should successfully log in with valid credentials", async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page.locator('h1.form-title')).toBeVisible();
    await page.fill('input[name="email"]', 'sabakapanadz5@gmail.com');
    await page.fill('input[name="password"]', 'Sabasaba5');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });
});