import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../hooks/hook';
import {
	ConstructorIngredient,
	removeIngredient,
	reorderIngredient,
} from '../../services/features/constructor/constructor-slice';
import { useRef } from 'react';
export const BuilderItem: React.FC<{ ingredient: ConstructorIngredient }> = ({
	ingredient,
}) => {
	const dispatch = useAppDispatch();
	const { constructorId, name, image } = ingredient;
	const ref = useRef<HTMLDivElement | null>(null);

	const moveIngredient = (draggedId: string, targetId: string) => {
		dispatch(reorderIngredient({ draggedId, targetId }));
	};

	const [, drop] = useDrop({
		accept: 'sortable',
		hover: (item: { id: string }) => {
			if (item.id !== ingredient.constructorId) {
				moveIngredient(item.id, constructorId!);
			}
		},
	});

	// Drag source for the ingredient
	const [{ isDragging }, drag] = useDrag({
		type: 'sortable',
		item: { id: constructorId }, // Use constructorId instead of index
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	return (
		<div key={constructorId} ref={ref} style={{ opacity }}>
			<img
				src={image}
				alt={name}
				style={{ width: '250px', height: '100px', backgroundColor: 'white' }}
			/>
			<div>{ingredient.name}</div>
			<div>${ingredient.price}</div>
			<button onClick={() => dispatch(removeIngredient(constructorId!))}>
				Remove
			</button>
		</div>
	);
};
