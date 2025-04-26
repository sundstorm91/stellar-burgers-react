import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import {
	fetchUser,
	logoutUser,
	resetAuthState,
	updateUser,
} from '../services/features/user/user-slice';
import { useEffect, useState } from 'react';
import { User } from '../services/features/user/types';

export const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [originalUserData, setOriginalUserData] = useState<User | null>(null);
	const { user, isLoading } = useAppSelector((state) => state.user);

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
			throw error;
		}
	};

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await dispatch(updateUser(formData)).unwrap();
			setOriginalUserData(formData);
			setFormData((prev) => ({ ...prev, password: '' }));
		} catch (error) {
			throw error;
		}
	};

	const handleCancel = () => {
		if (originalUserData) {
			setFormData({
				name: originalUserData.name,
				email: originalUserData.email,
				password: '',
			});
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
			setOriginalUserData(user);
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
						to='orders'
						className={({ isActive }) =>
							isActive
								? `${styles.profileActiveLink}`
								: ` ${styles.profileNormalLink}`
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

					<div className={styles.buttonsField}>
						<Button htmlType={'submit'} size='large' disabled={isLoading}>
							{' '}
							{isLoading ? 'Сохраняю..' : 'Сохранить'}
						</Button>

						<Button
							htmlType={'button'}
							size={'large'}
							onClick={handleCancel}
							disabled={
								formData.name === originalUserData?.name &&
								formData.email === originalUserData?.email &&
								formData.password === ''
							}>
							Отмена
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
