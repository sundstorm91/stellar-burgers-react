import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredients } from '../../../types/data-types';

export interface ConstructorIngredient extends Ingredients {
	constructorId?: string;
}

export interface BurgerBuilderState {
	bun: ConstructorIngredient | null;
	ingredients: ConstructorIngredient[];
}

export const initialState: BurgerBuilderState = {
	bun: null,
	ingredients: [],
};

export const burgerBuilderSlice = createSlice({
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

		updateIngredient: (
			state,
			action: PayloadAction<ConstructorIngredient[]>
		) => {
			state.ingredients = action.payload;
		},

		saveConstructorState: (
			state,
			action: PayloadAction<{
				bun: ConstructorIngredient | null;
				ingredients: ConstructorIngredient[];
			}>
		) => {
			state.bun = action.payload.bun;
			state.ingredients = action.payload.ingredients;
		},

		clearConstructorState: (state) => {
			(state.bun = null), (state.ingredients = []);
		},
	},
});

export const {
	addIngredient,
	reorderIngredient,
	removeIngredient,
	updateIngredient,
	saveConstructorState,
	clearConstructorState,
} = burgerBuilderSlice.actions;
export default burgerBuilderSlice.reducer;
