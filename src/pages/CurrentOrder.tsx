import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { calcTotalPrice, groupOrder } from '../utils/order-utils';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Spinner } from '../components/spinner/spinner';

export const CurrentOrder: React.FC = () => {
	const { id } = useParams<'id'>();
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state) => state.websocket.public);
	const { ingredients } = useAppSelector((state) => state.ingredients);

	const order = data?.orders.find((o) => o._id === id);
	/* useEffect(() => {
		if (!order) {
			dispatch()
		}
	}, [dispatch]); */

	if (!order) {
		return <Spinner />;
	}

	const ingredientsData = groupOrder(order!, ingredients);
	const totalPrice = calcTotalPrice(order!, ingredients);

	/* Если заказа нет в Redux, загружаем отдельно
		const { data: apiOrder, loading } = useGetOrderQuery(id!, {
		skip: !!order || !id,
  });
  	const currentOrder = order || apiOrder; */

	return (
		<div className={styles.currentOrderContainer}>
			<span className='text text_type_digits-default'>#{order?.number}</span>
			<p className={styles.currentNameOrder}>{order?.name}</p>
			<p className={styles.currentStatus}>
				{order?.status === 'done' ? 'Выполнен' : 'В работе'}
			</p>

			<div>
				<h2>Состав:</h2>
				<ul className={styles.ingredientsOrder}>
					{ingredientsData.map((item) => {
						return (
							<li
								key={`${item?._id}_${nanoid()}`}
								className={styles.ingredientsOrderItem}>
								<div className={styles.testItem}>
									<img src={item?.image_mobile} alt={item?.name} />
								</div>
								<div>{item?.name}</div>
								<div className={styles.orderPrice}>
									{item?.count} x {item?.price} <CurrencyIcon type='primary' />
								</div>
							</li>
						);
					})}
				</ul>

				<div className={styles.subField}>
					<div className={styles.orderExecutionTime}>
						{<FormattedDate date={new Date(order!.createdAt)} />}
					</div>
					<div className={styles.ingredientPrice}>
						<div className='text text_type_digits-default'>{totalPrice}</div>
						<CurrencyIcon type={'primary'} />
					</div>
				</div>
			</div>
		</div>
	);
};
