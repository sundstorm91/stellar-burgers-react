import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './types';
import { getUser, login, logout } from '../../../utils/api-utils';

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
	'user/login',
	async (credentials: LoginCredentials, { rejectWithValue }) => {
		try {
			const res = await login(credentials);

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
			return rejectWithValue(error instanceof Error ? error.message : error);
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
	},
	selectors: {
		selectUser: (state) => state.user,
		selectIsAuthChecked: (state) => state.isAuthChecked,
		selectIsLoading: (state) => state.isLoading,
		selectError: (state) => state.error,
		selectIsAuthenticated: (state) => state.user !== null,
	},
	extraReducers: (builder) => {
		builder
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

			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
			})

			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUser.fulfilled, (state) => {
				state.isLoading = false;
			});
	},
});

export const { setUser, setIsAuthChecked, clearError } = userSlice.actions;
export default userSlice.reducer;
