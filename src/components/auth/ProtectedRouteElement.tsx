import {
	fetchUser,
	getIsAuthCheckedSelector,
	getUserSelector,
} from '../../services/features/user/user-slice';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';

interface ProtectedRouteProps {
	onlyUnAuth?: boolean;
	component: React.ReactElement;
}

interface OnlyUnAuthProps {
	component: React.ReactElement;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
	onlyUnAuth = false,
	component,
}) => {
	const dispatch = useAppDispatch();
	const user = useSelector(getUserSelector);
	const isAuthChecked = useSelector(getIsAuthCheckedSelector);
	const location = useLocation();

	if (!isAuthChecked) {
		// Если это первый рендер или состояние после выхода
		if (user === null) {
			// Пытаемся проверить авторизацию
			dispatch(fetchUser());
			return <div>loading... isAuthChecked</div>;
		}

		return <div>loading... isAuthChecked</div>;
	}

	if (!onlyUnAuth && !user && isAuthChecked) {
		console.log(
			'Сработал переход 1 на логин, потому что юзер не авторизирован'
		);
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		// Если есть информация о предыдущей странице и это не страница входа/регистрации
		if (
			location.state?.from &&
			!['/login', '/register', '/forgot-password'].includes(
				location.state.from.pathname
			)
		) {
			console.log(
				'Переход 2.1: есть инфа о предыдущей странице, но это не страница входа или регистрации'
			);
			return <Navigate to={location.state.from} replace />;
		}
		console.log('переход 2.2', location);
		// Иначе - в профиль
		return <Navigate to='/profile' replace />;
	}

	console.log('сработал переход 3 прямо в компонент');
	return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: React.FC<OnlyUnAuthProps> = ({ component }) => (
	<ProtectedRouteElement onlyUnAuth component={component} />
);
