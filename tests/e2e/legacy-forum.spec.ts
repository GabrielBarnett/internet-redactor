import { test } from '@playwright/test';

/**
 * Browser automation is a fallback path only for websites without official APIs.
 * This skeleton demonstrates where hardened automation flows should live.
 */
test.skip('legacy forum fallback deletion flow', async ({ page }) => {
  await page.goto('/');
});
