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
				console.log('add отработал!');
			}
		},

		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(
				(ingredient) => ingredient.constructorId !== action.payload
			);
		},

		reorderIngredientByIdx: (
			state,
			action: PayloadAction<{ startIndex: number; endIndex: number }>
		) => {
			const { startIndex, endIndex } = action.payload;
			const [removed] = state.ingredients.splice(startIndex, 1);
			state.ingredients.splice(endIndex, 0, removed);
		},

		reorderIngredient: (
			state,
			action: PayloadAction<{ draggedId: string; targetId: string }>
		) => {
			const { draggedId, targetId } = action.payload;

			const draggedIndex = state.ingredients.findIndex(
				(ing) => ing.constructorId === draggedId
			);
			const targetIndex = state.ingredients.findIndex(
				(ing) => ing.constructorId === targetId
			);

			if (draggedIndex !== -1 && targetIndex !== -1) {
				const updatedIngredients = [...state.ingredients];
				const [draggedItem] = updatedIngredients.splice(draggedIndex, 1);
				updatedIngredients.splice(targetIndex, 0, draggedItem);
				state.ingredients = updatedIngredients;
			}
		},
	},
});

export const { addIngredient, reorderIngredient, removeIngredient } =
	burgerBuilderSlice.actions;
export default burgerBuilderSlice.reducer;
