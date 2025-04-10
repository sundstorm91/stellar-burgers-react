import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>Вход</span>
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
				<Button htmlType={'button'} size='large'>
					Войти
				</Button>
			</div>
			<div className={styles.auxFields}>
				<p>
					Вы — новый пользователь?{' '}
					<Link to='/register'>
						<span>Зарегистрироваться</span>
					</Link>
				</p>
				<p>
					Забыли пароль?{' '}
					<Link to='/reset-password'>
						<span>Восстановить пароль</span>
					</Link>
				</p>
			</div>
		</div>
	);
};
