import {
	addIngredient,
	ConstructorIngredient,
} from '../../services/features/constructor/constructor-slice';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import styles from './builder.module.css';

import { BuilderItem } from './builder-item';

export const BurgerBuilder: React.FC = () => {
	const { bun, ingredients } = useAppSelector((state) => state.builder);
	console.log(ingredients);
	const dispatch = useAppDispatch();

	const [, bunDrop] = useDrop(() => ({
		accept: 'bun',
		drop: (item: ConstructorIngredient) => {
			const constructorId = Math.random().toString(36).substring(2, 9);
			const ingredientWithId = { ...item, constructorId };
			dispatch(addIngredient(ingredientWithId));
		},
	}));

	const [, fillingsDrop] = useDrop(() => ({
		accept: ['sauce', 'main'],
		drop: (item: ConstructorIngredient) => {
			const constructorId = Math.random().toString(36).substring(2, 9);
			const ingredientWithId = { ...item, constructorId };
			dispatch(addIngredient(ingredientWithId));
		},
	}));

	return (
		<div>
			<h2>Burger Constructor</h2>
			<div ref={bunDrop}>
				{bun ? (
					<div>
						<img
							src={bun.image}
							alt={bun.name}
							style={{ width: '50px', height: '50px' }}
						/>
						<div>{bun.name}</div>
						<div>${bun.price}</div>
					</div>
				) : (
					'Drag a bun here'
				)}
			</div>
			<div ref={fillingsDrop}>
				{ingredients.map((ingredient) => (
					<BuilderItem ingredient={ingredient} key={ingredient.constructorId} />
				))}
				{ingredients.length === 0 && 'Drag fillings here'}
			</div>
		</div>
	);
};
