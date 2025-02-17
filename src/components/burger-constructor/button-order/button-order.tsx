import styles from './button-order.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const ButtonOrderComponent = () => {
	return (
		<>
			<div className={styles.orderField}>
				<div className={styles.priceField}>
					<p className='text text_type_digits-medium'>610</p>
					<div>
						<CurrencyIcon type={'primary'} className={styles.iconWrapper} />
					</div>
				</div>
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</>
	);
};
