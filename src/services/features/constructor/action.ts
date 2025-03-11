import { Ingredients } from '../../../components/types/data-types';

export interface BurgerConstructorState {
	bunTop: Ingredients | null;
	ingredients: Ingredients[];
	bunBottom: Ingredients | null;
}

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';

export interface AddIngredientAction {
	type: typeof ADD_INGREDIENT;
	payload: Ingredients;
}

export interface RemoveIngredientAction {
	type: typeof REMOVE_INGREDIENT;
	payload: { id: string };
}

export interface ReorderIngredientsAction {
	type: typeof REORDER_INGREDIENTS;
	payload: { startIndex: number; endIndex: number };
}

export type BurgerConstructorActionTypes =
	| AddIngredientAction
	| RemoveIngredientAction
	| ReorderIngredientsAction;
