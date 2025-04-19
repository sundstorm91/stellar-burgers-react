import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/hook';
import {
	getUserSelector,
	registerUser,
	setUser,
} from '../services/features/user/user-slice';
import { useSelector } from 'react-redux';

export const Register: React.FC = () => {
	const user = useSelector(getUserSelector);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	});

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

			if (registerUser.fulfilled.match(result)) {
				// Регистрация успешна
				console.log('Пользователь зарегистрирован:', result.payload);
				dispatch(setUser(formData));
				navigate('/', { replace: true });
			} else if (registerUser.rejected.match(result)) {
				setError(result.payload as string);
			}
		} finally {
			setIsLoading(false);
		}
	};
	/* 	afonya
		ksandr1g@mail.ru
		1234567 	*/

	useEffect(() => {
		if (user) {
			navigate('/profile', { replace: true });
		}
	}, [user, navigate]);

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
					<Button htmlType={'submit'} size='large' disabled={isLoading}>
						{' '}
						{isLoading ? 'Регистрирую..' : 'Зарегистрировать'}
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
