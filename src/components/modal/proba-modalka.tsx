// components/Modal.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../services/features/modal-data/action';
import styles from './modal.module.css';
import Overlay from './overlay';
import ReactDOM from 'react-dom';
const ModalProba: React.FC = () => {
	const modalRoot = document.getElementById('modal-root');
	const dispatch = useDispatch();
	const { isOpen, content } = useSelector((state: any) => state.modal);

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
/* <button
					onClick={() => dispatch(closeModal())}
					className={styles.modalClose}>
					&times;
				</button> */
