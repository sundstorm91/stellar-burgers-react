// components/Modal.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../services/features/modal-data/action';
import styles from './modal.module.css';
import Overlay from './overlay';
import ReactDOM from 'react-dom';

const ModalProba: React.FC = () => {
	const modalRoot = document.getElementById('modal-root');
	const dispatch = useDispatch();
	const { isOpen, content } = useSelector((state: any) => state.modal);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				dispatch(closeModal());
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, dispatch]);

	if (!isOpen || !modalRoot) return null;

	return ReactDOM.createPortal(
		<>
			<Overlay onClick={() => dispatch(closeModal())} />
			<div className={styles.modal}>
				<div className={styles.modalContent}>
					<button
						className={styles.modalClose}
						onClick={() => dispatch(closeModal())}>
						&times;
					</button>
					{content}
				</div>
			</div>
		</>,
		modalRoot!
	);
};

export default ModalProba;
