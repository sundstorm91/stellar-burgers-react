import {
	addIngredient,
	burgerBuilderSlice,
	ConstructorIngredient,
	initialState,
} from './constructor-slice';

const mockBun: ConstructorIngredient = {
	_id: '60d3b41abdacab0026a733c6',
	name: 'Краторная Булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
	constructorId: '1',
};

const mockIngredient: ConstructorIngredient = {
	...mockBun,
	_id: '52144ssddac663c72',
	type: 'main',
	constructorId: '2',
	name: 'Краторная Котлета',
};

describe('burgerBuilderSlice', () => {
	/* инициализация начального состояния */
	it('should return initialState', () => {
		expect(burgerBuilderSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('should add ingredient to empty state', () => {
		const action = addIngredient(mockIngredient);
		const state = burgerBuilderSlice.reducer(initialState, action);

		expect(state.ingredients).toHaveLength(1);
		expect(state.ingredients[0]).toEqual(mockIngredient);
		expect(state.bun).toBeNull(); // Булка не должна измениться
	});

	it('should add bun', () => {
		const action = addIngredient(mockBun);
		const state = burgerBuilderSlice.reducer(initialState, action);

		expect(state.bun).toEqual(mockBun); // Булка должна сохраниться отдельно
		expect(state.ingredients).toHaveLength(0); // Ингредиенты не должны измениться
	});

	it('should add ingredient to existing list', () => {
		const firstState = burgerBuilderSlice.reducer(
			initialState,
			addIngredient(mockIngredient)
		);

		const secondIngredient = {
			...mockIngredient,
			_id: '60d3b41abdacab0026a733c8',
			constructorId: '3',
		};

		const finalState = burgerBuilderSlice.reducer(
			firstState,
			addIngredient(secondIngredient)
		);

		expect(finalState.ingredients).toHaveLength(2);
		expect(finalState.ingredients[1].constructorId).toBe('3');
	});
});
