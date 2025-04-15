import {
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { fetchUser, logoutUser } from '../services/features/user/user-slice';
import { useEffect, useState } from 'react';

export const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();

		try {
			await dispatch(logoutUser()).unwrap();
			navigate('/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

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
					</div>
				</div>
				<div className={styles.wrapper}>
					<Input
						value={''}
						placeholder='Имя'
						onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
							throw new Error('Function not implemented.');
						}}
					/>

					<EmailInput
						value={''}
						onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
							throw new Error('Function not implemented.');
						}}
					/>

					<PasswordInput
						value={''}
						onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
							throw new Error('Function not implemented.');
						}}
					/>
				</div>
			</div>
		</div>
	);
};
