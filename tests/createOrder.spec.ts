import { test, expect, Page } from '@playwright/test';

const ORDER_NUMBER = 12345;

const MOCK_ACCESS_TOKEN = {
  name: 'accessToken',
  value: 'Bearer mock-access-token',
  url: 'http://localhost:4000'
};

const MOCK_REFRESH_TOKEN = 'mock-refresh-token';

// Собрать бургер (булка + начинка)
const buildBurger = async (page: Page) => {
  const bunsList = page.locator('h3', { hasText: 'Булки' }).locator('+ ul');
  const mainsList = page.locator('h3', { hasText: 'Начинки' }).locator('+ ul');

  await bunsList.getByRole('button', { name: 'Добавить' }).first().click();
  await mainsList.getByRole('button', { name: 'Добавить' }).first().click();
};

// Оформить заказ и дождаться, что модалка с номером открылась
const placeOrder = async (page: Page) => {
  await buildBurger(page);
  await page.getByRole('button', { name: 'Оформить заказ' }).click();

  const modal = page.locator('#modals > div').first();
  await expect(modal).toBeVisible();
  await expect(modal.getByText(String(ORDER_NUMBER))).toBeVisible();

  return modal;
};

test.describe('Создание заказа', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([MOCK_ACCESS_TOKEN]);
    await page.addInitScript((token) => {
      localStorage.setItem('refreshToken', token);
    }, MOCK_REFRESH_TOKEN);

    await page.routeFromHAR('./tests/hars/api-auth-user.har', {
      url: '**/api/auth/user'
    });

    await page.routeFromHAR('./tests/hars/api-auth-token.har', {
      url: '**/api/auth/token'
    });

    await page.routeFromHAR('./tests/hars/api-orders.har', {
      url: '**/api/orders'
    });

    await page.routeFromHAR('./tests/hars/api-ingredients.har', {
      url: '**/api/ingredients'
    });

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Булки' })).toBeVisible();
  });

  test('открытие модалки: открывается и показывает номер заказа', async ({
    page
  }) => {
    const modal = await placeOrder(page);

    await expect(modal.getByText(String(ORDER_NUMBER))).toBeVisible();
  });

  test('закрытие модалки: закрывается по клику на крестик', async ({
    page
  }) => {
    const modal = await placeOrder(page);

    await modal.getByRole('button').click();

    await expect(page.locator('#modals > div')).toHaveCount(0);
  });

  test('очистка конструктора: после закрытия модалки конструктор пуст', async ({
    page
  }) => {
    const modal = await placeOrder(page);

    await modal.getByRole('button').click();
    await expect(page.locator('#modals > div')).toHaveCount(0);

    const constructorSection = page.locator('section').filter({
      has: page.getByRole('button', { name: 'Оформить заказ' })
    });

    await expect(constructorSection.getByText('Выберите булки').first()).toBeVisible();
    await expect(constructorSection.getByText('Выберите начинку')).toBeVisible();
  });
});
