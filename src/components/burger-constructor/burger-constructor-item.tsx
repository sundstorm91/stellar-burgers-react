import { useDrag, useDrop } from 'react-dnd';
import styles from './builder.module.css';
import { useAppDispatch } from '../../hooks/hook';
import {
	ConstructorIngredient,
	removeIngredient,
	reorderIngredient,
} from '../../services/features/constructor/constructor-slice';
import { useRef } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructorItem: React.FC<{
	ingredient: ConstructorIngredient;
}> = ({ ingredient }) => {
	const dispatch = useAppDispatch();
	const { constructorId, name, image, price } = ingredient;
	const ref = useRef<HTMLLIElement | null>(null);

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

	const [{ isDragging }, drag] = useDrag({
		type: 'sortable',
		item: { id: constructorId },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	return (
		<li
			key={constructorId}
			ref={ref}
			style={{ opacity }}
			className={styles.item}
			data-testid={'constructor-item'}>
			<ConstructorElement
				text={name}
				thumbnail={image}
				price={price}
				handleClose={() => dispatch(removeIngredient(constructorId!))}
			/>
		</li>
	);
};
