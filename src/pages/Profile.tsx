import {
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { NavLink } from 'react-router-dom';

export const Profile: React.FC = () => {
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
						to='/quit' /* ! */
						className={({ isActive }) =>
							isActive
								? `${styles.profileActiveLink}`
								: ` ${styles.profileNormalLink}`
						}>
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
