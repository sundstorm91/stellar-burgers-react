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
import { OrderFeed } from '../../pages/OrderFeed';

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
			{/* Если пользователь отредактировал данные в форме, то появляются кнопки «Отмена» и «Сохранить».
			При нажатии кнопки «Отмена» значения полей формы возвращаются в состояние до редактирования, а кнопки
«Отмена» и «Сохранить» скрываются.

			 */}
			<Routes location={state?.backgroundLocation || location}>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='order-feed' element={<OrderFeed />} />
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
					</Route>
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>

			{state?.backgroundLocation && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal>
								<CurrentIngredient backgroundLocation={true} />
							</Modal>
						}></Route>
				</Routes>
			)}
		</>
	);
};
