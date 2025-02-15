import { Iingredients } from '../../types/data-types';
import styles from './ingredient.module.css';
import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface BunComponentProps {
	products: Iingredients[];
}
export const BunComponent: React.FC<BunComponentProps> = ({ products }) => {
	return (
		<>
			<div className={styles.ingredientsField}>
				{products
					.filter((item) => item.type === 'bun')
					.map((item) => (
						<div key={item._id}>
							<div className={styles.ingredientItem}>
								<img src={item.image} alt='logo-ingredient' />
								<div className={styles.price}>
									<p className='text text_type_digits-default'>20</p>
									<CurrencyIcon type={'primary'} />
								</div>
								<p className={styles.description}>{item.name}</p>
							</div>
						</div>
					))}
			</div>
		</>
	);
};
