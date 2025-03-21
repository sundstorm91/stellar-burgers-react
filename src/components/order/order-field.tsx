import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectOrderIngredients,
	selectTotalPrice,
} from '../../services/features/create-order/selectors';
import { createOrder } from '../../services/features/create-order/order-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';

export const OrderField: React.FC = () => {
	const dispatch = useAppDispatch();
	const totalPrice = useSelector(selectTotalPrice);
	const orderIngredient = useSelector(selectOrderIngredients);
	const { loading, error, orderNumber } = useAppSelector(
		(state) => state.order
	);
	const handleCreateOrder = () => {
		dispatch(createOrder(orderIngredient));
	};

	return (
		<div className={styles.orderField}>
			<div className={styles.priceField}>
				<p className='text text_type_digits-medium'>{totalPrice}</p>
				<div>
					<CurrencyIcon type={'primary'} className={styles.iconWrapper} />
				</div>
			</div>
			<Button
				htmlType='button'
				type='primary'
				size='large'
				onClick={handleCreateOrder}>
				{/* Оформить заказ */} {loading ? 'creating order..' : 'create order'}
			</Button>
			{orderNumber && (
				<div>
					<h3>Order Created Successfully!</h3>
					<p>Order Number: {orderNumber}</p>
				</div>
			)}
			{error && (
				<div>
					<h3>Error Creating Order</h3>
					<p>{error}</p>
				</div>
			)}
		</div>
	);
};
