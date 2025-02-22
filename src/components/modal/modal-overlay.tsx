import React, { useEffect } from 'react';
import Portal from './portal';
import styles from './modal.module.css';
import { ModalProps } from '../types/data-types';

const ModalOverlay: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
		<Portal>
			<div className={styles.modalOverlay}>
				<div className={styles.modalContent}>
					<button className={styles.modalClose} onClick={onClose}>
						&times;
					</button>
					{children}
				</div>
			</div>
		</Portal>
	);
};

export default ModalOverlay;
