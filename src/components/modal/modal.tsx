import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styles from './modal.module.css';
import Overlay from './modal-overlay';

export const Modal: React.FC<{
	children: React.ReactElement;
	onClose?: () => void;
}> = ({ children, onClose }) => {
	const navigate = useNavigate();

	/* useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []) */

	const handleClose = () => {
		if (onClose) {
			onClose();
		} else {
			navigate(-1);
		}
	};

	return createPortal(
		<>
			<Overlay onClick={handleClose} />
			<div className={styles.modal}>
				<div className={styles.modalContent}>
					<button className={styles.modalClose} onClick={handleClose}>
						&times;
					</button>
					{children}
				</div>
			</div>
		</>,
		document.getElementById('modal-root') as HTMLElement
	);
};
