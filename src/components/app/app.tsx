import { AppHeader } from '../app-header/app-header';
import { BurgerBuilder } from '../burger-constructor/burger-builder';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { UseFetch } from '../../utils/api/hooks/use-fetch';
import { IngredientsApi } from '../types/data-types';
import ingredientsUrl from '@utils/api/api-endpoints';

export const App = () => {
	const { ingredients, loading, error } =
		UseFetch<IngredientsApi>(ingredientsUrl);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (ingredients) {
		return (
			<>
				<AppHeader />
				<main className={styles.main}>
					<BurgerIngredients data={ingredients.data} />
					<BurgerBuilder data={ingredients.data} />
				</main>
			</>
		);
	}
};
