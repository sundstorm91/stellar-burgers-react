import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './types';
import {
	AuthResponse,
	fetchWithRefresh,
	getUser,
	ingredientsApiConfig,
	logout,
	register,
	updateUserData,
	UpdateUserData,
	UserData,
} from '../../../utils/api-utils';

const initialState: UserState = {
	user: null,
	isAuthChecked: false,
	isLoading: false,
	error: null,
};

interface LoginCredentials {
	email: string;
	password: string;
}

export const loginUser = createAsyncThunk(
	'auth/login',
	async (credentials: LoginCredentials, { rejectWithValue }) => {
		try {
			const response = (await fetchWithRefresh(
				`${ingredientsApiConfig.baseUrl}/auth/login`,
				{
					method: 'POST',
					headers: ingredientsApiConfig.headers,
					body: JSON.stringify(credentials),
				}
			)) as AuthResponse;

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
			// Очищаем токены при ошибках аутентификации
			if (
				error instanceof Error &&
				(error.message.includes('403') ||
					error.message.includes('jwt') ||
					error.message.includes('token'))
			) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
			}
			return rejectWithValue(
				error instanceof Error ? error.message : 'Неизвестная ошибка'
			);
		}
	}
);

export const updateUser = createAsyncThunk<
	User, // Тип возвращаемого значения при успехе
	UpdateUserData, // Тип входного параметра
	{ rejectValue: string } // Тип ошибки
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
				state.isAuthChecked = false;
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
			});
	},
});

/* addmatchers для обработки ошибок! */

export const { setUser, setIsAuthChecked, clearError, resetAuthState } =
	userSlice.actions;
export default userSlice.reducer;
export const {
	getErrorSelector,
	getIsAuthCheckedSelector,
	getIsAuthenticatedSelector,
	getIsLoadingSelector,
	getUserSelector,
} = userSlice.selectors;
