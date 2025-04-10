import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';
import { Link } from 'react-router-dom';

export const Register: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span className={styles.title}>Регистрация</span>

				<Input
					value={''}
					onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
						throw new Error('Function not implemented.');
					}}
				/>

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
					Зарегистрироваться
				</Button>
			</div>
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
