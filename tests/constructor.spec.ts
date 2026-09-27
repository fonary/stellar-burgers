import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test('записать HAR-файл для ингредиентов', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/api-ingredients.har', {
      url: '**api/ingredients',
      update: true,
    });

    await page.goto('/');

    const ingredients = page.getByRole('link');
    await expect(ingredients.first()).toBeVisible();
  });
});