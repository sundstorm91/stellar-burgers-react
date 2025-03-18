import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredients } from '../../../types/data-types';

export interface ConstructorIngredient extends Ingredients {
	constructorId?: string;
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
			state.ingredients = state.ingredients.filter(
				(ingredient) => ingredient.constructorId !== action.payload
			);
		},

		reorderIngredient: (
			state,
			action: PayloadAction<{ startIndex: number; endIndex: number }>
		) => {
			const { startIndex, endIndex } = action.payload;
			const [removed] = state.ingredients.splice(startIndex, 1);
			state.ingredients.splice(endIndex, 0, removed);
			// Update the order ingredients
			//state.orderIngredients = getOrderIngredients(state.bun, state.fillings);
		},
	},
});

export const { addIngredient, reorderIngredient, removeIngredient } =
	burgerBuilderSlice.actions;
export default burgerBuilderSlice.reducer;
