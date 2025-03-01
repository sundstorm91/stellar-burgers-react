import styles from './modal.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderDetails = () => {
	return (
		<>
			<p className='text text_type_digits-large' id={styles.number}>
				034536
			</p>
			<p className={styles.identityOrder}>идентификатор заказа</p>
			<div>
				<CheckMarkIcon type={'primary'} className={styles.done} />
			</div>
			<p className='text text_type_main-medium'>Ваш заказ начали готовить</p>
			<p
				className='text text_type_main-medium text_color_inactive'
				id={styles.info}>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	);
};
