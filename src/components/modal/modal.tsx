import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import styles from './modal.module.css';
import Overlay from './modal-overlay';
import { closeModal } from '../../services/features/modal-control/modal-slice';
/* import { useEffect } from 'react'; */

export const Modal: React.FC = () => {
	const modalRoot = document.getElementById('modal-root');
	const dispatch = useAppDispatch();
	const { isOpen, content } = useAppSelector((state) => state.modal);

	if (!isOpen || !modalRoot) return null;

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
					{content}
				</div>
			</div>
		</>,
		modalRoot!
	);
};
