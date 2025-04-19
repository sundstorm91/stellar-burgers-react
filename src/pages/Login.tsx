import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hook';
import { loginUser } from '../services/features/user/user-slice';

export const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState<string | null>(null);
	const dispatch = useAppDispatch();

	const handleSubmitLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await dispatch(loginUser({ email, password }));
		} catch (err) {
			throw err;
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (error) setError(null); // Сбрасываем ошибку при изменении данных
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (error) setError(null); // Сбрасываем ошибку при изменении данных
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
						disabled={isLoading}
					/>

					<PasswordInput
						value={password}
						onChange={handlePasswordChange}
						disabled={isLoading}
					/>

					<Button
						htmlType='submit'
						size='large'
						disabled={!password || !email || isLoading}>
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
					<Link to='/reset-password'>
						<span>Восстановить пароль</span>
					</Link>
				</p>
			</div>
		</div>
	);
};
