import { UserData } from '../../../utils/api-utils';
import {
	fetchUser,
	initialState,
	loginUser,
	logoutUser,
	registerUser,
	updateUser,
	userSlice,
} from '../../features/user/user-slice';
import { User, UserState } from './types';

describe('userSlice', () => {
	const mockUser: User = {
		email: 'user',
		name: 'user@mail.ru',
	};
	const mockUserData: UserData = {
		email: 'user',
		name: 'user@mail.ru',
		password: '1234567',
	};

	describe('reducers', () => {
		it('should handle setUser', () => {
			const action = userSlice.actions.setUser(mockUser);
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({ ...initialState, user: mockUser });
		});

		it('should handle setIsAuthChecked', () => {
			const action = userSlice.actions.setIsAuthChecked(true);
			const state = userSlice.reducer(initialState, action);

			expect(state.isAuthChecked).toBe(true);
		});

		it('should handle clearError', () => {
			const initialStateWithError: UserState = {
				...initialState,
				error: 'Случайная ошибка',
			};

			const action = userSlice.actions.clearError();
			const state = userSlice.reducer(initialStateWithError, action);

			expect(state.error).toBeNull();
		});

		it('should handle resetAuthState', () => {
			const currentState: UserState = {
				user: mockUser,
				isAuthChecked: true,
				isLoading: true,
				error: 'Error',
				passwordReset: {
					wasRequested: true,
					email: 'test@test.com',
				},
			};

			const action = userSlice.actions.resetAuthState();
			const state = userSlice.reducer(currentState, action);

			expect(state).toEqual({
				user: null,
				isAuthChecked: false,
				isLoading: false,
				error: null,
				passwordReset: {
					wasRequested: false,
					email: '',
				},
			});
		});

		it('should handle setPasswordResetRequested', () => {
			const action = userSlice.actions.setPasswordResetRequested({
				email: 'test@test.com',
			});
			const state = userSlice.reducer(initialState, action);

			expect(state.passwordReset).toEqual({
				wasRequested: true,
				email: 'test@test.com',
			});
		});

		it('should handle resetPasswordResetState', () => {
			const currentState = {
				...initialState,
				passwordReset: {
					wasRequested: true,
					email: 'test@test.com',
				},
			};

			const action = userSlice.actions.resetPasswordResetState();
			const state = userSlice.reducer(currentState, action);

			expect(state.passwordReset).toEqual({
				wasRequested: false,
				email: '',
			});
		});
	});

	describe('extraReducers', () => {
		it('should handle loginUser.pending', () => {
			const action = loginUser.pending('requestId', {
				email: 'random@mail.ru',
				password: '1234567',
			});
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				isLoading: true,
				error: null,
			});
		});

		it('should handle loginUser.fulfilled', () => {
			const action = loginUser.fulfilled(mockUser, 'requestId', {
				email: 'user@mail.ru',
				password: '1234567',
			});
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				user: mockUser,
				isLoading: false,
				isAuthChecked: true,
			});
		});

		it('should handle loginUser.rejected', () => {
			const error = 'Login failed';
			const action = loginUser.rejected(
				new Error(error),
				'requestId',
				{
					email: 'user@mail.ru',
					password: '1234567',
				},
				error
			);
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				isLoading: false,
				error,
			});
		});

		it('should handle logoutUser.fullfilled', () => {
			const loggedUserInState: UserState = {
				error: null,
				isAuthChecked: true,
				passwordReset: {
					email: '',
					wasRequested: false,
				},
				isLoading: false,
				user: mockUser,
			};
			const action = logoutUser.fulfilled(null, 'requestId');
			const state = userSlice.reducer(loggedUserInState, action);

			expect(state).toEqual({
				...loggedUserInState,
				user: null,
				error: null,
				isAuthChecked: true,
				isLoading: false,
			});
		});

		it('should handle registerUser.pending', () => {
			const action = registerUser.pending('requestId', mockUserData);
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				isLoading: true,
				error: null,
			});
		});

		it('should handle registerUser.fulfilled', () => {
			const action = registerUser.fulfilled(
				mockUser,
				'requestId',
				mockUserData
			);
			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				error: null,
				isLoading: false,
				user: mockUser,
				isAuthChecked: true,
			});
		});
		it('should handle registerUser.reject', () => {
			const mockError = 'Register failed';

			const action = registerUser.rejected(
				new Error(mockError),
				'requestId',
				mockUserData,
				mockError
			);

			const state = userSlice.reducer(initialState, action);
			expect(state).toEqual({
				...initialState,
				error: mockError,
				isLoading: false,
			});
		});

		it('should handle fetchUser.pending', () => {
			const action = fetchUser.pending('requestId');
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				isLoading: true,
				error: null,
			});
		});
		it('should handle fetchUser.fulfilled', () => {
			const action = fetchUser.fulfilled(mockUser, 'requestId');
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				user: mockUser,
				isAuthChecked: true,
				isLoading: false,
			});
		});
		it('should handle fetchUser.rejected', () => {
			const mockError = 'Ошибка запроса на сервер';
			const action = fetchUser.rejected(
				new Error(mockError),
				'requestId',
				undefined,
				mockError
			);
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				error: mockError,
				isAuthChecked: true,
				isLoading: false,
			});
		});

		it('should handle updateUser.pending', () => {
			const action = updateUser.pending('requestId', mockUserData);
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				isLoading: true,
				error: null,
			});
		});

		it('should handle updateUser.fulfilled', () => {
			const action = updateUser.fulfilled(mockUser, 'requestId', mockUserData);
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				user: mockUser,
				isLoading: false,
				isAuthChecked: true,
				error: null,
			});
		});

		it('should handle updateUser.rejected', () => {
			const errorMessage = 'Ошибка обновления пользователя';
			const action = updateUser.rejected(
				new Error(errorMessage),
				'requestId',
				mockUserData,
				errorMessage
			);
			const state = userSlice.reducer(initialState, action);

			expect(state).toEqual({
				...initialState,
				isLoading: false,
				error: errorMessage,
			});
		});
	});
});
