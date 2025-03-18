import { useAppDispatch } from '../../hooks/hook';
import {
	ConstructorIngredient,
	removeIngredient,
} from '../../services/features/constructor/constructor-slice';
export const BuilderItem: React.FC<{ ingredient: ConstructorIngredient }> = ({
	ingredient,
}) => {
	const dispatch = useAppDispatch();

	return (
		<div key={ingredient.constructorId}>
			<img
				src={ingredient.image}
				alt={ingredient.name}
				style={{ width: '50px', height: '50px' }}
			/>
			<div>{ingredient.name}</div>
			<div>${ingredient.price}</div>
			<button
				onClick={() => dispatch(removeIngredient(ingredient.constructorId!))}>
				Remove
			</button>
		</div>
	);
};
