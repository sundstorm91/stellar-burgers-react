import { Ingredients } from '../../../components/types/data-types';
import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REORDER_INGREDIENT,
	ConstructorActionTypes,
} from './types';

export interface BurgerConstructorState {
	bun: Ingredients | null;
	ingredients: Ingredients[];
}

const initialState: BurgerConstructorState = {
	bun: null,
	ingredients: [],
};

export const builderReducer = (
	state = initialState,
	action: any /* ConstructorActionTypes */
): BurgerConstructorState => {
	switch (action.type) {
		case ADD_INGREDIENT:
			const { ingredient, position } = action.payload;
			if (position === 'middle') {
				return {
					...state,
					ingredients: [...state.ingredients, ingredient],
				};
			} else {
				return {
					...state,
					[position]: ingredient,
				};
			}

		case REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter(
					(_, index) => index !== action.payload.index
				),
			};
		case REORDER_INGREDIENT:
			const { fromIndex, toIndex } = action.payload;
			const updatedMiddle = [...state.ingredients];
			const [movedIngredient] = updatedMiddle.splice(fromIndex, 1);
			updatedMiddle.splice(toIndex, 0, movedIngredient);
			return {
				...state,
				ingredients: updatedMiddle,
			};
		default:
			return state;
	}
};
