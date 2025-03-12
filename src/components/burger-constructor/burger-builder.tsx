import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../index';
import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	REORDER_INGREDIENTS,
} from '../../services/features/constructor/action';
import { Ingredients } from '../types/data-types';
import styles from './burger-builder.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerBuilder: React.FC = () => {
	const dispatch = useDispatch();
	const { bunTop, ingredients, bunBottom } = useSelector(
		(state: RootState) => state.burgerConstructor
	);

	const [, bunTopDrop] = useDrop(() => ({
		accept: 'bun',
		drop: (item: {
			id: string;
			type: string;
			name: string;
			image: string;
			price: number;
		}) => {
			dispatch({ type: ADD_INGREDIENT, payload: item });
		},
	}));

	const [, ingredientsDrop] = useDrop(() => ({
		accept: ['sauce', 'main'],
		drop: (item: {
			id: string;
			type: string;
			name: string;
			image: string;
			price: number;
		}) => {
			dispatch({ type: ADD_INGREDIENT, payload: item });
		},
	}));

	const [, bunBottomDrop] = useDrop(() => ({
		accept: 'bun',
		drop: (item: {
			id: string;
			type: string;
			name: string;
			image: string;
			price: number;
		}) => {
			dispatch({ type: ADD_INGREDIENT, payload: item });
		},
	}));

	const moveIngredient = (startIndex: number, endIndex: number) => {
		dispatch({ type: REORDER_INGREDIENTS, payload: { startIndex, endIndex } });
	};

	return (
		<section>
			<div ref={bunTopDrop}>
				{bunTop ? (
					<ConstructorElement
						type='top'
						text={bunTop.name}
						thumbnail={bunTop.image}
						price={bunTop.price}
						isLocked={true}
					/>
				) : (
					<div className={styles.emptyBunTop}>Выберите булки</div>
				)}
			</div>

			<div ref={ingredientsDrop}>
				{ingredients.map((ingredient, index) => (
					<DraggableFilling
						key={ingredient._id}
						ingredients={ingredient}
						index={index}
						moveIngredient={moveIngredient}
						onRemove={() =>
							dispatch({
								type: REMOVE_INGREDIENT,
								payload: { id: ingredient._id },
							})
						}
					/>
				))}
				{ingredients.length === 0 && (
					<div className={styles.emptyMiddle}>Выберите начинку</div>
				)}
			</div>
			<div ref={bunBottomDrop}>
				{bunBottom ? (
					<ConstructorElement
						text={bunBottom.name}
						thumbnail={bunBottom.image}
						price={bunBottom.price}
						isLocked={true}
					/>
				) : (
					<div className={styles.emptyBunBottom}>Выберите булки</div>
				)}
			</div>
		</section>
	);
};

const DraggableFilling: React.FC<{
	ingredients: Ingredients;
	index: number;
	moveIngredient: (startIndex: number, endIndex: number) => void;
	onRemove: () => void;
}> = ({ ingredients, index, moveIngredient, onRemove }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ingredients.type,
		item: {
			id: ingredients._id,
			index,
			type: ingredients.type,
			price: ingredients.price,
			image: ingredients.image,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const [, drop] = useDrop(() => ({
		accept: ['sauce', 'main'],
		hover: (item: { _id: string; index: number }) => {
			if (item.index !== index) {
				moveIngredient(item.index, index);
				item.index = index;
			}
		},
		drop: (item) => {
			console.log(item);
		},
	}));
	const opacity = isDragging ? 0 : 1;
	return (
		<div ref={(node) => drag(drop(node))} style={{ opacity }}>
			<ConstructorElement
				text={ingredients.name}
				thumbnail={ingredients.image}
				price={ingredients.price}
				handleClose={onRemove}
			/>
		</div>
	);
};

export default BurgerBuilder;
