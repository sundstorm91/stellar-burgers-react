import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { useEffect } from 'react';
import { fetchIngredients } from '../services/features/ingredients/ingredientsSlice';
import styles from './pages.module.css';
import { IngredientDetails } from '../components/burger-ingredients/ingredient-details';
import { getIngredientById } from '../utils/helpers';

export const CurrentIngredient: React.FC = () => {
	const { id } = useParams<'id'>();
	const { ingredients, error, loading } = useAppSelector(
		(state) => state.ingredients
	);
	const dispatch = useAppDispatch();

	const ingredient = getIngredientById(id!, ingredients);

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
			<div className={styles.wrapperIngredient}>
				<IngredientDetails currentIngredient={ingredient!} isModal={false} />
			</div>
		);
	}
};
