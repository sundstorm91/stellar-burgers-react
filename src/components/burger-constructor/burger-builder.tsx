import styles from './burger-builder.module.css';
import React from 'react';
import { BunComponent } from './burger-components/bun-component';
import { products } from '../data/data';

export const BurgerBuilder = () => {
	return (
		<>
			<section>
				<div className={styles.burgerBuilder}>
					<BunComponent products={products} type={'top'} />
					<BunComponent products={products} type={'bottom'} />
				</div>
			</section>
		</>
	);
};
