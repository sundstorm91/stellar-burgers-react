import {
	createOrder,
	initialState,
	orderSlice,
	OrderState,
	ResponseData,
} from './order-slice';

describe('orderSlice extraReducers', () => {
	const ingredientIds = ['id1', 'id2']; // Пример массива ingredientIds

	it('should return initial state', () => {
		expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle pending create-order', () => {
		const action = createOrder.pending('request-id', ingredientIds);

		const state = orderSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle success create order', () => {
		const responseSuccessData: ResponseData = {
			name: 'Заказ',
			order: {
				number: 79445,
			},
			success: true,
		};
		const action = createOrder.fulfilled(
			responseSuccessData,
			'requestId',
			ingredientIds
		);
		const state = orderSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			orderName: responseSuccessData.name,
			orderNumber: responseSuccessData.order.number,
			loading: false,
			error: null,
		});
	});

	it('should handle reject', () => {
		const errorMockMessage = 'Ошибка создания заказа';
		const action = createOrder.rejected(
			{
				name: 'Error',
				message: errorMockMessage,
			},
			'requestId',
			ingredientIds,
			errorMockMessage
		);
		const state = orderSlice.reducer(initialState, action);
		expect(state).toEqual({
			...initialState,
			loading: false,
			error: errorMockMessage, // редьюсер берет message из action.payload
		});
	});
});

describe('orderSlice reducers', () => {
	it('should handle clearOrder', () => {
		const initialStateWithData = {
			...initialState,
			orderNumber: 79445,
			orderName: 'Случайное название заказа',
			error: 'Случайное название ошибки',
			loading: true,
		};

		const state = orderSlice.reducer(
			initialStateWithData,
			orderSlice.actions.clearOrder()
		);

		expect(state).toEqual({
			...initialStateWithData,
			orderNumber: null,
			orderName: null,
			error: null,
			loading: false,
		});
	});

	it('should handle clearCurrentOrder', () => {
		const initialStateWithData: OrderState = {
			...initialState,
			currentOrder: {
				_id: 'случайный id заказа',
				createdAt: '00:00',
				ingredients: ['id1', 'id2'],
				name: 'Случайное название заказа',
				number: 79441,
				status: 'done',
				updatedAt: '01:00',
			},
			fetchError: 'Случайная ошибка во время заказа',
			fetchLoading: true,
		};

		const state = orderSlice.reducer(
			initialStateWithData,
			orderSlice.actions.clearCurrentOrder()
		);

		expect(state).toEqual({
			...initialStateWithData,
			currentOrder: null,
			fetchError: null,
			fetchLoading: false,
		});
	});
});
