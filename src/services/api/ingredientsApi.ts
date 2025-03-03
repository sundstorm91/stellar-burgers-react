import { IngredientsApi } from '../../components/types/data-types';

export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
	headers: {
		'Content-Type': 'application/json',
	},
};

const getResponse = (res: Response) => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = (): Promise<IngredientsApi> => {
	return fetch(`${ingredientsApiConfig.baseUrl}`, {
		headers: ingredientsApiConfig.headers,
	}).then(getResponse);
};
