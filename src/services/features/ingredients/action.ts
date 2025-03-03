import { AppDispatch } from '../../..';
import { getIngredients } from '../../api/ingredientsApi';

export const FETCH_INGREDIENTS_START = 'FETCH_INGREDIENTS_START';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const loadIngredients = () => {
	return function (dispatch: AppDispatch) {
		dispatch({ type: FETCH_INGREDIENTS_START });
		return getIngredients()
			.then((data) => {
				dispatch({
					type: FETCH_INGREDIENTS_SUCCESS,
					payload: data.data,
				});
			})
			.catch((err: Error) => {
				dispatch({
					type: FETCH_INGREDIENTS_FAILURE,
					payload: err.message,
				});
			});
	};
};
