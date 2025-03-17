import { Ingredients } from '../../types/data-types';
import styles from './modal.module.css';
import React from 'react';

interface CurrentComponentProps {
	product: Ingredients;
}

export const IngredientDetails: React.FC<CurrentComponentProps> = ({
	product,
}) => {
	return (
		<>
			<p className={styles.title}>Детали ингредиента</p>
			<img
				className={styles.imageProduct}
				src={product.image_large}
				alt='product-image'
			/>
			<p className={styles.nameProduct}>{product.name}</p>
			<div className={styles.descriptionWrapper}>
				<tbody className={styles.tab}>
					<th>
						Калории, ккал
						<tr className='text text_type_digits-small'>{product.calories}</tr>
					</th>

					<th>
						Белки, г
						<tr className='text text_type_digits-small'>{product.proteins}</tr>
					</th>
					<th>
						Жиры, г
						<tr className='text text_type_digits-small'>{product.fat}</tr>
					</th>

					<th>
						Углеводы, г
						<tr className='text text_type_digits-small'>
							{product.carbohydrates}
						</tr>
					</th>
				</tbody>
			</div>
		</>
	);
};
