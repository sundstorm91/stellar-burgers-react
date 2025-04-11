import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchIngredients } from '../../services/features/ingredients/ingredientsSlice';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientItem } from './ingredient-item';
import {
	clearCurrentIngredient,
	setCurrentIngredient,
} from '../../services/features/current-ingredient/current-ingredient-slice';
import { ConstructorIngredient } from '../../services/features/constructor/constructor-slice';
import { Modal } from '../modal/modal';
import { IngredientDetails } from './ingredient-details';
import { Link, useLocation } from 'react-router-dom';

export const BurgerIngredients: React.FC = () => {
	const [activeButton, setActiveButton] = useState<number | null>(null);
	const dispatch = useAppDispatch();
	const componentRefs = useRef<HTMLDivElement[]>([]);
	const currentIngredient = useAppSelector(
		(state) => state.currentIngredient.currentIngredient
	);

	const location = useLocation();

	const handleIngredientClick = (ingredient: ConstructorIngredient) => {
		dispatch(setCurrentIngredient(ingredient));
	};

	const handleCloseModal = () => {
		dispatch(clearCurrentIngredient());
	};

	const { bun, ingredients: fillings } = useAppSelector(
		(state) => state.builder
	);

	const typeComponents = [
		{
			type: 'bun',
			title: 'Булки',
		},

		{
			type: 'sauce',
			title: 'Соусы',
		},

		{
			type: 'main',
			title: 'Начинки',
		},
	];

	const { error, loading, ingredients } = useAppSelector(
		(state) => state.ingredients
	);

	const tabComponentsArray = ['Булки', 'Соусы', 'Начинки'];
	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const parent = event.currentTarget;

		const scrollPosition = parent.scrollTop + parent.clientHeight / 2;

		const activeComponentIndex = componentRefs.current.findIndex(
			(component) => {
				const childTop = component.offsetTop;
				const childBottom = childTop + component.offsetHeight;
				return scrollPosition >= childTop && scrollPosition < childBottom;
			}
		);

		if (activeComponentIndex !== -1) {
			setActiveButton(activeComponentIndex);
		}
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (ingredients) {
		return (
			<>
				<section>
					<div className={styles.burgerIngredients}>
						<h2 className={styles.title}>Соберите бургер</h2>

						<div className={styles.switchWrapper}>
							{tabComponentsArray.map((tab, index) => (
								<Tab
									key={index}
									value={tab}
									active={activeButton === index}
									onClick={() => {
										componentRefs.current[index]?.scrollIntoView({
											behavior: 'smooth',
										});
									}}>
									{tab}
								</Tab>
							))}
						</div>

						<div onScroll={handleScroll} className={styles.wrapper}>
							<>
								{typeComponents.map((component, idx) => {
									const filtredIngredients = ingredients.data.filter(
										(ingredient) => ingredient.type === component.type
									);
									if (filtredIngredients.length === 0) return null;
									return (
										<div key={idx}>
											<h2 className={styles.headline}>{component.title}</h2>
											<div
												key={component.type}
												className={styles.typeWrapper}
												ref={(el) => {
													if (el) componentRefs.current[idx] = el;
												}}>
												{filtredIngredients.map((ingredient) => {
													const count =
														bun && ingredient._id === bun._id
															? 2
															: fillings.filter(
																	(item) => item._id === ingredient._id
															  ).length;
													return (
														<Link
															to={`ingredients/${ingredient._id}`}
															key={ingredient._id}
															state={{ backgroundLocation: location }}>
															<IngredientItem
																ingredient={ingredient}
																key={ingredient._id}
																count={count}
																onClick={handleIngredientClick}
															/>
														</Link>
													);
												})}
											</div>
										</div>
									);
								})}
							</>
						</div>
					</div>
					<Modal isOpen={!!currentIngredient} onClose={handleCloseModal}>
						<IngredientDetails currentIngredient={currentIngredient!} />
					</Modal>
				</section>
			</>
		);
	}
};
