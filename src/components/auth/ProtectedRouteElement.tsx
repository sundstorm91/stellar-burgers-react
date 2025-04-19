interface ProtectedRouteProps {
	onlyUnAuth?: boolean;
	element: React.ReactElement;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
	onlyUnAuth = false,
	element,
}) => {

	return <></>;
};
