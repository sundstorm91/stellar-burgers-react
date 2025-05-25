import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import styles from '../pages.module.css';
import { useEffect, useState } from 'react';
import {
	wsConnect,
	wsDisconnect,
} from '../../services/features/websocket/actions';
import { ingredientsApiConfig } from '../../utils/api-utils';
import {
	OrderStats,
	ProcessedOrder,
} from '../../services/features/websocket/types';
import { OrderCard } from './components/orderCard';
import { OrderStatus } from './components/orderStatus';
import { store } from '../../services/store/store';

export const Feed: React.FC = () => {
	const dispatch = useAppDispatch();
	const { ingredients } = useAppSelector((state) => state.ingredients);
	const { data, connected, error, connecting } = useAppSelector(
		(state) => state.websocket.public
	);
	console.log('Redux state:', store.getState().websocket);
	// 1. Логирование состояния подключения
	useEffect(() => {
		console.log('WebSocket status:', { connected, connecting, error });
	}, [connected, connecting, error]);

	// 2. Подключение к WebSocket
	useEffect(() => {
		console.log('Инициализация WebSocket соединения...');
		dispatch(
			wsConnect({
				url: ingredientsApiConfig.orderAllUrl,
				feedType: 'public',
			})
		);

		return () => {
			console.log('Отключение WebSocket...');
			dispatch(wsDisconnect('public'));
		};
	}, [dispatch]);

	// 3. Логирование сырых данных
	useEffect(() => {
		if (data) {
			console.log('Получены RAW данные от сервера:', data);
		}
	}, [data]);

	// 4. Обработка данных
	const [processedOrders, setProcessedOrders] = useState<ProcessedOrder[]>([]);
	const [orderStats, setOrderStats] = useState<OrderStats>({
		done: [],
		pending: [],
		total: 0,
		totalToday: 0,
	});

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

		const doneOrders: number[] = [];
		const pendingOrders: number[] = [];

		data.orders.forEach((order) => {
			if (order.status === 'done') doneOrders.push(order.number);
			else if (order.status === 'pending') pendingOrders.push(order.number);
		});

		console.log('Статистика по заказам:', {
			total: data.total,
			totalToday: data.totalToday,
			doneCount: doneOrders.length,
			pendingCount: pendingOrders.length,
		});

		setProcessedOrders(enrichedOrders.slice(0, 20));
		setOrderStats({
			total: data.total || 0,
			totalToday: data.totalToday || 0,
			done: doneOrders.slice(0, 7),
			pending: pendingOrders.slice(0, 7),
		});
	}, [data, ingredients.data]);

	// 5. Логирование готовых к отображению данных
	useEffect(() => {
		if (processedOrders.length > 0) {
			console.log('Готовые к отображению заказы:', {
				count: processedOrders.length,
				sample: processedOrders[0],
			});
		}
	}, [processedOrders]);

	useEffect(() => {
		if (data) {
			console.log('Полная структура data:', JSON.parse(JSON.stringify(data)));
		} else if (!data) {
			console.log('data is null');
			return;
		}
	}, [data]);

	return (
		<div className={styles.feedContainer}>
			<h2 className={styles.feedTitle}>Лента заказов</h2>

			<div className={styles.feed}>
				{/* Заказы */}
				<div className={styles.feedWrapper}>
					{processedOrders.map((order) => (
						<OrderCard key={order._id} order={order} maxItems={5} />
					))}
				</div>
				{/* Статистика */}
				<div className={styles.reportWrapper}>
					<OrderStatus
						ready={orderStats.done}
						inProgress={orderStats.pending}
					/>
					{/* TotalToday, total */}
					<div className={styles.completeAllTime}>
						<span className={styles.subTitle}>Выполнено за все время:</span>
						<span className='text text_type_digits-large'>
							{orderStats.total}
						</span>
					</div>

					<div className={styles.completeToday}>
						<span className={styles.subTitle}>Выполнено за сегодня:</span>
						<span className='text text_type_digits-large'>
							{orderStats.totalToday}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
