import { test, expect} from '@playwright/test';

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