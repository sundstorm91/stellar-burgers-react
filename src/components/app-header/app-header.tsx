import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
	return (
		<>
			<header className={styles.header}>
				<nav className={styles.nav}>
					<div className={styles.wrapper}>
						<div className={styles.builder}>
							<BurgerIcon type={'primary'} />
							<span className={styles.builderText}>Конструктор</span>
						</div>
						<div className={styles.orderFeed}>
							<ListIcon type={'secondary'} />
							<span className={styles.orderFeedText}>Лента заказов</span>
						</div>
					</div>
					<Logo />

					<div className={styles.personalAccount}>
						<ProfileIcon type={'secondary'} />
						<span className={styles.personalAccountText}>Личный кабинет</span>
					</div>
				</nav>
			</header>
		</>
	);
};
