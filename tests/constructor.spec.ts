import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/api-ingredients.har', {
      url: '**/api/ingredients'
    });

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Булки' })).toBeVisible();
  });

  test('добавить начинку из списка ингредиентов в конструктор', async ({
    page
  }) => {
    const mainsList = page
      .locator('h3', { hasText: 'Начинки' })
      .locator('+ ul');
    const firstIngredientName = await mainsList
      .locator('a')
      .first()
      .locator('p')
      .last()
      .textContent();

    await mainsList.getByRole('button', { name: 'Добавить' }).first().click();

    const constructorSection = page.locator('section').filter({
      has: page.getByRole('button', { name: 'Оформить заказ' })
    });

    await expect(
      constructorSection
        .locator('.constructor-element__text')
        .filter({ hasText: firstIngredientName! })
    ).toBeVisible();
  });
});
