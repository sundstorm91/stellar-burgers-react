import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { useEffect } from 'react';
import { fetchIngredients } from '../services/features/ingredients/ingredientsSlice';
import { IngredientDetails } from '../components/burger-ingredients/ingredient-details';
import { getIngredientById } from '../utils/helpers';
import { Spinner } from '../components/spinner/spinner';

export const CurrentIngredient: React.FC<{ backgroundLocation: boolean }> = ({
	backgroundLocation = false,
}) => {
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
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (ingredients) {
		return (
			<IngredientDetails
				currentIngredient={ingredient!}
				isModal={backgroundLocation ? true : false}
			/>
		);
	}
};
