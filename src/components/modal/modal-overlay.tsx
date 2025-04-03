import React from 'react';
import styles from './modal.module.css';

interface OverlayProps {
	onClick: () => void;
}
const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
	return (
		<div
			className={styles.modalOverlay}
			onClick={onClick}
			aria-hidden='true'></div>
	);
};

export default Overlay;
