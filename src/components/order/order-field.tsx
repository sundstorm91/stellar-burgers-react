import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order.module.css';
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
import { RootState } from '@services/store/store';
import { getUserSelector } from '../../services/features/user/user-slice';
import { useNavigate } from 'react-router-dom';
import { clearConstructorState } from '../../services/features/constructor/constructor-slice';

export const OrderField: React.FC = () => {
	const navigate = useNavigate();
	const user = useAppSelector(getUserSelector);
	const { bun, ingredients } = useAppSelector(
		(state: RootState) => state.builder
	);
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const totalPrice = useAppSelector(selectTotalPrice);
	const orderIngredient = useAppSelector(selectOrderIngredients);
	const { error } = useAppSelector((state) => state.order);

	const handleCreateOrder = () => {
		if (!user) {
			localStorage.setItem(
				'burgerConstructor',
				JSON.stringify({ bun, ingredients })
			);
			navigate('/login', { replace: true });
		}

		dispatch(createOrder(orderIngredient));
		setIsOrderModalOpen(true);
	};

	const handleClose = () => {
		setIsOrderModalOpen(false);
		dispatch(clearOrder());
		dispatch(clearConstructorState());
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
				onClick={handleCreateOrder}
				data-testid={'create-order-button'}>
				{error ? 'заказ не выполнен' : 'Оформить заказ'}
			</Button>{' '}
			{isOrderModalOpen && (
				<Modal onClose={handleClose}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
