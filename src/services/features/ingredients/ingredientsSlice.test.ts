import { IngredientsApi } from '../../../types/data-types';
import {
	initialState,
	fetchIngredients,
	ingredientsSlice,
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
	/* инициализация начального состояния */
	it('should return initialState', () => {
		expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});
});

describe('ingredientsSlice async thunks', () => {
	const mockApiResponse: IngredientsApi = {
		success: true,
		data: [
			{
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
			},
		],
	};

	/* Обработка actions fetchIngredients */
	it('should handle pending', () => {
		const action = fetchIngredients.pending('requestId');
		const state = ingredientsSlice.reducer(initialState, action);

		expect(state).toEqual({ ...initialState, loading: true, error: null });
	});

	it('should handle fulfilled with correct typing', () => {
		const action = fetchIngredients.fulfilled(mockApiResponse, 'requestId');

		const state = ingredientsSlice.reducer(initialState, action);

		expect(state).toEqual({
			loading: false,
			ingredients: mockApiResponse,
			error: null,
		});
	});
	it('should correct handling reject', () => {
		const errorMockMessage = 'Ошибка загрузки';
		const action = fetchIngredients.rejected(
			new Error(errorMockMessage),
			'requestId'
		);
		const state = ingredientsSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			loading: false,
			error: errorMockMessage,
		});
	});
});
