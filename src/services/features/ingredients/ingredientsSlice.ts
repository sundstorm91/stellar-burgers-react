import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IngredientsApi } from '../../../types/data-types';
import { checkResponse, ingredientsApiConfig } from '../../../utils/api-utils';

export interface ingredientsState {
	ingredients: IngredientsApi;
	loading: boolean;
	error: string | null;
}

export const initialState: ingredientsState = {
	ingredients: { data: [] },
	loading: false,
	error: null,
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		return fetch(`${ingredientsApiConfig.baseUrl}/ingredients`, {
			headers: ingredientsApiConfig.headers,
		}).then(checkResponse<IngredientsApi>);
	}
);

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(fetchIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})

			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.loading = false;
				state.ingredients = action.payload;
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message!;
			});
	},
});

export default ingredientsSlice.reducer;
