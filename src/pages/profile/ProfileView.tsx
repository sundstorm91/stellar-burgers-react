import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchUser } from '../../services/features/user/user-slice';
import { ProfileForm } from './components/ProfileForm';

export const ProfileView = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return <ProfileForm initialUser={user} />;
};
