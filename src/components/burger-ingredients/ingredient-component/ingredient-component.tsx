import { Iingredients } from '../../types/data-types';
import styles from './ingredient-components.module.css';
import React from 'react';
import {
	CurrencyIcon,
	/* Counter, */
} from '@ya.praktikum/react-developer-burger-ui-components';

type TypeItem = 'bun' | 'main' | 'sauce';

interface BunComponentProps {
	products: Iingredients[];
	type: TypeItem;
}

export const Component: React.FC<BunComponentProps> = ({ products, type }) => {
	return (
		<>
			<div className={styles.ingredientsField}>
				{products
					.filter((item) => item.type === type)
					.map((item) => (
						<div key={item._id}>
							<div className={styles.ingredientItem}>
								{/* <Counter count={1} size='default' /> */}
								<img src={item.image} alt='logo-ingredient' />
								<div className={styles.price}>
									<p className='text text_type_digits-default'>{item.price}</p>
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
