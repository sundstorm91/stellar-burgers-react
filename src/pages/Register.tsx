import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../hooks/hook';
import { registerUser } from '../services/features/user/user-slice';
import { unwrapResult } from '@reduxjs/toolkit';

export const Register: React.FC = () => {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	});

	/* {
		"email": "test-data@yandex.ru",
		"password": "password",
		"name": "Username"
	}  */

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const result = await dispatch(registerUser(formData));

			// Проверка успешности через unwrap()
			unwrapResult(result);
			// Регистрация успешна
			console.log('Пользователь зарегистрирован:', result.payload);
		} catch (error) {
			// Автоматически попадаем сюда при rejected
			setError(error instanceof Error ? error.message : `${error}`);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>Регистрация</span>

				<form className={styles.form} onSubmit={handleSubmit}>
					<Input
						placeholder='Имя'
						value={formData.name}
						onChange={handleChange}
						name='name'
					/>

					<EmailInput
						value={formData.email}
						onChange={handleChange}
						name='email'
					/>

					<PasswordInput
						value={formData.password}
						onChange={handleChange}
						name='password'
					/>
					<Button htmlType={'button'} size='large' disabled={!formData.email}>
						Зарегистрироваться
					</Button>
				</form>
			</div>
			{error && <div>{error}</div>}
			<div className={styles.auxFields}>
				<p>
					Уже зарегестрированы?{' '}
					<Link to='/login'>
						<span>Войти</span>
					</Link>
				</p>
			</div>
		</div>
	);
};
