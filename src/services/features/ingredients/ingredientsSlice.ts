import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IngredientsApi } from '../../../types/data-types';

export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

interface ingredientsState {
	ingredients: IngredientsApi;
	loading: boolean;
	error: string | null;
}

const initialState: ingredientsState = {
	ingredients: { data: [] },
	loading: false,
	error: null,
};

export const fetchIngredients = createAsyncThunk<
	IngredientsApi,
	undefined,
	{ rejectValue: string }
>('ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(
			`${ingredientsApiConfig.baseUrl}/ingredients`,
			{
				headers: ingredientsApiConfig.headers,
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch ingredients');
		}

		const data = await response.json();
		return data as IngredientsApi;
	} catch (error) {
		return rejectWithValue(
			error instanceof Error ? error.message : 'Unknown error'
		);
	}
});

const ingredientsSlice = createSlice({
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
				state.error = action.payload!;
			});
	},
});

export default ingredientsSlice.reducer;
