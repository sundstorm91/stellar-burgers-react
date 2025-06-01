import {
	wsConnectProfile,
	wsDisconnectProfile,
} from '../../services/features/websocket/feed-profile/actions';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import styles from '../pages.module.css';
import { OrderCard } from '../feed/components/orderCard';
import { ProcessedOrder } from '../../services/features/websocket/types';
import { ingredientsApiConfig } from '@utils/api-utils';

export const OrdersHistory: React.FC = () => {
	const dispatch = useAppDispatch();
	const { ingredients } = useAppSelector((state) => state.ingredients);
	const { data } = useAppSelector((state) => state.wsProfileFeed);
	const token = localStorage.getItem('accessToken')?.split(' ')[1];
	const [processedOrders, setProcessedOrders] = useState<ProcessedOrder[]>([]);

	useEffect(() => {
		dispatch(
			wsConnectProfile(`${ingredientsApiConfig.orderCurrentUrl}?token=${token}`)
		);

		return () => {
			dispatch(wsDisconnectProfile());
		};
	}, [dispatch, token]);

	useEffect(() => {
		if (!data?.orders || !ingredients.data) {
			console.log('123');
			return;
		}

		const enrichedOrders = data.orders.map((order) => {
			const ingredientsData = order.ingredients.map((id) =>
				ingredients.data.find((ing) => ing._id === id)
			);

			return {
				...order,
				ingredientsData,
				totalPrice: order.ingredients.reduce((sum, id) => {
					const ingredient = ingredients.data.find((ing) => ing._id === id);
					return sum + (ingredient?.price || 0);
				}, 0),
			};
		});
		setProcessedOrders(enrichedOrders);
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
