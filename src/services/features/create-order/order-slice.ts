import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchWithRefresh,
	ingredientsApiConfig,
} from '../../../utils/api-utils';
import { fetchOrderByNumber } from '@utils/order-utils';
import { TOrder } from '../websocket/types';

export interface OrderState {
	orderName: string | null;
	orderNumber: number | null;
	loading: boolean;
	error: string | null;
	currentOrder: TOrder | null;
	fetchLoading: boolean;
	fetchError: string | null;
}

export interface ResponseData {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export const initialState: OrderState = {
	orderName: null,
	orderNumber: null,
	loading: false,
	error: null,
	currentOrder: null,
	fetchLoading: false,
	fetchError: null,
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

export const getCurrentOrder = createAsyncThunk(
	'order/CurrentOrder',
	async (orderNumber: number, { rejectWithValue }) => {
		try {
			return await fetchOrderByNumber(orderNumber);
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Unknown error'
			);
		}
	}
);

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearOrder: (state) => {
			state.orderNumber = null;
			state.orderName = null;
			state.error = null;
			state.loading = false;
		},
		clearCurrentOrder: (state) => {
			state.currentOrder = null;
			state.fetchError = null;
			state.fetchLoading = false;
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
			})
			/* currentOrder */
			.addCase(getCurrentOrder.pending, (state) => {
				state.fetchLoading = true;
				state.fetchError = null;
			})
			.addCase(
				getCurrentOrder.fulfilled,
				(state, action: PayloadAction<TOrder>) => {
					state.fetchLoading = false;
					state.currentOrder = action.payload;
				}
			)
			.addCase(getCurrentOrder.rejected, (state, action) => {
				state.fetchLoading = false;
				state.fetchError = action.payload as string;
			});
	},
});

export const { clearOrder, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
