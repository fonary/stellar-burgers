import {
  initialState,
  constructorReducer,
  addIngredient,
  removeIngredients,
  setIngredients,
  clearConstructor
} from '../constructorSlice';
import type { TConstructorState } from '../constructorSlice';
import type { TConstructorIngredient } from '@utils-types';

const MOCK_BUN: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: 'bun-id-1',
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
};

const MOCK_MAIN: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: 'main-id-1',
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
};

const MOCK_SAUCE: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  id: 'sauce-id-1',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('constructorSlice reducer', () => {
  test('возвращает начальное состояние при неизвестном экшене и undefined в качестве state', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  test('возвращает тот же стейт при неизвестном экшене', () => {
    const currentState: TConstructorState = {
      bunTop: MOCK_BUN,
      bunBottom: MOCK_BUN,
      isLoading: false,
      ingredients: [MOCK_MAIN]
    };
    const state = constructorReducer(currentState, { type: 'UNKNOWN' });
    expect(state).toBe(currentState);
  });

  test('addIngredient добавляет булку в bunTop и bunBottom', () => {
    const state = constructorReducer(initialState, addIngredient(MOCK_BUN));

    expect(state.bunTop).toEqual(MOCK_BUN);
    expect(state.bunBottom).toEqual(MOCK_BUN);
    expect(state.ingredients).toEqual([]);
  });

  test('addIngredient заменяет булку, если она уже была', () => {
    const otherBun: TConstructorIngredient = {
      ...MOCK_BUN,
      id: 'bun-id-2',
      name: 'Флюоресцентная булка R2-D3',
      _id: '643d69a5c3f7b9001cfa093d'
    };
    const stateWithBun: TConstructorState = {
      ...initialState,
      bunTop: MOCK_BUN,
      bunBottom: MOCK_BUN
    };

    const state = constructorReducer(stateWithBun, addIngredient(otherBun));

    expect(state.bunTop).toEqual(otherBun);
    expect(state.bunBottom).toEqual(otherBun);
  });

  test('addIngredient добавляет начинку в ingredients', () => {
    const state = constructorReducer(initialState, addIngredient(MOCK_MAIN));

    expect(state.ingredients).toEqual([MOCK_MAIN]);
    expect(state.bunTop).toBeNull();
    expect(state.bunBottom).toBeNull();
  });

  test('addIngredient добавляет соус в ingredients', () => {
    const state = constructorReducer(initialState, addIngredient(MOCK_SAUCE));

    expect(state.ingredients).toEqual([MOCK_SAUCE]);
  });

  test('addIngredient добавляет несколько начинок по очереди', () => {
    let state = constructorReducer(initialState, addIngredient(MOCK_MAIN));
    state = constructorReducer(state, addIngredient(MOCK_SAUCE));

    expect(state.ingredients).toEqual([MOCK_MAIN, MOCK_SAUCE]);
  });

  test('removeIngredients удаляет ингредиент по id', () => {
    const stateWithIngredients: TConstructorState = {
      ...initialState,
      ingredients: [MOCK_MAIN, MOCK_SAUCE]
    };

    const state = constructorReducer(
      stateWithIngredients,
      removeIngredients(MOCK_MAIN.id)
    );

    expect(state.ingredients).toEqual([MOCK_SAUCE]);
  });

  test('removeIngredients ничего не делает, если id не найден', () => {
    const stateWithIngredients: TConstructorState = {
      ...initialState,
      ingredients: [MOCK_MAIN]
    };

    const state = constructorReducer(
      stateWithIngredients,
      removeIngredients('nonexistent-id')
    );

    expect(state.ingredients).toEqual([MOCK_MAIN]);
  });

  test('setIngredients заменяет весь список ингредиентов', () => {
    const stateWithIngredients: TConstructorState = {
      ...initialState,
      ingredients: [MOCK_MAIN]
    };

    const state = constructorReducer(
      stateWithIngredients,
      setIngredients([MOCK_SAUCE, MOCK_MAIN])
    );

    expect(state.ingredients).toEqual([MOCK_SAUCE, MOCK_MAIN]);
  });

  test('setIngredients может установить пустой массив', () => {
    const stateWithIngredients: TConstructorState = {
      ...initialState,
      ingredients: [MOCK_MAIN, MOCK_SAUCE]
    };

    const state = constructorReducer(stateWithIngredients, setIngredients([]));

    expect(state.ingredients).toEqual([]);
  });

  test('clearConstructor обнуляет булки и очищает ингредиенты', () => {
    const fullState: TConstructorState = {
      bunTop: MOCK_BUN,
      bunBottom: MOCK_BUN,
      isLoading: false,
      ingredients: [MOCK_MAIN, MOCK_SAUCE]
    };

    const state = constructorReducer(fullState, clearConstructor());

    expect(state.bunTop).toBeNull();
    expect(state.bunBottom).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
