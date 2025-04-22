import { Outlet } from 'react-router-dom';
import { ProfileNav } from './components/ProfileNav';
import styles from '../pages.module.css';

export const ProfileLayout = () => {
	return (
		<div className={styles.container}>
			<div className={styles.profileWrapper}>
				<ProfileNav />
				<Outlet /> {/* Динамическая часть будет здесь */}
			</div>
		</div>
	);
};
