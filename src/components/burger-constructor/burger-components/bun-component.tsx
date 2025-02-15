import { Iingredients } from '../../types/data-types';
import './burger-components.module.css';
import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
type TypeBun = 'top' | 'bottom';

interface BunComponentProps {
	products: Iingredients[];
	type: TypeBun;
}

export const BunComponent: React.FC<BunComponentProps> = ({
	products,
	type,
}) => {
	return (
		<>
			<div>
				{products
					.filter((product) => product.name === 'Краторная булка N-200i')
					.map((product) => (
						<div key={product._id}>
							<ConstructorElement
								type={type}
								isLocked={true}
								text={
									type === 'bottom'
										? 'Краторная булка N-200i (низ)'
										: 'Краторная булка N-200i (верх)'
								}
								price={200}
								thumbnail={product.image!}
							/>
						</div>
					))}
			</div>
		</>
	);
};
