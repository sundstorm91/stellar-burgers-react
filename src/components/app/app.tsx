import { Route, Routes } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import styles from './app.module.css';
import { Register } from '../../pages/Register';
import { ResetPassword } from '../../pages/ResetPassword';
import { ForgotPassword } from '../../pages/ForgotPassword';

export const App: React.FC = () => {
	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
				</Routes>
			</main>
		</>
	);
};
