import { ingredientsReducer, fetchIngredients } from '../ingredientsSlice';
import type { IngredientsState } from '../ingredientsSlice';
import type { TIngredient } from '@utils-types';

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

const MOCK_INGREDIENTS: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('ingredientsSlice reducer', () => {
  test('возвращает начальное состояние при неизвестном экшене и undefined в качестве state', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  test('возвращает тот же стейт при неизвестном экшене', () => {
    const currentState: IngredientsState = {
      items: MOCK_INGREDIENTS,
      isLoading: true,
      error: 'something'
    };
    const state = ingredientsReducer(currentState, { type: 'UNKNOWN' });
    expect(state).toBe(currentState);
  });

  test('обрабатывает fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('test-request-id')
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.items).toEqual([]);
  });

  test('fetchIngredients.pending сбрасывает прежнюю ошибку', () => {
    const stateWithError: IngredientsState = {
      items: [],
      isLoading: false,
      error: 'Старая ошибка'
    };
    const state = ingredientsReducer(
      stateWithError,
      fetchIngredients.pending('test-request-id')
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обрабатывает fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.fulfilled(MOCK_INGREDIENTS, 'test-request-id')
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(MOCK_INGREDIENTS);
    expect(state.error).toBeNull();
  });

  test('обрабатывает fetchIngredients.rejected', () => {
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.rejected(new Error('Network error'), 'test-request-id')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });

  test('fetchIngredients.rejected сохраняет прежний список items', () => {
    const stateWithItems: IngredientsState = {
      items: MOCK_INGREDIENTS,
      isLoading: true,
      error: null
    };
    const state = ingredientsReducer(
      stateWithItems,
      fetchIngredients.rejected(new Error('fail'), 'test-request-id')
    );

    expect(state.items).toEqual(MOCK_INGREDIENTS);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
  });
});
