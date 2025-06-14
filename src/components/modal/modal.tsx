import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styles from './modal.module.css';
import Overlay from './modal-overlay';
import { useCallback, useEffect } from 'react';

export const Modal: React.FC<{
	children: React.ReactElement;
	onClose?: () => void;
}> = ({ children, onClose }) => {
	const navigate = useNavigate();

	const handleClose = useCallback(() => {
		if (onClose) {
			onClose();
		} else {
			navigate(-1);
		}
	}, [onClose, navigate]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [handleClose]);

	return createPortal(
		<>
			<Overlay onClick={handleClose} />
			<div className={styles.modal}>
				<div className={styles.modalContent}>
					<button
						className={styles.modalClose}
						onClick={handleClose}
						data-testid={'modal-close-button'}>
						&times;
					</button>
					{children}
				</div>
			</div>
		</>,
		document.getElementById('modal-root') as HTMLElement
	);
};
