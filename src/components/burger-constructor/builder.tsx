import {
	addIngredient,
	ConstructorIngredient,
} from '../../services/features/constructor/constructor-slice';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import styles from './builder.module.css';

import { BuilderItem } from './builder-item';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerBuilder: React.FC = () => {
	const { bun, ingredients } = useAppSelector((state) => state.builder);
	console.log(ingredients);
	const dispatch = useAppDispatch();

	const [, bunTopDrop] = useDrop(() => ({
		accept: 'bun',
		drop: (item: ConstructorIngredient) => {
			const constructorId = Math.random().toString(36).substring(2, 9);
			const ingredientWithId = { ...item, constructorId };
			dispatch(addIngredient(ingredientWithId));
		},
	}));

	const [, bunBottomDrop] = useDrop(() => ({
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
		<section className={styles.container}>
			<div ref={bunTopDrop}>
				{bun ? (
					<ConstructorElement
						type='top'
						text={bun.name}
						thumbnail={bun.image}
						price={bun.price}
						isLocked={true}
					/>
				) : (
					<div className={styles.emptyBunTop}>Выберите булки</div>
				)}
			</div>
			<div ref={fillingsDrop} className={styles.itemContainer}>
				{ingredients.map((ingredient) => (
					<BuilderItem ingredient={ingredient} key={ingredient.constructorId} />
				))}
				{ingredients.length === 0 && (
					<div className={styles.emptyMiddle}>Выберите начинку</div>
				)}
			</div>

			<div ref={bunBottomDrop}>
				{bun ? (
					<ConstructorElement
						text={bun.name}
						thumbnail={bun.image}
						price={bun.price}
						isLocked={true}
					/>
				) : (
					<div className={styles.emptyBunBottom}>Выберите булки</div>
				)}
			</div>
		</section>
	);
};
