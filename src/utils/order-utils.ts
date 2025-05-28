import { ProcessedOrder, TOrder } from '../services/features/websocket/types';
import { IngredientsApi } from '../types/data-types';

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

export function calcTotalPrice(order: TOrder, allIngredients: IngredientsApi) {
	return order.ingredients.reduce((sum, id) => {
		const ingredient = allIngredients.data.find((ing) => ing._id === id);
		return sum + (ingredient?.price || 0);
	}, 0);
}
