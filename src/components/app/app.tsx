import { AppHeader } from '../app-header/app-header';
import { BurgerBuilder } from '../burger-constructor/burger-builder';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import { AppDispatch } from '../..';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '../../services/features/ingredients/action';
import { ApiState } from '../../services/features/ingredients/reducer';
import { useEffect } from 'react';

export const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	interface RootState {
		api: ApiState;
	}

	const loading = useSelector((state: RootState) => state.api.loading);
	const error = useSelector((state: RootState) => state.api.error);
	const ingredients = useSelector((state: RootState) => state.api.ingredients);
	console.log(ingredients, loading, error);

	const showState = useSelector((state: RootState) => state.api);
	console.log(showState);

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
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
