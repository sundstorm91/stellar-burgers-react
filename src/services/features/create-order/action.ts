import { createOrder, CreateOrderResponse } from '../../api/ingredientsApi';
import { AppDispatch } from '../../..';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

interface CreateOrderRequestAction {
	type: typeof CREATE_ORDER_REQUEST;
}

interface CreateOrderSuccessAction {
	type: typeof CREATE_ORDER_SUCCESS;
	payload: CreateOrderResponse;
}

interface CreateOrderFailureAction {
	type: typeof CREATE_ORDER_FAILURE;
	payload: string; // Error message
}

export type OrderActionTypes =
	| CreateOrderRequestAction
	| CreateOrderSuccessAction
	| CreateOrderFailureAction;

export const createOrderAction = (name: string, ingredients: string[]) => {
	return async function (dispatch: AppDispatch) {
		dispatch({ type: CREATE_ORDER_REQUEST });

		try {
			const requestBody = { name, ingredients };
			const response = await createOrder(requestBody);
			dispatch({
				type: CREATE_ORDER_SUCCESS,
				payload: {
					name: response.name,
					order: response.order,
				},
			});
		} catch (error) {
			dispatch({
				type: CREATE_ORDER_FAILURE,
				payload:
					error instanceof Error ? error.message : 'Failed to create order',
			});
		}
	};
};
