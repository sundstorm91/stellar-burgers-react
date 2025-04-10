import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link } from 'react-router-dom';

export const ResetPassword: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>Восстановление пароля</span>

				<PasswordInput
					value={''}
					onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>

				<Input
					value={''}
					onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>
				<Button htmlType={'button'} size='large'>
					Сохранить
				</Button>
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
