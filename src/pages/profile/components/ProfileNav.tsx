import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../../pages.module.css';
import { useAppDispatch } from '../../../hooks/hook';
import {
	logoutUser,
	resetAuthState,
} from '../../../services/features/user/user-slice';

export const ProfileNav = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			await dispatch(logoutUser())
				.unwrap()
				.then(() => {
					navigate('/login');
				});
			dispatch(resetAuthState());
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<div className={styles.switchField}>
			<NavLink
				to='/profile'
				end
				className={({ isActive }) =>
					isActive
						? `${styles.profileActiveLink}`
						: `${styles.profileNormalLink}`
				}>
				Профиль
			</NavLink>

			<NavLink
				to='orders'
				className={({ isActive }) =>
					isActive
						? `${styles.profileActiveLink}`
						: `${styles.profileNormalLink}`
				}>
				История заказов
			</NavLink>

			<NavLink
				to='/login'
				className={styles.profileNormalLink}
				onClick={handleLogout}>
				Выход
			</NavLink>

			<div className={styles.profileDescription}>
				В этом разделе вы можете изменить свои персональные данные
			</div>
		</div>
	);
};
