export interface User {
	email: string;
	name: string;
	password?: string;
}

export interface UserState {
	user: User | null;
	isAuthChecked: boolean;
	isLoading: boolean;
	error: string | null;
	passwordReset: {
		wasRequested: boolean;
		email: string;
	};
}
