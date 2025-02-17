import styles from './button-order.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { ModalOrder } from '../../modal-order/modal';
import { ModalContentOrder } from '../../modal-order/modal-content-order';

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
				<ModalOrder isOpen={isModalOpen} onClose={closedModal}>
					<ModalContentOrder />
				</ModalOrder>
			</div>
		</>
	);
};
