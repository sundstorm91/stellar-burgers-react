import { IngredientsApi } from '../../components/types/data-types';

interface CreateOrderRequest {
	name: string;
	ingredients: Array<string>;
}

export interface CreateOrderResponse {
	name: string;
	order: {
		number: number | null;
	};
}
export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
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
	return fetch(`${ingredientsApiConfig.baseUrl}/ingredients`, {
		headers: ingredientsApiConfig.headers,
	}).then(getResponse);
};

export const createOrder = async (
	requestBody: CreateOrderRequest
): Promise<CreateOrderResponse> => {
	try {
		const res = await fetch(`${ingredientsApiConfig.baseUrl}/orders`, {
			method: 'POST',
			headers: ingredientsApiConfig.headers,
			body: JSON.stringify(requestBody),
		});

		if (!res.ok) {
			throw new Error(`Failder to create order: ${res.statusText}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(`Error creating order: ${error}`);
		throw error;
	}
};

export const createOrderTwo = (
	requestBody: CreateOrderRequest
): Promise<CreateOrderResponse> => {
	return fetch(`${ingredientsApiConfig.baseUrl}/orders`, {
		method: 'POST',
		headers: ingredientsApiConfig.headers,
		body: JSON.stringify(requestBody),
	}).then(getResponse);
};
