import styles from './modal-order.module.css';
import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const ModalOrder: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
}) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<button className={styles.modalClose} onClick={onClose}>
					x
				</button>
				{children}
			</div>
		</div>
	);
};
