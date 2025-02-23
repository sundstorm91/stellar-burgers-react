import React, { useEffect } from 'react';
import styles from './modal.module.css';
import ReactDOM from 'react-dom';
import { ModalProps } from '../types/data-types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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

	return ReactDOM.createPortal(
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<button className={styles.modalClose} onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>,
		modalRoot!
	);
};

export default Modal;
