import { AppHeader } from '../app-header/app-header';
import { BurgerBuilder } from '../burger-constructor/burger-builder';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { UseFetch } from '../hocs/use-fetch';
import { IncomingDataApi } from '../types/data-types';

export const App = () => {
	const { data, loading, error } = UseFetch<IncomingDataApi>(
		'https://norma.nomoreparties.space/api/ingredients'
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (data) {
		return (
			<>
				<AppHeader />
				<main className={styles.main}>
					<BurgerIngredients data={data.data} />
					<BurgerBuilder data={data.data} />
				</main>
			</>
		);
	}
};
