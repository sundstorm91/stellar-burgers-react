import { Iingredients } from '../../types/data-types';
import './burger-components.module.css';
import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

interface IListComponentsProps {
	products: Iingredients[];
}

export const ListProductComponents: React.FC<IListComponentsProps> = ({
	products,
}) => {
	return (
		<>
			<ul>
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
