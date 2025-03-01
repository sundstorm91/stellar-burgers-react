import styles from './burger-builder.module.css';
import React from 'react';
import { BunComponent } from './burger-components/bun-component';
import { ListProductComponents } from './burger-components/list-product-components';
import { ButtonOrderComponent } from './button-order/button-order';
import { IngredientsApi } from '../types/data-types';

export const BurgerBuilder: React.FC<IngredientsApi> = ({ data }) => {
	return (
		<>
			<section>
				<div className={styles.burgerBuilder}>
					<BunComponent
						products={data}
						type={'bun'}
						position={{ property: 'top', value: 'верх' }}
					/>
					<ListProductComponents products={data} exceptionProperty='bun' />
					<BunComponent
						products={data}
						type={'bun'}
						position={{ property: 'bottom', value: 'низ' }}
					/>
				</div>
				<ButtonOrderComponent />
			</section>
		</>
	);
};
