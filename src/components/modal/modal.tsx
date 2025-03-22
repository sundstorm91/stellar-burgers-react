import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import Overlay from './modal-overlay';

export const Modal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
	const modalRoot = document.getElementById('modal-root');

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<>
			<Overlay onClick={onClose} />
			<div className={styles.modal}>
				<div className={styles.modalContent}>
					<button className={styles.modalClose} onClick={onClose}>
						&times;
					</button>
					{children}
				</div>
			</div>
		</>,
		modalRoot!
	);
};
