import {
	Ingredients,
	IngredientsApi,
} from '../../../components/types/data-types';
import {
	FETCH_INGREDIENTS_FAILURE,
	FETCH_INGREDIENTS_START,
	FETCH_INGREDIENTS_SUCCESS,
	/* FetchIngredientsFailure,
	FetchIngredientsStart,
	FetchIngredientsSuccess, */
} from './action';

export interface ApiState {
	ingredients: IngredientsApi;
	loading: boolean;
	error: string | null;
}

const initialState: ApiState = {
	ingredients: { data: [], success: false },
	loading: false,
	error: null,
};

/* type IngredientsAction =
	| FetchIngredientsStart
	| FetchIngredientsSuccess
	| FetchIngredientsFailure;
 */
export const reducerApi = (
	state: ApiState = initialState,
	action: any
): ApiState => {
	switch (action.type) {
		case FETCH_INGREDIENTS_START:
			return {
				...state,
				loading: true,
			};

		case FETCH_INGREDIENTS_SUCCESS:
			return {
				...state,
				loading: false,
				ingredients: action.payload,
			};
		case FETCH_INGREDIENTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
