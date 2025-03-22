import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order.module.css';

export const OrderDetails: React.FC<{
	orderNumber: number | null;
	isSuccess: boolean;
}> = ({ orderNumber }) => {
	return (
		<>
			<p className='text text_type_digits-large'>{orderNumber}</p>
			<p>идентификатор заказа</p>
			<div>
				<CheckMarkIcon type={'primary'} className={styles.done} />
			</div>
			<p className='text text_type_main-medium'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-medium text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	);
};
