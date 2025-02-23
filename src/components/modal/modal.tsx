import React, { useEffect } from 'react';
import styles from './modal.module.css';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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

	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<button className={styles.modalClose} onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
