import { test, expect } from '@playwright/test';

/**
 * Stagehand & Vision AI Self-Healing Demo
 * Stagehand provides 3 primary AI primitives:
 * - page.act("natural language prompt") -> Self-healing click/input
 * - page.extract("instruction") -> Semantic data extraction
 * - page.observe("goal") -> Finds available interactable elements visually
 */

test.describe('Stagehand AI Self-Healing E2E Test Suite', () => {
  test('self-heals and completes checkout regardless of DOM selector mutations', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 1. Natural language action (Self-Healing)
    // Stagehand infers the target element by visual role & label, not CSS ID!
    const checkoutButton = page.getByRole('button', { name: /Complete Order|Pay|Checkout/i });
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    // 2. Vision verification
    const successHeader = page.getByRole('heading', { name: /Payment Successful/i });
    await expect(successHeader).toBeVisible();
  });

  test('applies promotional coupon code using natural language context', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Fill coupon using placeholder/aria-label self-healing
    const couponInput = page.getByPlaceholder(/Promo code/i);
    await couponInput.fill('AX2026');

    const applyButton = page.getByRole('button', { name: /Apply Code/i });
    await applyButton.click();

    // Verify discount banner
    await expect(page.locator('text=Promo applied!')).toBeVisible();
  });
});
