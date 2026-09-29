import { test, expect, Page } from '@playwright/test';

const getModal = (page: Page) => page.locator('#modals > div').first();

test.describe('Модальное окно ингредиента', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/api-ingredients.har', {
      url: '**/api/ingredients'
    });

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Булки' })).toBeVisible();
  });

  test('открывается по клику на ингредиент', async ({ page }) => {
    const bunsList = page.locator('h3', { hasText: 'Булки' }).locator('+ ul');
    const firstBun = bunsList.locator('li').first();
    const bunName = (await firstBun.locator('p').last().textContent())!.trim();

    await firstBun.locator('a').click();

    const modal = getModal(page);
    await expect(modal).toBeVisible();
    await expect(
      modal.locator('h3.text_type_main-medium', { hasText: bunName })
    ).toBeVisible();
  });

  test('закрывается по клику на крестик', async ({ page }) => {
    const bunsList = page.locator('h3', { hasText: 'Булки' }).locator('+ ul');
    await bunsList.locator('a').first().click();

    const modal = getModal(page);
    await expect(modal).toBeVisible();

    await modal.getByRole('button').click();

    await expect(page.locator('#modals > div')).toHaveCount(0);
    await expect(page).toHaveURL('/');
  });

  test('закрывается по Escape', async ({ page }) => {
    const bunsList = page.locator('h3', { hasText: 'Булки' }).locator('+ ul');
    await bunsList.locator('a').first().click();

    const modal = getModal(page);
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modal).not.toBeVisible();
  });
});
