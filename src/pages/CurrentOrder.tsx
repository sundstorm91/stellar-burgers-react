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
import {
	clearCurrentOrder,
	getCurrentOrder,
} from '../services/features/create-order/order-slice';
import { fetchIngredients } from '../services/features/ingredients/ingredientsSlice';
import { getStatusText } from '../utils/helpers';

export const CurrentOrder: React.FC<{ isModal: boolean }> = ({ isModal }) => {
	const { number } = useParams<{ number: string }>();
	const dispatch = useAppDispatch();
	const { data } = useAppSelector((state) => state.websocket);
	const { ingredients } = useAppSelector((state) => state.ingredients);
	const { currentOrder, fetchLoading, fetchError } = useAppSelector(
		(state) => state.order
	);

	const wsOrder = data?.orders.find((o) => o.number === Number(number));

	useEffect(() => {
		if (!wsOrder && !currentOrder && !fetchLoading && !fetchError) {
			dispatch(getCurrentOrder(Number(number)));
		}
	}, [wsOrder, currentOrder, fetchLoading, fetchError, number, dispatch]);

	useEffect(() => {
		if (ingredients.data.length === 0) {
			dispatch(fetchIngredients());
		}
	}, [dispatch, ingredients]);

	useEffect(() => {
		return () => {
			dispatch(clearCurrentOrder());
		};
	}, [dispatch]);

	const targetOrder = wsOrder ?? currentOrder;

	if (!targetOrder) {
		if (fetchLoading) return <Spinner />;
		if (fetchError) return <div>Ошибка: {fetchError}</div>;
		return null;
	}

	const ingredientsData = groupOrder(targetOrder, ingredients);
	const totalPrice = calcTotalPrice(targetOrder, ingredients);

	return (
		<div
			className={styles.currentOrderContainer}
			style={isModal ? { margin: '20px 0px 20px 0px' } : { margin: '' }}>
			<span className='text text_type_digits-default'>
				#{targetOrder.number}
			</span>
			<p className={styles.currentNameOrder}>{targetOrder.name}</p>
			<p className={styles.currentStatus}>
				{getStatusText(targetOrder.status)}
			</p>

			<div>
				<h2 className={styles.currentTitleOrder}>Состав:</h2>
				<ul className={styles.ingredientsOrder}>
					{ingredientsData.map((item) => {
						return (
							<li
								key={`${item._id}_${nanoid()}`}
								className={styles.ingredientsOrderItem}>
								<div className={styles.testItem}>
									<img src={item?.image_mobile} alt={item.name} />
								</div>
								<div>{item.name}</div>
								<div className={styles.orderPrice}>
									{item.count} x {item.price} <CurrencyIcon type='primary' />
								</div>
							</li>
						);
					})}
				</ul>

				<div className={styles.subField}>
					<div className={styles.orderExecutionTime}>
						{<FormattedDate date={new Date(targetOrder.createdAt)} />}
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
