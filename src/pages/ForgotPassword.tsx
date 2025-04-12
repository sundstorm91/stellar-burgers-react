import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { useState } from 'react';
import { forgotPassword } from '../utils/api-utils';

export const ForgotPassword: React.FC = () => {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			await forgotPassword(email);
			setSuccess(true);
		} catch (err) {
			setError('Произошла ошибка при отправке запроса');
		} finally {
			setIsLoading(false);
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>Восстановление пароля</span>

				{success ? (
					<p className='text text_type_main-default'>
						Инструкция по восстановлению пароля отправлена на вашу почту
					</p>
				) : (
					<form onSubmit={handleSubmit} className={styles.wrapper}>
						<EmailInput
							onChange={handleEmailChange}
							value={email}
							name={'email'}
							placeholder='Укажите e-mail'
							required
						/>

						{error && (
							<p className='text text_type_main-default text_color_error'>
								{error}
							</p>
						)}

						<Button
							htmlType='submit'
							type='primary'
							size='large'
							disabled={isLoading || !email}>
							{isLoading ? 'Отправка...' : 'Восстановить'}
						</Button>
					</form>
				)}
			</div>

			<div className={styles.auxFields}>
				<p className='text text_type_main-default text_color_inactive'>
					Вспомнили пароль? <span className={styles.link}>Войти</span>
				</p>
			</div>
		</div>
	);
};
