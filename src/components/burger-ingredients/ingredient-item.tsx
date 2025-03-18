import { useAppDispatch } from '../../hooks/hook';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredients } from '../../types/data-types';
import { openModal } from '../../services/features/modal-control/modal-slice';
import { useDrag } from 'react-dnd';
import { addIngredient } from '../../services/features/constructor/constructor-slice';
export const IngredientItem: React.FC<{ ingredient: Ingredients }> = ({
	ingredient,
}) => {
	const dispatch = useAppDispatch();

	const handleIngredientClick = (id: string) => {
		dispatch(openModal(id));
	};

	const [, drag] = useDrag(() => ({
		type: ingredient.type,
		item: ingredient,
	}));

	return (
		<div key={ingredient._id} className={styles.ingredientItem} ref={drag}>
			<div
				aria-hidden='true'
				className={styles.ingredientItem}
				onClick={() => handleIngredientClick(ingredient._id!)}>
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
