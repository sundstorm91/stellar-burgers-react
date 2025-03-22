import { CurrentIngredient } from '../../services/features/current-ingredient/current-ingredient-slice';
import styles from './modal.module.css';
import React from 'react';

export const IngredientDetails: React.FC<CurrentIngredient> = ({
	currentIngredient,
}) => {
	return (
		<>
			<p className={styles.title}>Детали ингредиента</p>
			<img
				className={styles.imageProduct}
				src={currentIngredient?.image_large}
				alt='product-image'
			/>
			<p className={styles.nameProduct}>{currentIngredient?.name}</p>
			<div className={styles.descriptionWrapper}>
				<tbody className={styles.tab}>
					<th>
						Калории, ккал
						<tr className='text text_type_digits-small'>
							{currentIngredient?.calories}
						</tr>
					</th>

					<th>
						Белки, г
						<tr className='text text_type_digits-small'>
							{currentIngredient?.proteins}
						</tr>
					</th>
					<th>
						Жиры, г
						<tr className='text text_type_digits-small'>
							{currentIngredient?.fat}
						</tr>
					</th>

					<th>
						Углеводы, г
						<tr className='text text_type_digits-small'>
							{currentIngredient?.carbohydrates}
						</tr>
					</th>
				</tbody>
			</div>
		</>
	);
};
