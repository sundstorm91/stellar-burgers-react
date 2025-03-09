import { Ingredients } from '../../../components/types/data-types';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, REORDER_INGREDIENT } from './types';

export const addIngredient = (
	ingredient: Ingredients,
	position: 'bun' | 'middle'
) => ({
	type: ADD_INGREDIENT,
	payload: { ingredient, position },
});

export const removeIngredient = (index: number) => ({
	type: REMOVE_INGREDIENT,
	payload: { index },
});

export const reorderIngredient = (fromIndex: number, toIndex: number) => ({
	type: REORDER_INGREDIENT,
	payload: { fromIndex, toIndex },
});
