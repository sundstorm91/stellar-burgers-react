import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../hooks/hook';
import styles from './pages.module.css';

export const Feed: React.FC = () => {
	const { ingredients } = useAppSelector((state) => state.ingredients);
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
				<div className={styles.reportWrapper}></div>
			</div>
		</div>
	);
};

/* const MAX_ITEMS = 5;

	const visibleItems = ingredients.data.slice(0, MAX_ITEMS);

	const hiddenItems =
		ingredients.data.length > MAX_ITEMS
			? ingredients.data.length - MAX_ITEMS
			: 0; */
{
	/* <ul className={styles.testWrapper}>
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
			</ul> */
}
