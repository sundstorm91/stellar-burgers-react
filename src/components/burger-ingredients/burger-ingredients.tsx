import styles from './burger-ingredients.module.css';
import { FC, useEffect, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Component } from './ingredient-component/ingredient-component';
import {
	IngredientComponentProps,
	IngredientsApi,
	TypeComponent,
} from '../types/data-types';

interface componentsField {
	component: FC<IngredientComponentProps>;
	type: TypeComponent;
	title: 'Булки' | 'Соусы' | 'Начинки';
}

export const BurgerIngredients: React.FC<IngredientsApi> = ({ data }) => {
	const [activeButton, setActiveButton] = useState<number | null>(null);
	const componentRefs = useRef<HTMLDivElement[]>([]);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const fillComponents: componentsField[] = [
		{
			component: Component,
			type: 'bun',
			title: 'Булки',
		},
		{
			component: Component,
			type: 'sauce',
			title: 'Соусы',
		},
		{
			component: Component,
			type: 'main',
			title: 'Начинки',
		},
	];

	const buttonComponentsArray = ['Булки', 'Соусы', 'Начинки'];

	useEffect(() => {
		const handleScroll = () => {
			const wrapper = wrapperRef.current;
			if (!wrapper) return;

			const scrollPosition = wrapper.scrollTop + wrapper.clientHeight / 2;

			const activeComponentIndex = componentRefs.current.findIndex(
				(component) => {
					const childTop = component.offsetTop;
					const childBottom = childTop + component.offsetHeight;
					return scrollPosition >= childTop && scrollPosition < childBottom;
				}
			);

			// Update the active button
			if (activeComponentIndex !== -1) {
				setActiveButton(activeComponentIndex);
			}
		};

		const wrapper = wrapperRef.current;
		if (wrapper) {
			wrapper.addEventListener('scroll', handleScroll);
		}

		// Clean up the event listener on unmount
		return () => {
			if (wrapper) {
				wrapper.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);

	return (
		<>
			<section>
				<div className={styles.burgerIngredients}>
					<h2 className={styles.title}>Соберите бургер</h2>

					<div className={styles.switchWrapper}>
						{buttonComponentsArray.map((tab, index) => (
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

					<div className={styles.wrapper} ref={wrapperRef}>
						{fillComponents.map((component, index) => (
							<div
								key={index}
								ref={(el) => {
									if (el) componentRefs.current[index] = el;
								}}>
								<h3 className={styles.headline}>{component.title}</h3>
								<Component products={data} type={component.type} />
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};
