import { IngredientComponentProps, Ingredients } from '../../types/data-types';
import styles from './burger-components.module.css';
import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export const BunComponent: React.FC<IngredientComponentProps> = ({
	products,
	type,
	position,
}) => {
	const wrapperArr: Array<Ingredients> = [];
	const currentBun = products.find((item) => item.type === type);
	console.log(currentBun, '!!')
	wrapperArr.push(currentBun!);
	return (
		<>
			<div
				className={
					position?.property === 'top' ? styles.upperBun : styles.bottomBun
				}></div>
		</>
	);
};
