import styles from './burger-builder.module.css';
import React from 'react';
import { BunComponent } from './burger-components/bun-component';
import { ListProductComponents } from './burger-components/list-product-components';
import { ButtonOrderComponent } from './button-order/button-order';
import { IncomingDataApi } from '../types/data-types';

export const BurgerBuilder: React.FC<IncomingDataApi> = ({ data }) => {
	return (
		<>
			<section>
				<div className={styles.burgerBuilder}>
					<BunComponent products={data} type={'top'} />
					<ListProductComponents products={data} />
					<BunComponent products={data} type={'bottom'} />
				</div>
				<ButtonOrderComponent />
			</section>
		</>
	);
};
