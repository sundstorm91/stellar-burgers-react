import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './types';
import {
	AuthResponse,
	fetchWithRefresh,
	forgotPassword,
	getUser,
	ingredientsApiConfig,
	logout,
	register,
	resetPassword,
	updateUserData,
	UpdateUserData,
	UserData,
} from '../../../utils/api-utils';

export const initialState: UserState = {
	user: null,
	isAuthChecked: false,
	isLoading: false,
	error: null,
	passwordReset: {
		wasRequested: false,
		email: '',
	},
};

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface ResetPasswordProps {
	password: string;
	token: string;
}

export const loginUser = createAsyncThunk(
	'auth/login',
	async (credentials: LoginCredentials, { rejectWithValue }) => {
		try {
			const response = await fetchWithRefresh<AuthResponse>(
				`${ingredientsApiConfig.baseUrl}/auth/login`,
				{
					method: 'POST',
					headers: ingredientsApiConfig.headers,
					body: JSON.stringify(credentials),
				}
			);

			localStorage.setItem('accessToken', response.accessToken);
			localStorage.setItem('refreshToken', response.refreshToken);

			return response.user;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : error);
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/register',
	async (userData: UserData, { rejectWithValue }) => {
		try {
			const res: AuthResponse = await register(userData);
			localStorage.setItem('accessToken', res.accessToken);
			localStorage.setItem('refreshToken', res.refreshToken);
			return res.user;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : error);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			await logout();

			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			return null; // Успешный выход
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : error);
		}
	}
);

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			return await getUser();
		} catch (error) {
			if (
				error instanceof Error &&
				error.message === 'Failed to refresh token'
			) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
			}

			return rejectWithValue(
				error instanceof Error ? error.message : 'Unknown error'
			);
		}
	}
);

export const updateUser = createAsyncThunk<
	User,
	UpdateUserData,
	{ rejectValue: string }
>('user/updateUser', async (userData, { rejectWithValue }) => {
	try {
		return await updateUserData(userData); // Вызываем API-функцию
	} catch (error) {
		if (
			error instanceof Error &&
			(error.message.includes('jwt expired') || error.message.includes('403'))
		) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		}
		return rejectWithValue(
			error instanceof Error ? error.message : 'Ошибка обновления'
		);
	}
});

export const requestPasswordReset = createAsyncThunk(
	'auth/requestPasswordReset',
	async (email: string, { rejectWithValue }) => {
		try {
			return await forgotPassword(email);
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Unknown error'
			);
		}
	}
);

export const confirmPasswordReset = createAsyncThunk(
	'auth/confirmPasswordReset',
	async (sendData: ResetPasswordProps, { rejectWithValue }) => {
		try {
			return await resetPassword(sendData.password, sendData.token);
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Unknown error'
			);
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
		resetAuthState(state) {
			state.user = null;
			state.isAuthChecked = false; // сбрасываем флаг
			state.isLoading = false;
			state.error = null;

			state.passwordReset.wasRequested = false;
			state.passwordReset.email = '';
		},
		setPasswordResetRequested: (
			state,
			action: PayloadAction<{ email: string }>
		) => {
			state.passwordReset.wasRequested = true;
			state.passwordReset.email = action.payload.email;
		},
		resetPasswordResetState: (state) => {
			state.passwordReset.wasRequested = false;
			state.passwordReset.email = '';
		},
	},
	selectors: {
		getUserSelector: (state) => state.user,
		getIsAuthCheckedSelector: (state) => state.isAuthChecked,
		getIsLoadingSelector: (state) => state.isLoading,
		getErrorSelector: (state) => state.error,
		getIsAuthenticatedSelector: (state) => {
			return (
				state.isAuthChecked &&
				state.user !== null &&
				localStorage.getItem('accessToken') !== null
			);
		},
		getWasPasswordResetRequested: (state) => state.passwordReset.wasRequested,
		getPasswordResetEmail: (state) => state.passwordReset.email,
	},
	extraReducers: (builder) => {
		builder
			/* login */
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.user = action.payload;
				state.isLoading = false;
				state.isAuthChecked = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			/* logout */
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.isAuthChecked = true; // Для избежания зависания
				state.isLoading = false;
			})

			/* register */
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.user = action.payload;
				state.isLoading = false;
				state.isAuthChecked = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			/* fetchUser! */
			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.user = action.payload;
				state.isLoading = false;
				state.isAuthChecked = true;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthChecked = true; // !Для завершения проверки
				state.user = null;
				state.error = action.payload as string;
			})

			/* update */
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})

			.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.user = action.payload;
				state.isAuthChecked = true;
			})

			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			/* access for reset-password! */
			.addCase(requestPasswordReset.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(requestPasswordReset.fulfilled, (state, action) => {
				state.isLoading = false;
				state.passwordReset.wasRequested = true;
				state.passwordReset.email = action.meta.arg; /* ???? */
			})
			.addCase(requestPasswordReset.rejected, (state) => {
				state.isLoading = true;
				state.error = null;
			});
	},
});

/* addmatchers для обработки ошибок! */

export const {
	setUser,
	setIsAuthChecked,
	clearError,
	resetAuthState,
	resetPasswordResetState,
	setPasswordResetRequested,
} = userSlice.actions;
export default userSlice.reducer;
export const {
	getErrorSelector,
	getIsAuthCheckedSelector,
	getIsAuthenticatedSelector,
	getIsLoadingSelector,
	getUserSelector,
	getPasswordResetEmail,
	getWasPasswordResetRequested,
} = userSlice.selectors;
