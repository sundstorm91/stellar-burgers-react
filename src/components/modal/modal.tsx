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

	// Проверяем, есть ли backgroundLocation в состоянии location
	const backgroundLocation = location.state?.backgroundLocation;

	const onClose = () => {
		// Возвращаемся назад в истории навигации
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

	// Если нет backgroundLocation, не показываем модальное окно
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
