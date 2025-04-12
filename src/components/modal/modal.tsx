import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './modal.module.css';
import Overlay from './modal-overlay';
import { useAppSelector } from '../../hooks/hook';
import { IngredientDetails } from '../burger-ingredients/ingredient-details';
import { getIngredientById } from '../../utils/helpers';
export const Modal: React.FC = () => {
	const { ingredients } = useAppSelector((state) => state.ingredients);
	const navigate = useNavigate();
	const { id } = useParams<'id'>();

	const ingredient = getIngredientById(id!, ingredients);

	const onClose = () => {
		navigate(-1);
	};

	if (!ingredient) return null;

	return createPortal(
		<>
			<Overlay onClick={onClose} />
			<div className={styles.modal}>
				<div className={styles.modalContent}>
					<button className={styles.modalClose} onClick={onClose}>
						&times;
					</button>
					<IngredientDetails currentIngredient={ingredient} isModal={true} />
				</div>
			</div>
		</>,
		document.getElementById('modal-root') as HTMLElement
	);
};
