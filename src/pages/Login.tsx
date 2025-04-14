import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hook';
import { loginUser, setUser } from '../services/features/user/user-slice';
import {
	checkResponse,
	fetchWithRefresh,
	ingredientsApiConfig,
} from '../utils/api-utils';

/* export const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSubmitLogin = (e: React.FormEvent) => {
		dispatch(loginUser({ email, password }));
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>Вход</span>
				<form className={styles.form} onSubmit={handleSubmitLogin}>
					<EmailInput value={email} onChange={handleEmailChange} />

					<PasswordInput value={password} onChange={handlePasswordChange} />
					<Button
						htmlType={'submit'}
						size='large'
						disabled={!password && !email}>
						Войти
					</Button>
				</form>
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
}; */
export const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	/* const handleSubmitLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			setError('Пожалуйста, заполните все поля');
			return;
		}

		try {
			setIsLoading(true);
			setError(null);

			// Диспатчим и ждем завершения
			await dispatch(loginUser({ email, password })).unwrap();

			// Перенаправляем после успешного входа
			navigate('/');
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Произошла ошибка при входе. Проверьте данные и попробуйте снова.'
			);
		} finally {
			setIsLoading(false);
		}
	}; */

	const handleSubmitLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			// 1. Выполняем запрос авторизации
			const { user, accessToken, refreshToken } = await fetchWithRefresh(
				`${ingredientsApiConfig.baseUrl}/auth/login`,
				{
					method: 'POST',
					headers: ingredientsApiConfig.headers,
					body: JSON.stringify({ email, password }),
					/* В ЛОКАЛСОРАДЖ положи! */
				}
			);

			// 2. Сохраняем пользователя в хранилище (Redux/Zustand)
			dispatch(setUser(user)); // Пример для Redux

			// 3. Перенаправляем
			navigate('/');
		} catch (error) {
			// Обработка ошибок
			setError(error instanceof Error ? error.message : 'Ошибка авторизации');
		} finally {
			setIsLoading(false);
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
