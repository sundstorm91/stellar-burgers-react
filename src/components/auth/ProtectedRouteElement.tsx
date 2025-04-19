import {
	getIsAuthCheckedSelector,
	getUserSelector,
} from '../../services/features/user/user-slice';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

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
	const user = useSelector(getUserSelector);
	const isAuthChecked = useSelector(getIsAuthCheckedSelector);
	const location = useLocation();

	if (!isAuthChecked) {
		return <div>Loading.. isAuthChecked</div>;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: React.FC<OnlyUnAuthProps> = ({ component }) => (
	<ProtectedRouteElement onlyUnAuth component={component} />
);
