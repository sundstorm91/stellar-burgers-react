import React from 'react';
import styles from './modal.module.css';

interface OverlayP {
	onClick: () => void;
}
const Overlay: React.FC<OverlayP> = ({ onClick }) => {
	return (
		<div
			className={styles.modalOverlay}
			onClick={onClick}
			aria-hidden='true'></div>
	);
};

export default Overlay;
