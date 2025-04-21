import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styles from './modal.module.css';
import Overlay from './modal-overlay';
import { useAppDispatch } from '../../hooks/hook';
import { clearOrder } from '../../services/features/create-order/order-slice';
import { clearConstructorState } from '../../services/features/constructor/constructor-slice';

export const Modal: React.FC<{ children: React.ReactElement }> = ({
	children,
}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onClose = () => {
		navigate(-1);
		dispatch(clearConstructorState());
		dispatch(clearOrder());
	};

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
