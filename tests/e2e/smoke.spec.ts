import { expect, test } from '@playwright/test';

test('home renders the h1 with Javier', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1').first()).toContainText('Javier');
});
