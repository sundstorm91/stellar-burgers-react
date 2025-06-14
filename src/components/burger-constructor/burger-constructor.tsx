import {
	addIngredient,
	ConstructorIngredient,
} from '../../services/features/constructor/constructor-slice';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import styles from './builder.module.css';

import { BurgerConstructorItem } from './burger-constructor-item';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderField } from '../order/order-field';

export const BurgerConstructor: React.FC = () => {
	const { bun, ingredients } = useAppSelector((state) => state.builder);
	const dispatch = useAppDispatch();

	const [{ canDropTopBun, isOverTopBun }, bunTopDrop] = useDrop(() => ({
		accept: 'bun',
		drop: (item: ConstructorIngredient) => {
			const constructorId = Math.random().toString(36).substring(2, 9);

			const ingredientWithId = { ...item, constructorId };
			dispatch(addIngredient(ingredientWithId));
		},
		collect: (monitor) => ({
			canDropTopBun: monitor.canDrop(),
			isOverTopBun: monitor.isOver(),
		}),
	}));

	const [{ canDropBottomBun, isOverBottomBun }, bunBottomDrop] = useDrop(
		() => ({
			accept: 'bun',
			drop: (item: ConstructorIngredient) => {
				const constructorId = Math.random().toString(36).substring(2, 9);
				const ingredientWithId = { ...item, constructorId };
				dispatch(addIngredient(ingredientWithId));
			},
			collect: (monitor) => ({
				canDropBottomBun: monitor.canDrop(),
				isOverBottomBun: monitor.isOver(),
			}),
		})
	);

	const [{ canDropFillings, isOverFillings }, fillingsDrop] = useDrop(() => ({
		accept: ['sauce', 'main'],
		drop: (item: ConstructorIngredient) => {
			const constructorId = Math.random().toString(36).substring(2, 9);
			const ingredientWithId = { ...item, constructorId };
			dispatch(addIngredient(ingredientWithId));
		},
		collect: (monitor) => ({
			canDropFillings: monitor.canDrop(),
			isOverFillings: monitor.isOver(),
		}),
	}));

	const borderColorBun =
		(canDropBottomBun || canDropTopBun) && (isOverBottomBun || isOverTopBun)
			? 'green'
			: 'transparent';
	const borderColorFilling =
		canDropFillings && isOverFillings ? 'green' : 'transparent';

	const borderStyleBun = `2px dotted ${borderColorBun}`;
	const borderStyleFilling = `2px dotted ${borderColorFilling}`;

	return (
		<section className={styles.burgerConstructorField}>
			<div className={styles.container} data-testid={'constructor-container'}>
				<div
					ref={bunTopDrop}
					className={styles.bunIndent}
					data-testid={'constructor-bun-top'}>
					{bun ? (
						<ConstructorElement
							type='top'
							text={`${bun.name}(верх)`}
							thumbnail={bun.image}
							price={bun.price}
							isLocked={true}
						/>
					) : (
						<div
							className={styles.emptyBunTop}
							style={{ border: borderStyleBun }}>
							Выберите булки
						</div>
					)}
				</div>
				<div ref={fillingsDrop} data-testid={'constructor-fillings'}>
					{ingredients.length === 0 ? (
						<div
							className={styles.emptyMiddle}
							style={{ border: borderStyleFilling }}>
							Выберите начинку
						</div>
					) : (
						<ul className={styles.itemWrapper}>
							{ingredients.map((ingredient) => (
								<BurgerConstructorItem
									ingredient={ingredient}
									key={ingredient.constructorId}
								/>
							))}
						</ul>
					)}
				</div>

				<div
					ref={bunBottomDrop}
					className={styles.bunIndent}
					data-testid={'constructor-bun-bottom'}>
					{bun ? (
						<ConstructorElement
							text={`${bun.name}(низ)`}
							thumbnail={bun.image}
							price={bun.price}
							isLocked={true}
							type='bottom'
						/>
					) : (
						<div
							className={styles.emptyBunBottom}
							style={{ border: borderStyleBun }}>
							Выберите булки
						</div>
					)}
				</div>
			</div>
			<div>
				<OrderField />
			</div>
		</section>
	);
};
