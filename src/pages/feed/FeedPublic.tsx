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
import { enrichOrders, splitOrders } from '../../utils/order-utils';

export const FeedPublic: React.FC = () => {
	const dispatch = useAppDispatch();
	const { ingredients } = useAppSelector((state) => state.ingredients);
	const { data } = useAppSelector((state) => state.websocket.public);

	// 2. Подключение к WebSocket
	useEffect(() => {
		dispatch(
			wsConnect({
				url: ingredientsApiConfig.orderAllUrl,
				feedType: 'public',
			})
		);

		return () => {
			dispatch(wsDisconnect('public'));
		};
	}, [dispatch]);

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
			return;
		}

		const fillingOrders = enrichOrders(data?.orders, ingredients);

		const doneOrders: number[] = [];
		const pendingOrders: number[] = [];
		splitOrders(data?.orders, doneOrders, pendingOrders);

		setProcessedOrders(fillingOrders); /* ! */
		setOrderStats({
			total: data.total || 0,
			totalToday: data.totalToday || 0,
			done: doneOrders.slice(0, 7),
			pending: pendingOrders.slice(0, 7),
		});
	}, [data, ingredients, ingredients.data]);

	return (
		<div className={styles.feedContainer}>
			<h2 className={styles.feedTitle}>Лента заказов</h2>

			<div className={styles.feed}>
				{/* Заказы */}
				<div className={styles.feedWrapper}>
					{processedOrders.map((order) => (
						<OrderCard
							key={order._id}
							order={order}
							maxItems={5}
							routePrefix='feed'
						/>
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
