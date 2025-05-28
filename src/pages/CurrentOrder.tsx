import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/hook';

export const CurrentOrder: React.FC = () => {
	const { id } = useParams<'id'>();
	const { data } = useAppSelector((state) => state.websocket.public);

	const order = data?.orders.find((o) => o._id === id);

	/* Если заказа нет в Redux, загружаем отдельно
		const { data: apiOrder, loading } = useGetOrderQuery(id!, {
		skip: !!order || !id,
  });
  	const currentOrder = order || apiOrder; */

	return (
		<div className={styles.currentOrderContainer}>
			<span className='text text_type_digits-default'>#{order?.number}</span>
			<p className={styles.currentNameOrder}>{order?.name}</p>
			<p className={styles.currentStatus}>
				{order?.status === 'done' ? 'Выполнен' : 'В работе'}
			</p>

			<div>
				<h2>Состав:</h2>
				<div>{/* Здесь ингредиенты! */}</div>
				<div className={styles.subField}>
					<div className={styles.orderExecutionTime}>Вчера, 13:50</div>
					<div className={styles.ingredientPrice}>
						<div className='text text_type_digits-default'>480</div>
						<CurrencyIcon type={'primary'} />
					</div>
				</div>
			</div>
		</div>
	);
};
