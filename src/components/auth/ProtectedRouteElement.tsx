import {
	getIsAuthCheckedSelector,
	getUserSelector,
	getWasPasswordResetRequested,
} from '../../services/features/user/user-slice';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from '../spinner/spinner';

interface ProtectedRouteProps {
	onlyUnAuth?: boolean;
	component: React.ReactElement;
	needPasswordResetRequest?: boolean;
}

interface OnlyUnAuthProps {
	component: React.ReactElement;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
	onlyUnAuth = false,
	component,
	needPasswordResetRequest = false,
}) => {
	const user = useSelector(getUserSelector);
	const isAuthChecked = useSelector(getIsAuthCheckedSelector);
	const location = useLocation();
	const wasPasswordResetRequested = useSelector(getWasPasswordResetRequested);

	if (!isAuthChecked) {
		return <Spinner />;
	}
	console.log(wasPasswordResetRequested, 'request');
	// Дополнительная защита для reset-password
	if (needPasswordResetRequest) {
		if (wasPasswordResetRequested) {
			// Разрешаем доступ к reset-password, даже если пользователь не авторизован
			return component;
		}
		console.log('Redirect to forgot-password - no reset request');
		return <Navigate to='/forgot-password' replace />;
	}

	if (!onlyUnAuth && !user) {
		console.log('переход 1');
		return <Navigate to='/login' state={{ from: location }} />;
	}

	// Защита для маршрутов только для неавторизованных
	if (onlyUnAuth && user) {
		const from = location.state?.from?.pathname || '/profile';
		console.log('!', from);

		// Не разрешаем редирект на страницы авторизации
		if (
			!['/login', '/register', '/forgot-password', '/reset-password'].includes(
				from
			)
		) {
			console.log(`Redirect authorized user back to ${from}`);
			return <Navigate to={from} replace />;
		}

		console.log('Redirect authorized user to profile (default)');
		return <Navigate to='/profile' replace />;
	}

	console.log('переход 3');
	return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: React.FC<OnlyUnAuthProps> = ({ component }) => (
	<ProtectedRouteElement onlyUnAuth component={component} />
);

/* export const OnlyWithPasswordResetRequest: React.FC<
	Omit<ProtectedRouteProps, 'needPasswordResetRequest'>
> = ({ component }) => (
	<ProtectedRouteElement needPasswordResetRequest component={component} />
); */
export const OnlyWithPasswordResetRequest = ({
	component,
}: {
	component: React.ReactElement;
}) => (
	<ProtectedRouteElement
		needPasswordResetRequest={true}
		component={component}
	/>
);
