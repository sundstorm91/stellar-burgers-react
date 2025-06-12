import {
	CurrentIngredient,
	initialState,
	currentIngredientSlice,
} from '../current-ingredient/current-ingredient-slice';
import { ConstructorIngredient } from '../constructor/constructor-slice';

describe('currentIngredientSlice reducers', () => {
	const mockConstructorIngredient: ConstructorIngredient = {
		_id: '60d3b41abdacab0026a733c6',
		name: 'Краторная булка N-200i',
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
	};

	it('should set current ingredient', () => {
		const action = currentIngredientSlice.actions.setCurrentIngredient(
			mockConstructorIngredient
		);

		const state = currentIngredientSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			currentIngredient: mockConstructorIngredient,
		});
	});
	it('should clear ingredient from state', () => {
		const currentState: CurrentIngredient = {
			currentIngredient: mockConstructorIngredient,
		};

		const action = currentIngredientSlice.actions.clearCurrentIngredient();
		const state = currentIngredientSlice.reducer(currentState, action);

		expect(state).toEqual({ ...initialState, currentIngredient: null });
	});
});
