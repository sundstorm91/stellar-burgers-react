import { CurrentIngredient } from '../../services/features/current-ingredient/current-ingredient-slice';
import styles from './burger-ingredients.module.css';
import React from 'react';

export const IngredientDetails: React.FC<CurrentIngredient> = ({
	currentIngredient,
}) => {
	return (
		<>
			<p className={styles.tableTitle}>Детали ингредиента</p>
			<img
				className={styles.imageProduct}
				src={currentIngredient?.image_large}
				alt='product-image'
			/>
			<p className={styles.nameProduct}>{currentIngredient?.name}</p>
			<table className={styles.descriptionWrapper}>
				<tbody className={styles.tab}>
					<tr>
						<td>Калории, ккал</td>
						<td className='text text_type_digits-small'>
							{currentIngredient?.calories}
						</td>
					</tr>

					<tr>
						<td>Белки, г</td>
						<td className='text text_type_digits-small'>
							{currentIngredient?.proteins}
						</td>
					</tr>
					<tr>
						<td>Жиры, г</td>
						<td className='text text_type_digits-small'>
							{currentIngredient?.fat}
						</td>
					</tr>

					<tr>
						<td>Углеводы, г</td>
						<td className='text text_type_digits-small'>
							{currentIngredient?.carbohydrates}
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};
