import { test, expect } from '@playwright/test';
import tracer from 'dd-trace';

tracer.init({
  env: 'stage',
  service: 'dementors_test',
});

test('has title', async ({ page }) => {
  const span = tracer.startSpan('MyTestSpan');

  const searchParams = new URLSearchParams({
    traceparent: span.context().toTraceparent(),
  });

  /**
   * The application uses the traceparent as parent for all started OpenTelemetry spans
   * NOTE: Today we start OpenTelemetry spans in our tests and propagate traceparent as search parameter.
   * Unsure if dd-trace traceparent and OpenTelemetry traceparent is compatible with eachother?
   */
  await page.goto(`https://playwright.dev/?${searchParams}`);
  span.finish();
  await page.waitForTimeout(10_000);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
