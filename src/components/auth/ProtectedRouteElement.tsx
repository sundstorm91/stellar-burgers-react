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
	// Дополнительная защита для reset-password
	if (needPasswordResetRequest) {
		if (wasPasswordResetRequested) {
			// Разрешаем доступ к reset-password, даже если пользователь не авторизован
			return component;
		}

		return <Navigate to='/forgot-password' replace />;
	}

	if (!onlyUnAuth && !user) {
		console.log('протектед 1')
		return <Navigate to='/login' state={{ from: location }} />;
	}

	// Защита для маршрутов только для неавторизованных
	if (onlyUnAuth && user) {
		const from = location.state?.from?.pathname || '/profile';
		console.log('протектед 2.1')
		// Не разрешаем редирект на страницы авторизации
		if (
			!['/login', '/register', '/forgot-password', '/reset-password'].includes(
				from
			)
		) {
			console.log('протектед 2.2')
			return <Navigate to={from} replace />;
		}
		return <Navigate to='/profile' replace />;
	}
	console.log('протектед 3');
	return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: React.FC<OnlyUnAuthProps> = ({ component }) => (
	<ProtectedRouteElement onlyUnAuth component={component} />
);

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
