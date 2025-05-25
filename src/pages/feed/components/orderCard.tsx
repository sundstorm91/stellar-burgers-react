import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../pages.module.css';
import { ProcessedOrder } from '../../../services/features/websocket/types';

export const OrderCard: React.FC<{
	order: ProcessedOrder;
	maxItems: number;
}> = ({ order, maxItems }) => {
	const visibleItems = order.ingredientsData.slice(0, maxItems);
	const hiddenItems = Math.max(order.ingredientsData.length - maxItems, 0);
	return (
		<div className={styles.orderContainer}>
			<div className={styles.orderTitle}>
				<div className='text text_type_digits-default'>#{order.number}</div>
				<div className={styles.orderExecutionTime}>
					{<FormattedDate date={new Date(order.createdAt)} />}
				</div>
			</div>

			<div className={styles.orderDescription}>{order.name}</div>

			<div className={styles.fieldIngredients}>
				<div className={styles.ingredientIcons}>
					<ul className={styles.testWrapper}>
						{visibleItems.map((item, idx) => (
							<li
								key={item?._id}
								className={styles.testItem}
								style={{ zIndex: maxItems - idx }}>
								<img src={item?.image_mobile} alt={item?.name} />

								{idx === maxItems - 1 && hiddenItems > 0 && (
									<div className={styles.counter}>+{hiddenItems}</div>
								)}
							</li>
						))}
					</ul>
				</div>
				<div className={styles.ingredientPrice}>
					<div className='text text_type_digits-default'>
						{order.totalPrice}
					</div>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
