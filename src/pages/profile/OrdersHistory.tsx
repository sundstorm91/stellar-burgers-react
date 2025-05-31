import {
	wsConnect,
	wsDisconnect,
} from '../../services/features/websocket/actions';
import { ingredientsApiConfig } from '../../utils/api-utils';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import styles from '../pages.module.css';
import { OrderCard } from '../feed/components/orderCard';
import { ProcessedOrder } from '../../services/features/websocket/types';

export const OrdersHistory: React.FC = () => {
	const dispatch = useAppDispatch();
	const { ingredients } = useAppSelector((state) => state.ingredients);
	const { data } = useAppSelector((state) => state.websocket.private);
	const token = localStorage.getItem('accessToken')?.split(' ')[1];
	const [processedOrders, setProcessedOrders] = useState<ProcessedOrder[]>([]);
	// 2. Подключение к WebSocket
	useEffect(() => {
		console.log('Инициализация WebSocket соединения...');
		dispatch(
			wsConnect({
				url: `${ingredientsApiConfig.orderCurrentUrl}`,
				feedType: 'private',
				authToken: token!,
			})
		);

		return () => {
			console.log('Отключение WebSocket...');
			dispatch(wsDisconnect('private'));
		};
	}, [dispatch, token]);

	useEffect(() => {
		if (!data?.orders || !ingredients.data) {
			console.log('Нет данных для обработки:', {
				hasOrders: !!data?.orders,
				hasIngredients: !!ingredients.data,
			});
			return;
		}

		console.log('Начало обработки данных...');

		const enrichedOrders = data.orders.map((order) => {
			const ingredientsData = order.ingredients.map((id) =>
				ingredients.data.find((ing) => ing._id === id)
			);

			console.log('Обработка заказа:', {
				orderId: order._id,
				foundIngredients: ingredientsData.filter(Boolean).length,
				totalItems: order.ingredients.length,
			});

			return {
				...order,
				ingredientsData,
				totalPrice: order.ingredients.reduce((sum, id) => {
					const ingredient = ingredients.data.find((ing) => ing._id === id);
					return sum + (ingredient?.price || 0);
				}, 0),
			};
		});
		setProcessedOrders(enrichedOrders.slice(0, 20));
	}, [data, ingredients.data]);

	return (
		<div className={styles.orderFeed}>
			{processedOrders.map((order) => (
				<OrderCard
					key={order._id}
					order={order}
					maxItems={5}
					routePrefix='profile/orders'
				/>
			))}
		</div>
	);
};
