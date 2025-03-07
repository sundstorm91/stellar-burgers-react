import styles from './burger-ingredients.module.css';
import { useEffect, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Component } from './ingredient-component/ingredient-component';
import { ApiState } from '@services/features/ingredients/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../..';
import { loadIngredients } from '../../services/features/ingredients/action';

export const BurgerIngredients: React.FC = () => {
	const [activeButton, setActiveButton] = useState<number | null>(null);
	const componentRefs = useRef<HTMLDivElement[]>([]);
	const dispatch = useDispatch<AppDispatch>();

	interface RootState {
		api: ApiState;
	}

	const loading = useSelector((state: RootState) => state.api.loading);
	const error = useSelector((state: RootState) => state.api.error);
	const ingredients = useSelector((state: RootState) => state.api.ingredients);
	const root = useSelector((state: RootState) => state.api);
	console.log(root);
	console.log(ingredients, loading, error);

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
		dispatch(loadIngredients());
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
							<Component />
						</div>
					</div>
				</section>
			</>
		);
	}
};
