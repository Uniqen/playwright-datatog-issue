import { test, expect } from '@playwright/test';
import tracer from 'dd-trace';

tracer.init();

test('has title', async ({ page }) => {
  const span = tracer.startSpan('MyTestSpan');
  console.log('test traceId:', span.context().toTraceId());
  await page.goto('https://playwright.dev/');
  span.finish();
  await page.waitForTimeout(10_000);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
