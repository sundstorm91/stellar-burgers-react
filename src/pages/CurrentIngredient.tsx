import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/hook';

export const CurrentIngredient: React.FC = () => {
	const { id } = useParams<'id'>();
	const { ingredients } = useAppSelector((state) => state.ingredients);
	function getIngredientById(id: string) {
		return ingredients.data.find((item) => item._id === id);
	}
	console.log(id)
	const ingredient = getIngredientById(id!);
	return (
		<div className='image-view'>
			<h2>{ingredient?.name}</h2>
			<div>{ingredient?._id}</div>
		</div>
	);
};
