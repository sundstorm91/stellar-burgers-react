import { Ingredients } from '../../types/data-types';
import styles from './burger-components.module.css';
import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

interface IListComponentsProps {
	products: Ingredients[];
}

export const ListProductComponents: React.FC<IListComponentsProps> = ({
	products,
}) => {
	return (
		<>
			<ul className={styles.menuList}>
				{products.map((product) => (
					<li key={product._id}>
						<ConstructorElement
							text={product.name!}
							price={product.price!}
							thumbnail={product.image!}
						/>
					</li>
				))}
			</ul>
		</>
	);
};
