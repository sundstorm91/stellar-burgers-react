// src/store/reducers/burgerConstructorReducer.ts
import {
	BurgerConstructorState,
	BurgerConstructorActionTypes,
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REORDER_INGREDIENTS,
} from './action';

const initialState: BurgerConstructorState = {
	bunTop: null,
	ingredients: [],
	bunBottom: null,
};

export const burgerConstructorReducer = (
	state = initialState,
	action: any
): BurgerConstructorState => {
	switch (action.type) {
		case ADD_INGREDIENT:
			const { type, _id } = action.payload;
			if (type === 'bun') {
				return {
					...state,
					bunTop: action.payload,
					bunBottom: action.payload,
				};
			} else {
				return {
					...state,
					ingredients: [...state.ingredients, action.payload],
				};
			}
		case REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter(
					(item) => item._id !== action.payload.id
				),
			};
		case REORDER_INGREDIENTS:
			const { startIndex, endIndex } = action.payload;
			const newIngredients = [...state.ingredients];
			const [removed] = newIngredients.splice(startIndex, 1);
			newIngredients.splice(endIndex, 0, removed);
			return {
				...state,
				ingredients: newIngredients,
			};
		default:
			return state;
	}
};
