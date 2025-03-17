import { useDrag } from 'react-dnd';
import { useAppDispatch } from '../../hooks/hook';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredients } from '../../types/data-types';
import { openModal } from '../../services/features/modal-control/modal-slice';
export const IngredientItem: React.FC<{ ingredient: Ingredients }> = ({
	ingredient,
}) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ingredient.type,
		item: {
			id: ingredient._id,
			type: ingredient.type,
			name: ingredient.name,
			price: ingredient.price,
			image: ingredient.image,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));
	const dispatch = useAppDispatch();

	const handleIngredientClick = (ingredient: Ingredients) => {
		// Open the modal with the ingredient details
		dispatch(
			openModal(
				<>
					<p className={styles.title}>Детали ингредиента</p>
					<img
						className={styles.imageProduct}
						src={ingredient.image_large}
						alt='product-image'
					/>
					<p className={styles.nameProduct}>{ingredient.name}</p>
					<div className={styles.descriptionWrapper}>
						<tbody className={styles.tab}>
							<th>
								Калории, ккал
								<tr className='text text_type_digits-small'>
									{ingredient.calories}
								</tr>
							</th>

							<th>
								Белки, г
								<tr className='text text_type_digits-small'>
									{ingredient.proteins}
								</tr>
							</th>
							<th>
								Жиры, г
								<tr className='text text_type_digits-small'>
									{ingredient.fat}
								</tr>
							</th>

							<th>
								Углеводы, г
								<tr className='text text_type_digits-small'>
									{ingredient.carbohydrates}
								</tr>
							</th>
						</tbody>
					</div>
				</>
			)
		);
	};

	const opacity = isDragging ? 0 : 1;

	return (
		<div
			key={ingredient._id}
			className={styles.ingredientItem}
			ref={drag}
			style={{ opacity }}>
			<div
				aria-hidden='true'
				className={styles.ingredientItem}
				onClick={() => handleIngredientClick(ingredient)}>
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
