import { Actions } from '@services/services-types';
import { Ingredients } from '../../../components/types/data-types';
import {
	FETCH_INGREDIENTS_FAILURE,
	FETCH_INGREDIENTS_START,
	FETCH_INGREDIENTS_SUCCESS,
} from './action';

interface ApiState {
	ingredients: Ingredients[];
	loading: boolean;
	error: Error | null;
}

const initialState: ApiState = {
	ingredients: [],
	loading: false,
	error: null,
};

export const reducerApi = (
	state = initialState,
	action: Actions<Ingredients[], Error>
) => {
	switch (action.type) {
		case FETCH_INGREDIENTS_START:
			return {
				...state,
				loading: true,
			};

		case FETCH_INGREDIENTS_SUCCESS:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload as Ingredients],
				loading: false,
			};
		case FETCH_INGREDIENTS_FAILURE:
			return {
				...state,
				error: action.payload as Error,
				loading: false,
			};

		default:
			return state;
	}
};
