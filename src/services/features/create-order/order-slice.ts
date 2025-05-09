import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchWithRefresh,
	ingredientsApiConfig,
} from '../../../utils/api-utils';

interface OrderState {
	orderName: string | null;
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
	orderName: null,
	orderNumber: null,
	loading: false,
	error: null,
};

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds: string[], { rejectWithValue }) => {
		const accessToken = localStorage.getItem('accessToken');
		try {
			return await fetchWithRefresh<ResponseData>(
				`${ingredientsApiConfig.baseUrl}/orders`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${accessToken}`,
					},
					method: 'POST',
					body: JSON.stringify({
						ingredients: ingredientIds,
					}),
				}
			);
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Неизвестная ошибка'
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
			state.orderName = null;
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
			.addCase(
				createOrder.fulfilled,
				(state, action: PayloadAction<ResponseData>) => {
					state.loading = false;
					state.orderNumber = action.payload.order.number;
					state.orderName = action.payload.name;
					state.error = null;
				}
			)
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
