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
import {
	OnlyAuth,
	OnlyUnAuth,
	OnlyWithPasswordResetRequest,
} from '../auth/ProtectedRouteElement';
import {
	fetchUser,
	getIsAuthCheckedSelector,
} from '../../services/features/user/user-slice';
import { useAppDispatch } from '../../hooks/hook';
import { useSelector } from 'react-redux';
import { ProfileLayout } from '../../pages/profile/ProfileLayout';
import { ProfileView } from '../../pages/profile/ProfileView';
import { OrdersHistory } from '../../pages/profile/OrdersHistory';
import { FeedPublic } from '../../pages/feed/FeedPublic';
import { CurrentOrder } from '../../pages/CurrentOrder';

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
					<Route path='/feed' element={<FeedPublic />} />
					<Route
						path='/feed/:number'
						element={<CurrentOrder isModal={false} />}
					/>
					<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
					<Route
						path='/ingredients/:id'
						element={<CurrentIngredient backgroundLocation={false} />}
					/>
					<Route
						path='/register'
						element={<OnlyUnAuth component={<Register />} />}
					/>
					<Route
						path='/forgot-password'
						element={<OnlyUnAuth component={<ForgotPassword />} />}
					/>
					<Route
						path='/reset-password'
						element={
							<OnlyWithPasswordResetRequest component={<ResetPassword />} />
						}
					/>
					<Route
						path='/profile'
						element={<OnlyAuth component={<ProfileLayout />} />}>
						<Route index element={<OnlyAuth component={<ProfileView />} />} />

						<Route
							path='orders'
							element={<OnlyAuth component={<OrdersHistory />} />}
						/>
						<Route
							path='/profile/orders/:number'
							element={
								<Modal>
									<CurrentOrder isModal={false} />
								</Modal>
							}
						/>
					</Route>
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>

			{/* Модальные роуты */}
			{state?.backgroundLocation && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal>
								<CurrentIngredient backgroundLocation={true} />
							</Modal>
						}
					/>
					<Route
						path='/feed/:number'
						element={
							<Modal>
								<CurrentOrder isModal={true} />
							</Modal>
						}
					/>

					<Route
						path='/profile/orders/:number'
						element={
							<Modal>
								<CurrentOrder isModal={true} />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};
