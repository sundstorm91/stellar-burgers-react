import {
	addIngredient,
	removeIngredient,
} from '../../services/features/constructor/constructor-slice';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import styles from './builder.module.css';
import { Ingredients } from '../../types/data-types';

export const BurgerBuilder: React.FC = () => {
	const { bun, ingredients } = useAppSelector((state) => state.builder);
	const dispatch = useAppDispatch();

	const [, bunDrop] = useDrop(() => ({
		accept: 'bun',
		drop: (item: Ingredients) => {
			dispatch(addIngredient({ ...item }));
		},
	}));

	const [, fillingsDrop] = useDrop(() => ({
		accept: ['sauce', 'main'],
		drop: (item: Ingredients) => {
			dispatch(addIngredient({ ...item }));
			console.log(item);
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
				{ingredients.map((filling, index) => (
					<div key={filling.generateId}>
						<img
							src={filling.image}
							alt={filling.name}
							style={{ width: '50px', height: '50px' }}
						/>
						<div>{filling.name}</div>
						<div>${filling.price}</div>
						<button
							onClick={() => dispatch(removeIngredient(filling.generateId!))}>
							Remove
						</button>
					</div>
				))}
				{ingredients.length === 0 && 'Drag fillings here'}
			</div>
		</div>
	);
};
