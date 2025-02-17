import styles from './burger-builder.module.css';
import React from 'react';
import { BunComponent } from './burger-components/bun-component';
import { products } from '../data/data';
import { ListProductComponents } from './burger-components/list-product-components';
import { ButtonOrderComponent } from './button-order/button-order';

export const BurgerBuilder = () => {
	return (
		<>
			<section>
				<div className={styles.burgerBuilder}>
					<BunComponent products={products} type={'top'} />
					<ListProductComponents products={products} />
					<BunComponent products={products} type={'bottom'} />
				</div>
				<ButtonOrderComponent />
			</section>
		</>
	);
};
