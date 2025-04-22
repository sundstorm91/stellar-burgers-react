import { useEffect, useState } from 'react';
import { User } from '../../../services/features/user/types';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../pages.module.css';
import { useAppDispatch } from '../../../hooks/hook';
import { updateUser } from '../../../services/features/user/user-slice';

interface ProfileFormProps {
	initialUser: User | null;
}

export const ProfileForm = ({ initialUser }: ProfileFormProps) => {
	const dispatch = useAppDispatch();
	const [originalUserData, setOriginalUserData] = useState<User | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		if (initialUser) {
			setOriginalUserData(initialUser);
			setFormData({
				name: initialUser.name,
				email: initialUser.email,
				password: '',
			});
		}
	}, [initialUser]);

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await dispatch(updateUser(formData)).unwrap();
			setOriginalUserData(formData);
			setFormData((prev) => ({ ...prev, password: '' }));
		} catch (error) {
			console.log('Update failed:', error);
			throw error;
		}
	};

	const handleCancel = () => {
		if (originalUserData) {
			setFormData({
				name: originalUserData.name,
				email: originalUserData.email,
				password: '',
			});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<form className={styles.wrapper} onSubmit={handleUpdate}>
			<Input
				value={formData.name}
				onChange={handleChange}
				name='name'
				placeholder={'Имя'}
				icon='EditIcon'
			/>

			<EmailInput
				value={formData.email}
				onChange={handleChange}
				placeholder={'E-mail'}
				name='email'
				isIcon={true}
			/>

			<PasswordInput
				onChange={handleChange}
				value={formData.password}
				name={'password'}
				icon='HideIcon'
			/>

			<div className={styles.buttonsField}>
				<Button htmlType={'submit'} size='large'>
					Сохранить
				</Button>

				<Button
					htmlType={'button'}
					size={'large'}
					onClick={handleCancel}
					disabled={
						formData.name === originalUserData?.name &&
						formData.email === originalUserData?.email &&
						formData.password === ''
					}>
					Отмена
				</Button>
			</div>
		</form>
	);
};
