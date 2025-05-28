import { ProcessedOrder, TOrder } from '../services/features/websocket/types';
import { IngredientsApi } from '../types/data-types';

export const enrichOrders = (
	orders: TOrder[],
	allIngredients: IngredientsApi
) => {
	return orders.map((order) => {
		const ingredientsData = order.ingredients.map((id) =>
			allIngredients.data.find((ing) => ing._id === id)
		);

		console.log('Обработка заказа:', {
			orderId: order._id,
			foundIngredients: ingredientsData.filter(Boolean).length,
			totalItems: order.ingredients.length,
		});

		const totalPrice = order.ingredients.reduce((sum, id) => {
			const ingredient = allIngredients.data.find((ing) => ing._id === id);
			return sum + (ingredient?.price || 0);
		}, 0);

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
