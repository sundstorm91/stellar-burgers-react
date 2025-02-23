import React from 'react';
/* import Portal from './portal'; */
import styles from './modal.module.css';

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
