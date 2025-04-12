import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '@utils/api-utils';

export const ResetPassword: React.FC = () => {
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToken(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!password || !token) {
			setError('Заполните все поля');
			return;
		}

		setIsLoading(true);
		setError('');

		try {
			await resetPassword(password, token);
			setSuccess(true);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Ошибка восстановления пароля'
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>Восстановление пароля</span>

				{success ? (
					<p className='text text_type_main-default mb-20'>
						Пароль успешно изменен!
					</p>
				) : (
					<form onSubmit={handleSubmit} className={styles.wrapper}>
						<Input
							type={'password'}
							placeholder={'Введите новый пароль'}
							onChange={handlePasswordChange}
							value={password}
							name={'password'}
							error={false}
							errorText={'Ошибка'}
							size={'default'}
							extraClass='mb-6'
						/>

						<Input
							type={'text'}
							placeholder={'Введите код из письма'}
							onChange={handleTokenChange}
							value={token}
							name={'token'}
							error={false}
							errorText={'Ошибка'}
							size={'default'}
							extraClass='mb-6'
						/>

						{error && (
							<p className='text text_type_main-default text_color_error mb-6'>
								{error}
							</p>
						)}

						<Button
							htmlType='submit'
							type='primary'
							size='medium'
							disabled={!password && !token}
							extraClass='mb-20'>
							{isLoading ? 'Сохранение...' : 'Сохранить'}
						</Button>
					</form>
				)}
			</div>

			<div className={styles.auxFields}>
				<p>
					Вспомнили пароль?{' '}
					<Link to='/login'>
						<span>Войти</span>
					</Link>
				</p>
			</div>
		</div>
	);
};
