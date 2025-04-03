import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsApiConfig } from '../ingredients/ingredientsSlice';
import { checkResponse } from '../../../utils/api-utils';

interface OrderState {
	orderNumber: number | null;
	loading: boolean;
	error: string | null;
}

export interface ResponseData {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

const initialState: OrderState = {
	orderNumber: null,
	loading: false,
	error: null,
};

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds: Array<string>) => {
		return fetch(`${ingredientsApiConfig.baseUrl}/orders`, {
			headers: ingredientsApiConfig.headers,
			method: 'POST',
			body: JSON.stringify({
				ingredients: ingredientIds,
			}),
		}).then(checkResponse);
	}
);

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearOrder: (state) => {
			state.orderNumber = null;
			state.error = null;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.orderNumber = action.payload.order.number;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
