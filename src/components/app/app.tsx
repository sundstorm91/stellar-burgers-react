import { Outlet, Route, Routes } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import styles from './app.module.css';
import { Register } from '../../pages/Register';
import { ResetPassword } from '../../pages/ResetPassword';
import { ForgotPassword } from '../../pages/ForgotPassword';
import { NotFoundPage } from '../../pages/NotFound';
import { ReactElement } from 'react';

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
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
