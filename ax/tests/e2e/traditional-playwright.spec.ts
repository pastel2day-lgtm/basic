import { test, expect } from '@playwright/test';

test.describe('Traditional Playwright Test (Brittle Selectors)', () => {
  test('fails if DOM selector or button class changes', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Traditional hardcoded CSS selector expectation
    const checkoutBtn = page.locator('.checkout-submit-btn');
    await expect(checkoutBtn).toBeVisible({ timeout: 3000 });
    await checkoutBtn.click();

    // Verify order completed
    await expect(page.locator('text=Payment Successful!')).toBeVisible();
  });
});
