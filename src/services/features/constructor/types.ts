import { Ingredients } from '../../../components/types/data-types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REORDER_INGREDIENT = 'REORDER_INGREDIENT';

export interface AddIngredientAction {
	type: typeof ADD_INGREDIENT;
	payload: {
		ingredient: Ingredients;
		position: 'bun' | 'middle';
	};
}

export interface RemoveIngredientAction {
	type: typeof REMOVE_INGREDIENT;
	payload: {
		index: number;
	};
}

export interface ReorderIngredientsAction {
	type: typeof REORDER_INGREDIENT;
	payload: {
		fromIndex: number;
		toIndex: number;
	};
}

export type ConstructorActionTypes =
	| AddIngredientAction
	| RemoveIngredientAction
	| ReorderIngredientsAction;
