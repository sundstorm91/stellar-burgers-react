import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { ConstructorIngredient } from '../../services/features/constructor/constructor-slice';
import Overlay from './modal-overlay';
import { IngredientDetails } from './ingredient-details';

export const Modal: React.FC<{
	currentComponent?: ConstructorIngredient;
	onClose: () => void;
}> = ({ currentComponent, onClose }) => {
	const modalRoot = document.getElementById('modal-root');

	console.log(currentComponent, '!!');
	if (!currentComponent) return null;

	return ReactDOM.createPortal(
		<>
			<Overlay onClick={onClose} />
			<div className={styles.modal}>
				<div className={styles.modalContent}>
					<button className={styles.modalClose} onClick={onClose}>
						&times;
					</button>
					{currentComponent && (
						<IngredientDetails currentIngredient={currentComponent} />
					)}
				</div>
			</div>
		</>,
		modalRoot!
	);
};
