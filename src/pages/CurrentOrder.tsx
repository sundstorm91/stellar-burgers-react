import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export const CurrentOrder: React.FC = () => {
	return (
		<div className={styles.currentOrderContainer}>
			<span className='text text_type_digits-default'>0345333</span>
			<p className={styles.currentNameOrder}>
				Black Hole Singularity острый бургер
			</p>
			<p className={styles.currentStatus}>Выполнен</p>

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
