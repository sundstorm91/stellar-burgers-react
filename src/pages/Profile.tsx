import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { fetchUser, logoutUser, updateUser } from '../services/features/user/user-slice';
import { useEffect, useState } from 'react';

export const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { user, isLoading, error } = useAppSelector((state) => state.user);
	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();

		try {
			await dispatch(logoutUser()).unwrap();
			navigate('/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await dispatch(updateUser(formData)).unwrap();
		} catch (error) {
			console.error('Update failed:', error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name,
				email: user.email,
				password: '',
			});
		}
	}, [user]);
	return (
		<div className={styles.container}>
			<div className={styles.profileWrapper}>
				<div className={styles.switchField}>
					<NavLink
						to='/profile'
						className={({ isActive }) =>
							isActive
								? `${styles.profileActiveLink}`
								: ` ${styles.profileNormalLink}`
						}>
						Профиль
					</NavLink>
					<NavLink
						to='/orders'
						className={({ isActive }) =>
							isActive
								? `${styles.profileActiveLink}`
								: ` ${styles.profileNormalLink}`
						}>
						История заказов
					</NavLink>
					<NavLink
						to='#'
						className={styles.profileNormalLink}
						onClick={handleLogout}>
						Выход
					</NavLink>

					<div className={styles.profileDescription}>
						В этом разделе вы можете изменить свои персональные данные
						{}
					</div>
				</div>
				<form className={styles.wrapper} onSubmit={handleUpdate}>
					<Input
						value={formData.name}
						onChange={handleChange}
						name='name'
						placeholder={'Имя'}
						icon='EditIcon'
					/>

					<EmailInput
						value={formData.email}
						onChange={handleChange}
						placeholder={'E-mail'}
						name='email'
						isIcon={true}
					/>

					<PasswordInput
						onChange={handleChange}
						value={formData.password}
						name={'password'}
						icon='HideIcon'
					/>

					{(formData.name || formData.email || formData.password) &&
					(formData.name !== user?.name ||
						formData.email !== user?.email ||
						formData.password !== '') ? (
						<Button
							htmlType={'submit'}
							size='large'
							disabled={isLoading}
							style={{ position: 'absolute', bottom: '-100px' }}>
							{' '}
							{isLoading ? 'Сохраняю..' : 'Сохранить'}
						</Button>
					) : (
						''
					)}
				</form>
			</div>
		</div>
	);
};
