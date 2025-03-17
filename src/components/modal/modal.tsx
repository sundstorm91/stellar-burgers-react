import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import styles from './modal.module.css';
import Overlay from './modal-overlay';
import { closeModal } from '../../services/features/modal-control/modal-slice';
import { IngredientDetails } from './ingredient-details';

export const Modal: React.FC = () => {
	const modalRoot = document.getElementById('modal-root');
	const dispatch = useAppDispatch();
	const { isOpen, ingredientId } = useAppSelector((state) => state.modal);
	const ingredients = useAppSelector(
		(state) => state.ingredients.ingredients.data
	);

	const selectedIngredient = ingredients.find(
		(ingredient) => ingredient._id === ingredientId
	);
	if (!isOpen || !modalRoot) return null;
	if (!selectedIngredient) return null;

	return ReactDOM.createPortal(
		<>
			<Overlay onClick={() => dispatch(closeModal())} />
			<div className={styles.modal}>
				<div className={styles.modalContent}>
					<button
						className={styles.modalClose}
						onClick={() => dispatch(closeModal())}>
						&times;
					</button>
					<IngredientDetails product={selectedIngredient} />
				</div>
			</div>
		</>,
		modalRoot!
	);
};
