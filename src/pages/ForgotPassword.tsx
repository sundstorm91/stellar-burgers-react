import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export const ForgotPassword: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>Восстановление пароля</span>
				<EmailInput
					value={''}
					onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>
				<Button htmlType={'button'} size='large'>
					Восстановить
				</Button>
			</div>
			<div className={styles.auxFields}>
				<p>
					Вспомнили пароль? <span>Войти</span>
				</p>
			</div>
		</div>
	);
};
