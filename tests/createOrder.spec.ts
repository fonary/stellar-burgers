import { test, expect, Page } from '@playwright/test';

const MOCK_USER = {
  success: true,
  user: {
    email: 'test@example.com',
    name: 'Test User',
  },
};

const MOCK_ORDER = {
  success: true,
  name: 'Space Burger',
  order: {
    _id: 'mock-order-id',
    status: 'done',
    name: 'Space Burger',
    number: 12345,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    price: 2510,
    owner: {
      name: 'Test User',
      email: 'test@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
};

const MOCK_ORDERS_LIST = {
  success: true,
  orders: [
    {
      _id: 'mock-order-id',
      status: 'done',
      name: 'Space Burger',
      number: 12345,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ingredients: [],
    },
  ],
  total: 1,
  totalToday: 1,
};

const MOCK_ACCESS_TOKEN = {
  name: 'accessToken',
  value: 'Bearer mock-access-token',
  url: 'http://localhost:4000',
};

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
  await expect(
    modal.getByText(String(MOCK_ORDER.order.number))
  ).toBeVisible();

  return modal;
};

test.describe('Создание заказа', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([MOCK_ACCESS_TOKEN]);

    await page.route('**/api/auth/user', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_USER),
      })
    );

    await page.route('**/api/auth/token', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          accessToken: 'Bearer mock-access-token',
          refreshToken: 'mock-refresh-token',
        }),
      })
    );

    await page.route('**/api/orders', (route) => {
      if (route.request().method() === 'POST') {
        return route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(MOCK_ORDER),
        });
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_ORDERS_LIST),
      });
    });

    await page.routeFromHAR('./tests/hars/api-ingredients.har', {
      url: '**/api/ingredients',
    });

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Булки' })).toBeVisible();
  });

  test('открытие модалки: открывается и показывает номер заказа', async ({
    page,
  }) => {
    const modal = await placeOrder(page);

    await expect(
      modal.getByText(String(MOCK_ORDER.order.number))
    ).toBeVisible();
  });

  test('закрытие модалки: закрывается по клику на крестик', async ({ page }) => {
    const modal = await placeOrder(page);

    await modal.getByRole('button').click();

    await expect(page.locator('#modals > div')).toHaveCount(0);
  });

  test('очистка конструктора: после закрытия модалки конструктор пуст', async ({
    page,
  }) => {
    const modal = await placeOrder(page);

    await modal.getByRole('button').click();
    await expect(page.locator('#modals > div')).toHaveCount(0);

    await expect(page.getByText('Выберите булки').first()).toBeVisible();
    await expect(page.getByText('Выберите начинку')).toBeVisible();
  });
});