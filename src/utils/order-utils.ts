import { ProcessedOrder, TOrder } from '../services/features/websocket/types';
import { Ingredients, IngredientsApi } from '../types/data-types';
import { ingredientsApiConfig } from './api-utils';

export const enrichOrders = (
	orders: TOrder[],
	allIngredients: IngredientsApi
) => {
	return orders.map((order) => {
		const ingredientsData = fillIngredients(order, allIngredients);

		console.log('Обработка заказа:', {
			orderId: order._id,
			foundIngredients: ingredientsData.filter(Boolean).length,
			totalItems: order.ingredients.length,
		});

		const totalPrice = calcTotalPrice(order, allIngredients);

		return {
			...order,
			ingredientsData,
			totalPrice,
		} as ProcessedOrder;
	});
};

export function splitOrders(
	data: TOrder[],
	doneOrders: number[],
	pendingOrders: number[]
) {
	data.forEach((order) => {
		if (order.status === 'done') doneOrders.push(order.number);
		else if (order.status === 'pending') pendingOrders.push(order.number);
	});
}

export function fillIngredients(order: TOrder, allIngredients: IngredientsApi) {
	return order.ingredients.map((id) =>
		allIngredients.data.find((ing) => ing._id === id)
	);
}

export function groupOrder(order: TOrder, allIngredients: IngredientsApi) {
	// Сначала создаем массив всех ингредиентов (с возможными дубликатами)
	const allOrderIngredients = order.ingredients
		.map((id) => allIngredients.data.find((ing) => ing._id === id))
		.filter(Boolean); // Фильтруем, чтобы убрать возможные undefined

	// Создаем объект для подсчета количества каждого ингредиента
	const ingredientCountMap: Record<string, number> = {};

	order.ingredients.forEach((id) => {
		ingredientCountMap[id] = (ingredientCountMap[id] || 0) + 1;
	});

	// Создаем массив уникальных ингредиентов с полем count
	const uniqueIngredients = allOrderIngredients.reduce((acc, ingredient) => {
		if (!ingredient) return acc;

		// Проверяем, есть ли уже этот ингредиент в аккумуляторе
		const existingIngredient = acc.find((item) => item._id === ingredient._id);

		if (!existingIngredient) {
			// Если нет, добавляем с полем count
			acc.push({
				...ingredient,
				count: ingredientCountMap[ingredient._id] || 1,
			});
		}

		return acc;
	}, [] as (Ingredients & { count: number })[]);

	return uniqueIngredients;
}

export function calcTotalPrice(order: TOrder, allIngredients: IngredientsApi) {
	return order.ingredients.reduce((sum, id) => {
		const ingredient = allIngredients.data.find((ing) => ing._id === id);
		return sum + (ingredient?.price || 0);
	}, 0);
}

export const fetchOrderById = async (orderId: string): Promise<TOrder> => {
	const response = await fetch(`${ingredientsApiConfig.orders}?id=${orderId}`);
	const data = await response.json();

	if (!data.orders || data.orders.length === 0) {
		throw new Error('Order not found');
	}
	return data
		.orders[0] as TOrder /* Для понимания typescript'y чтобы он понимал какой ответ придет от сервера */;
};

export const fetchOrderByNumber = async (
	orderNumber: number
): Promise<TOrder> => {
	const response = await fetch(
		`${ingredientsApiConfig.orders}?number=${orderNumber}`
	);
	const data = await response.json();
	if (!data.orders || data.orders.length === 0) {
		throw new Error('Order not found');
	}
	return data
		.orders[0] as TOrder /* Для понимания typescript'y чтобы он понимал какой ответ придет от сервера */;
};
