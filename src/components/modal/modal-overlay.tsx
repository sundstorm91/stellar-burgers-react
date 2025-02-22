import { ModalProps } from '../types/data-types';
import styles from './modal.module.css';
import React from 'react';

export const ModalOverlay: React.FC<ModalProps> = ({
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
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};
