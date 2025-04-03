import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import Overlay from './modal-overlay';
import { useEffect } from 'react';

export const Modal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
	const modalRoot = document.getElementById('modal-root');
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
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
