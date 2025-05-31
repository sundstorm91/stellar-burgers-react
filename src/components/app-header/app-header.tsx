import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserSelector } from '../../services/features/user/user-slice';
import { useSelector } from 'react-redux';

export const AppHeader = () => {
	const user = useSelector(getUserSelector);
	const isProfileActive = location.pathname.startsWith('/profile');

	return (
		<>
			<header className={styles.header}>
				<nav className={styles.nav}>
					<div className={styles.wrapper}>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive ? `${styles.builder} ${styles.active}` : styles.builder
							}>
							{({ isActive }) => (
								<>
									<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
									<div className={styles.builderText}>
										<span
											className={
												isActive ? styles.activeText : styles.defaultText
											}>
											Конструктор
										</span>
									</div>
								</>
							)}
						</NavLink>

						<NavLink
							to='/feed'
							className={({ isActive }) =>
								isActive
									? `${styles.orderFeed} ${styles.active}`
									: styles.orderFeed
							}>
							{({ isActive }) => (
								<>
									<ListIcon type={isActive ? 'primary' : 'secondary'} />
									<div className={styles.orderFeedText}>
										<span
											className={
												isActive ? styles.activeText : styles.defaultText
											}>
											Лента заказов
										</span>
									</div>
								</>
							)}
						</NavLink>
					</div>
					<div className={styles.wrapperLogo}>
						<Link to='/'>
							<Logo />
						</Link>
					</div>

					<NavLink
						to='/profile'
						className={
							isProfileActive
								? `${styles.personalAccount} ${styles.active}`
								: styles.personalAccount
						}>
						<ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />

						<span
							className={
								isProfileActive ? styles.activeText : styles.defaultText
							}>
							{user ? `${user.email}` : 'Личный кабинет'}
						</span>
					</NavLink>
				</nav>
			</header>
		</>
	);
};
