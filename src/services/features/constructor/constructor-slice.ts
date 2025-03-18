import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredients } from '../../../types/data-types';

export interface ConstructorIngredient extends Ingredients {
	generateId?: string;
}

interface BurgerBuilderState {
	bun: ConstructorIngredient | null;
	ingredients: ConstructorIngredient[];
}

const initialState: BurgerBuilderState = {
	bun: null,
	ingredients: [],
};

const burgerBuilderSlice = createSlice({
	name: 'builder',
	initialState,
	reducers: {
		addIngredient: (state, action: PayloadAction<ConstructorIngredient>) => {
			const ingredient = action.payload;
			if (ingredient.type === 'bun') {
				state.bun = ingredient;
			} else {
				state.ingredients.push(ingredient);
			}
		},

		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients.filter(
				(ingredient) => ingredient._id !== action.payload
			);
		},

		reorderIngredient: (
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) => {
			const { fromIndex, toIndex } = action.payload;
			const [removed] = state.ingredients.splice(fromIndex, 1);
			state.ingredients.splice(toIndex, 0, removed);
		},
	},
});

export const { addIngredient, reorderIngredient, removeIngredient } =
	burgerBuilderSlice.actions;
export default burgerBuilderSlice.reducer;
