import { createSlice } from '@reduxjs/toolkit';
import { Ingredients } from '../../../types/data-types';

interface CurrentIngredient {
	currentIngredient: Ingredients | null;
}
const initialState: CurrentIngredient = {
	currentIngredient: null,
};
const currentIngredientSlice = createSlice({
	name: 'currentIngredient',
	initialState,
	reducers: {
		setCurrentIngredient: (state, action) => {
			state.currentIngredient = action.payload;
		},
		clearCurrentIngredient: (state) => {
			state.currentIngredient = null;
		},
	},
});

export const { setCurrentIngredient, clearCurrentIngredient } =
	currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;
