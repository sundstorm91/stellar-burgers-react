import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ingredientsApiConfig } from '../ingredients/ingredientsSlice';

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
	async (ingredientIds: string[], { rejectWithValue }) => {
		try {
			const response = await fetch(`${ingredientsApiConfig.baseUrl}/orders`, {
				method: 'POST',
				headers: ingredientsApiConfig.headers,
				body: JSON.stringify({
					ingredients: ingredientIds,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to create order!');
			}

			const data = await response.json();
			return data as ResponseData;
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Unknown error'
			);
		}
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
