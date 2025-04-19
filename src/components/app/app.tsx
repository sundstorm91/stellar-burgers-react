import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import styles from './app.module.css';
import { Register } from '../../pages/Register';
import { ResetPassword } from '../../pages/ResetPassword';
import { ForgotPassword } from '../../pages/ForgotPassword';
import { NotFoundPage } from '../../pages/NotFound';
import { ReactElement, useEffect } from 'react';
import { Modal } from '../modal/modal';
import { CurrentIngredient } from '../../pages/CurrentIngredient';
import { Profile } from '../../pages/Profile';
import { OnlyAuth, OnlyUnAuth } from '../auth/ProtectedRouteElement';
import {
	fetchUser,
	getIsAuthCheckedSelector,
} from '../../services/features/user/user-slice';
import { useAppDispatch } from '../../hooks/hook';
import { useSelector } from 'react-redux';

const Layout = (): ReactElement => {
	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<Outlet />
			</main>
		</>
	);
};
export const App: React.FC = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };
	const dispatch = useAppDispatch();
	const isAuthChecked = useSelector(getIsAuthCheckedSelector);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch, isAuthChecked]);

	return (
		<>
			<Routes location={state?.backgroundLocation || location}>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
					<Route path='/ingredients/:id' element={<CurrentIngredient />} />
					<Route path='/register' element={<Register />} />
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route
						path='/profile'
						element={<OnlyAuth component={<Profile />} />}
					/>
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>

			{state?.backgroundLocation && (
				<Routes>
					<Route path='/ingredients/:id' element={<Modal />}></Route>
				</Routes>
			)}
		</>
	);
};
