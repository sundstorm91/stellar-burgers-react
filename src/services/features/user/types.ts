export interface User {
	email: string;
	name: string;
}

export interface UserState {
	user: User | null;
	isAuthChecked: boolean;
	isLoading: boolean;
	error: string | null;
}
