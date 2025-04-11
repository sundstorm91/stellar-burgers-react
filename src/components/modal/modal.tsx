import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './modal.module.css';
import Overlay from './modal-overlay';
import { useEffect } from 'react';

export const Modal: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const backgroundLocation = location.state?.backgroundLocation;

	const onClose = () => {
		navigate(-1);
	};

	/* useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, []); */

	if (!backgroundLocation) return null;

	return createPortal(
		<>
			<Overlay onClick={onClose} />
			<div className={styles.modal}>
				<div className={styles.modalContent}>
					<button className={styles.modalClose} onClick={onClose}>
						&times;
					</button>
					{children}
				</div>
			</div>
		</>,
		document.getElementById('modal-root') as HTMLElement
	);
};
