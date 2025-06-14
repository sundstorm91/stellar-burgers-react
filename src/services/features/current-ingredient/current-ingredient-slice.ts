import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConstructorIngredient } from '../constructor/constructor-slice';

export interface CurrentIngredient {
	currentIngredient: ConstructorIngredient | null;
}
export const initialState: CurrentIngredient = {
	currentIngredient: null,
};
export const currentIngredientSlice = createSlice({
	name: 'currentIngredient',
	initialState,
	reducers: {
		setCurrentIngredient: (
			state,
			action: PayloadAction<ConstructorIngredient>
		) => {
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
