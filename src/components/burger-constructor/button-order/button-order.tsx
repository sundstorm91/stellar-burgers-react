import styles from './button-order.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { ModalOverlay } from '../../modal/modal-overlay';
import { OrderDetails } from '../../modal/order-details';

export const ButtonOrderComponent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closedModal = () => setIsModalOpen(false);

	return (
		<>
			<div className={styles.orderField}>
				<div className={styles.priceField}>
					<p className='text text_type_digits-medium'>610</p>
					<div>
						<CurrencyIcon type={'primary'} className={styles.iconWrapper} />
					</div>
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={openModal}>
					Оформить заказ
				</Button>
				<ModalOverlay isOpen={isModalOpen} onClose={closedModal}>
					<OrderDetails />
				</ModalOverlay>
			</div>
		</>
	);
};
