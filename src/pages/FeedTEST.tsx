import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import styles from './pages.module.css';
import { useEffect } from 'react';
import {
	wsConnect,
	wsDisconnect,
} from '../services/features/websocket/actions';
import { ingredientsApiConfig } from '../utils/api-utils';

export const FeedTest: React.FC = () => {
	const dispatch = useAppDispatch();
	const { ingredients } = useAppSelector((state) => state.ingredients);
	/* const { data, connected, error, connecting } = useAppSelector(
		(state) => state.websocket.public
	); */

	useEffect(() => {
		dispatch(
			wsConnect({
				url: ingredientsApiConfig.orderAllUrl,
				feedType: 'public',
			})
		);
		return () => {
			dispatch(wsDisconnect('public'));
		};
	}, [dispatch]);

	const MAX_ITEMS = 5;

	const visibleItems = ingredients.data.slice(0, MAX_ITEMS);

	const hiddenItems =
		ingredients.data.length > MAX_ITEMS
			? ingredients.data.length - MAX_ITEMS
			: 0;

	return (
		<div className={styles.feedContainer}>
			<h2 className={styles.feedTitle}>Лента заказов</h2>
			<div className={styles.feed}>
				<div className={styles.feedWrapper}>
					<div className={styles.orderContainer}>
						<div className={styles.orderTitle}>
							<div className='text text_type_digits-default'>#034535</div>
							<div className={styles.orderExecutionTime}>Сегодня, 16:20</div>
						</div>
						<div className={styles.orderDescription}>
							Death Star Starship Main бургер
						</div>

						<div className={styles.fieldIngredients}>
							<div className={styles.ingredientIcons}>
								<ul className={styles.testWrapper}>
									{visibleItems.map((item, idx) => (
										<li
											key={item._id}
											className={styles.testItem}
											style={{ zIndex: MAX_ITEMS - idx }}>
											<img src={item.image_mobile} alt={item.name} />

											{idx === MAX_ITEMS - 1 && hiddenItems > 0 && (
												<div className={styles.counter}>+{hiddenItems}</div>
											)}
										</li>
									))}
								</ul>
							</div>
							<div className={styles.ingredientPrice}>
								<div className='text text_type_digits-default'>480</div>
								<CurrencyIcon type={'primary'} />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.reportWrapper}>
					<div className={styles.statusField}>
						<div className={styles.statusReady}>
							<p className={styles.subTitle}>Готовы:</p>
							<span className='text text_type_digits-default'>422612</span>
							<span className='text text_type_digits-default'>355612</span>
							<span className='text text_type_digits-default'>216612</span>
							<span className='text text_type_digits-default'>003612</span>
						</div>

						<div className={styles.statusProccess}>
							<p className={styles.subTitle}>В работе:</p>
							<span className='text text_type_digits-default'>422612</span>
							<span className='text text_type_digits-default'>355612</span>
							<span className='text text_type_digits-default'>216612</span>
							<span className='text text_type_digits-default'>003612</span>
						</div>
					</div>

					<div className={styles.completeAllTime}>
						<span className={styles.subTitle}>Выполнено за все время:</span>
						<span className='text text_type_digits-large'>28752</span>
					</div>

					<div className={styles.completeToday}>
						<span className={styles.subTitle}>Выполнено за сегодня:</span>
						<span className='text text_type_digits-large'>138</span>
					</div>
				</div>
			</div>
		</div>
	);
};
