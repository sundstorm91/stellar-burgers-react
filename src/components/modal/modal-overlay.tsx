import React from 'react';
/* import Portal from './portal'; */
import styles from './modal.module.css';
/* import { ModalProps } from '../types/data-types'; */

interface OverlayProps {
	isOpen: boolean;
	onClose: () => void;
}
const ModalOverlay: React.FC<OverlayProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div
			className={styles.modalOverlay}
			onClick={onClose}
			aria-hidden='true'></div>
	);
};

export default ModalOverlay;
/* useEffect(() => {
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
	}, [isOpen, onClose]); */

/* <div className={styles.modalContent}>
				<button className={styles.modalClose} onClick={onClose}>
					&times;
				</button>
				{children}
			</div> */
