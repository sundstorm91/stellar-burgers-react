import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order.module.css';
import { useSelector } from 'react-redux';
import {
	selectOrderIngredients,
	selectTotalPrice,
} from '../../services/features/create-order/selectors';
import {
	clearOrder,
	createOrder,
} from '../../services/features/create-order/order-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { useState } from 'react';
import { OrderDetails } from './order-details';
import { Modal } from '../modal/modal';

export const OrderField: React.FC = () => {
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const totalPrice = useSelector(selectTotalPrice);
	const orderIngredient = useSelector(selectOrderIngredients);
	const { error, orderNumber } = useAppSelector((state) => state.order);
	const handleCreateOrder = () => {
		dispatch(createOrder(orderIngredient));
		setIsOrderModalOpen(true);
	};

	const handleCloseOrderModal = () => {
		setIsOrderModalOpen(false);
		dispatch(clearOrder());
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
				{error ? 'заказ не выполнен' : 'Оформить заказ'}
			</Button>

			{/* {orderNumber && (
				<Modal isOpen={isOrderModalOpen} onClose={handleCloseOrderModal}>
					<OrderDetails orderNumber={orderNumber} isSuccess={!error} />
				</Modal>
			)} */}
		</div>
	);
};
