// src/components/BurgerConstructor.tsx
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

const BurgerBuilder: React.FC = () => {
	const dispatch = useDispatch();
	const { bunTop, ingredients, bunBottom } = useSelector(
		(state: RootState) => state.burgerConstructor
	);

	const [, bunTopDrop] = useDrop(() => ({
		accept: 'bun',
		drop: (item: { id: string; type: string; name: string }) => {
			dispatch({ type: ADD_INGREDIENT, payload: item });
		},
	}));

	const [, ingredientsDrop] = useDrop(() => ({
		accept: ['sauce', 'topping'],
		drop: (item: { id: string; type: string; name: string }) => {
			dispatch({ type: ADD_INGREDIENT, payload: item });
		},
	}));

	const [, bunBottomDrop] = useDrop(() => ({
		accept: 'bun',
		drop: (item: { id: string; type: string; name: string }) => {
			dispatch({ type: ADD_INGREDIENT, payload: item });
		},
	}));

	const moveIngredient = (startIndex: number, endIndex: number) => {
		dispatch({ type: REORDER_INGREDIENTS, payload: { startIndex, endIndex } });
	};

	return (
		<div>
			<h2>Burger Constructor</h2>
			<div
				ref={bunTopDrop}
				style={{
					padding: '16px',
					margin: '8px',
					border: '1px dashed #ccc',
					backgroundColor: bunTop ? '#e0f7fa' : '#fff',
				}}>
				{bunTop ? bunTop.name : 'Drag a bun here'}
			</div>
			<div
				ref={ingredientsDrop}
				style={{
					padding: '16px',
					margin: '8px',
					border: '1px dashed #ccc',
					backgroundColor: ingredients.length > 0 ? '#e0f7fa' : '#fff',
				}}>
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
				{ingredients.length === 0 && 'Drag fillings here'}
			</div>
			<div
				ref={bunBottomDrop}
				style={{
					padding: '16px',
					margin: '8px',
					border: '1px dashed #ccc',
					backgroundColor: bunBottom ? '#e0f7fa' : '#fff',
				}}>
				{bunBottom ? bunBottom.name : 'Drag a bun here'}
			</div>
		</div>
	);
};

const DraggableFilling: React.FC<{
	ingredients: Ingredients;
	index: number;
	moveIngredient: (startIndex: number, endIndex: number) => void;
	onRemove: () => void;
}> = ({ ingredients, index, moveIngredient, onRemove }) => {
	const [, drag] = useDrag(() => ({
		type: ingredients.type,
		item: { id: ingredients._id, index },
	}));

	const [, drop] = useDrop(() => ({
		accept: ['sauce', 'topping'],
		hover: (item: { id: string; index: number }) => {
			if (item.index !== index) {
				moveIngredient(item.index, index);
				item.index = index;
			}
		},
	}));

	return (
		<div
			ref={(node) => drag(drop(node))}
			style={{
				padding: '8px',
				margin: '8px',
				border: '1px solid #ccc',
				backgroundColor: '#f9f9f9',
				cursor: 'move',
			}}>
			{ingredients.name}
			<button onClick={onRemove} style={{ marginLeft: '8px' }}>
				Remove
			</button>
		</div>
	);
};

export default BurgerBuilder;
