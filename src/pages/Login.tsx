import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hook';
import { loginUser } from '../services/features/user/user-slice';
import { saveConstructorState } from '../services/features/constructor/constructor-slice';

export const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (error) setError(null); // Сбрасываем ошибку при изменении данных
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (error) setError(null); // Сбрасываем ошибку при изменении данных
	};

	const handleSubmitLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await dispatch(loginUser({ email, password }));
			const savedState = localStorage.getItem('burgerConstructor');

			if (savedState) {
				try {
					const { bun, ingredients } = JSON.parse(savedState);

					dispatch(saveConstructorState({ bun, ingredients }));

					localStorage.removeItem('burgerConstructor');
				} catch (err) {
					localStorage.removeItem('burgerConstructor');
					throw err;
				}
			}
		} catch (err) {
			throw err;
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>Вход</span>
				{error && <div className={styles.error}>{error}</div>}
				<form className={styles.form} onSubmit={handleSubmitLogin}>
					<EmailInput
						value={email}
						onChange={handleEmailChange}
						data-testid={'email-input'}
					/>

					<PasswordInput
						value={password}
						onChange={handlePasswordChange}
						data-testid={'password-input'}
					/>

					<Button
						htmlType='submit'
						size='large'
						disabled={!password || !email}
						data-testid={'login-button'}>
						Войти
					</Button>
				</form>
			</div>
			<div className={styles.auxFields}>
				<p>
					Вы — новый пользователь?{' '}
					<Link to='/register'>
						<span>Зарегистрироваться</span>
					</Link>
				</p>
				<p>
					Забыли пароль?{' '}
					<Link to='/forgot-password'>
						<span>Восстановить пароль</span>
					</Link>
				</p>
			</div>
		</div>
	);
};
