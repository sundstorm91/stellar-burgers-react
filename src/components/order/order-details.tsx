import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order.module.css';
import { useAppSelector } from '../../hooks/hook';
import { Spinner } from '../spinner/spinner';

export const OrderDetails: React.FC = () => {
	const { orderNumber, error, loading } = useAppSelector(
		(state) => state.order
	);

	if (loading) {
		return (
			<div className={styles.wrapperOrder}>
				<p className='text text_type_main-medium'>Оформляем ваш заказ...</p>
				<Spinner />
			</div>
		);
	}
	if (error) return <p>{error}</p>;
	return (
		<>
			<div className={styles.wrapperOrder}>
				<p className='text text_type_digits-large'>{orderNumber}</p>
				<p className={styles.idOrder}>идентификатор заказа</p>
				<div>
					<CheckMarkIcon type={'primary'} className={styles.done} />
				</div>
				<p className='text text_type_main-medium'>Ваш заказ начали готовить</p>
				<p className={styles.reportInfo}>
					Дождитесь готовности на орбитальной станции
				</p>
			</div>
		</>
	);
};
