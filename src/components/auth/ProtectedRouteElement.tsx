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

	if (needPasswordResetRequest) {
		if (wasPasswordResetRequested) {
			return component;
		}

		return <Navigate to='/forgot-password' replace />;
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
