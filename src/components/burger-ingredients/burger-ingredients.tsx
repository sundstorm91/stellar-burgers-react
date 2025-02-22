import styles from './burger-ingredients.module.css';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Component } from './ingredient-component/ingredient-component';
import { IngredientsApi } from '../types/data-types';

export const BurgerIngredients: React.FC<IngredientsApi> = ({ data }) => {
	const [current, setCurrent] = useState('Булки');
	return (
		<>
			<section>
				<div className={styles.burgerIngredients}>
					<h2 className={styles.title}>Соберите бургер</h2>

					<div style={{ display: 'flex' }}>
						<Tab
							value='Булки'
							active={current === 'Булки'}
							onClick={setCurrent}>
							Булки
						</Tab>
						<Tab
							value='Соусы'
							active={current === 'Соусы'}
							onClick={setCurrent}>
							Соусы
						</Tab>
						<Tab
							value='Начинки'
							active={current === 'Начинки'}
							onClick={setCurrent}>
							Начинки
						</Tab>
					</div>
					<div className={styles.wrapper}>
						<h3 className={styles.headline}>Булки</h3>
						<Component products={data} type={'bun'} />
						<h3 className={styles.headline}>Соусы</h3>
						<Component products={data} type={'sauce'} />
						<h3 className={styles.headline}>Начинки</h3>
						<Component products={data} type={'main'} />
					</div>
				</div>
			</section>
		</>
	);
};
