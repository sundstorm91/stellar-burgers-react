import styles from './burger-ingredients.module.css';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { ConstructorIngredient } from '../../services/features/constructor/constructor-slice';

export const IngredientItem: React.FC<{
	ingredient: ConstructorIngredient;
	count: number;
	onClick: (ingredient: ConstructorIngredient) => void;
}> = ({ ingredient, count, onClick }) => {
	const [, drag] = useDrag(() => ({
		type: ingredient.type,
		item: ingredient,
	}));

	return (
		<div
			key={ingredient._id}
			className={styles.ingredientItem}
			data-testid={'ingredient-item'}
			ref={drag}
			onClick={() => onClick(ingredient)}
			aria-hidden='true'>
			<div aria-hidden='true' className={styles.ingredientItem}>
				{count > 0 && <Counter count={count} />}
				<img src={ingredient.image} alt={ingredient.name} />
				<div className={styles.price}>
					<p className='text text_type_digits-default'>{ingredient.price}</p>
					<CurrencyIcon type={'primary'} />
				</div>
				<p className={styles.description}>{ingredient.name}</p>
			</div>
		</div>
	);
};
