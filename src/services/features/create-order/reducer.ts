import { CreateOrderResponse } from '../../api/ingredientsApi';
import {
	CREATE_ORDER_FAILURE,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
} from './action';

interface OrderState {
	loading: boolean;
	error: string | null;
	order: CreateOrderResponse | null;
}

const initialState: OrderState = {
	loading: false,
	error: null,
	order: null,
};

export const orderReducer = (
	state: OrderState = initialState,
	action: any
): OrderState => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case CREATE_ORDER_SUCCESS:
			return {
				...state,
				loading: false,
				order: {
					name: action.payload.name,
					order: action.payload.order.number /* ! */,
				},
			};
		case CREATE_ORDER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
