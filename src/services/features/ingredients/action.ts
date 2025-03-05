import { AppDispatch } from '../../..';
import { Ingredients } from '../../../components/types/data-types';
import { getIngredients } from '../../api/ingredientsApi';

export const FETCH_INGREDIENTS_START = 'FETCH_INGREDIENTS_START';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export interface FetchIngredientsStart {
	type: 'FETCH_INGREDIENTS_START';
}

export interface FetchIngredientsSuccess {
	type: 'FETCH_INGREDIENTS_SUCCESS';
	payload: Ingredients[];
}

export interface FetchIngredientsFailure {
	type: 'FETCH_INGREDIENTS_FAILURE';
	payload: string;
}

export const loadIngredients = () => {
	return function (dispatch: AppDispatch) {
		dispatch({ type: FETCH_INGREDIENTS_START });
		return getIngredients()
			.then((data) => {
				dispatch({
					type: FETCH_INGREDIENTS_SUCCESS,
					payload: data,
				});
			})
			.catch((err: string) => {
				dispatch({
					type: FETCH_INGREDIENTS_FAILURE,
					payload: `${err}`,
				});
			});
	};
};
