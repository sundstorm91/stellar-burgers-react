import { User } from '../services/features/user/types';

export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

export interface UserData {
	name: string;
	email: string;
	password: string;
}

export interface UpdateUserData {
	name: string;
	email: string;
	password?: string;
}

export interface AuthResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
}

export interface LogoutResponse {
	success: boolean;
	message: string;
}

export interface ApiSuccessResponse {
	success: boolean;
	message: string;
}

export interface RefreshTokenResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
}

export interface GetUserResponse {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
}

export const checkResponse = <T>(res: Response): Promise<T> => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`${res.status}`);
	}
};

export const forgotPassword = async (email: string) => {
	return await fetch(`${ingredientsApiConfig.baseUrl}/password-reset`, {
		method: 'POST',
		headers: ingredientsApiConfig.headers,
		body: JSON.stringify({ email }),
	}).then(checkResponse<ApiSuccessResponse>);
};

export const resetPassword = async (password: string, token: string) => {
	return await fetch(`${ingredientsApiConfig.baseUrl}/password-reset/reset`, {
		method: 'POST',
		headers: ingredientsApiConfig.headers,
		body: JSON.stringify({
			password: `${password}`,
			token: `${token}`,
		}),
	}).then(checkResponse<ApiSuccessResponse>);
};

export const refreshToken = async () => {
	const res = await fetch(`${ingredientsApiConfig.baseUrl}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});

	const refreshData = (await checkResponse(res)) as RefreshTokenResponse;
	if (!refreshData.success) {
		return Promise.reject(refreshData);
	}

	localStorage.setItem('refreshToken', refreshData.refreshToken);
	localStorage.setItem('accessToken', refreshData.accessToken);

	return refreshData;
};

export const fetchWithRefresh = async <T>(
	url: string,
	options: RequestInit
) => {
	try {
		const res = await fetch(url, options);

		// Если статус ответа 403 - токен истёк или недействителен
		if (res.status === 403) {
			throw new Error('token_expired'); // Специальный флаг
		}
		return (await checkResponse(res)) as T;
	} catch (err) {
		// Проверяем, что токен истёк (через статус 403 или сообщение)
		const isTokenExpired =
			err instanceof Error &&
			(err.message === 'token_expired' ||
				err.message.includes('jwt expired') ||
				err.message.includes('403'));

		if (isTokenExpired) {
			try {
				// 1. Обновляем токены
				const refreshData = await refreshToken();

				// 2. Повторяем запрос с новым токеном
				const newOptions = {
					...options,
					headers: {
						...options.headers,
						Authorization: `${refreshData.accessToken}`,
					},
				};

				const retryResponse = await fetch(url, newOptions);
				return (await checkResponse(retryResponse)) as T;
			} catch (refreshError) {
				console.error('Ошибка обновления токена:', refreshError);
				throw new Error('Не удалось обновить токен');
			}
		}

		// Если ошибка не связана с токеном - пробрасываем дальше
		throw err;
	}
};

export const logout = async () => {
	const refreshToken = localStorage.getItem('refreshToken');
	return await fetch(`${ingredientsApiConfig.baseUrl}/auth/logout`, {
		method: 'POST',
		headers: ingredientsApiConfig.headers,
		body: JSON.stringify({ token: refreshToken }),
	}).then(checkResponse<ApiSuccessResponse>);
};

export const register = async (userData: {
	email: string;
	password: string;
	name: string;
}) => {
	return await fetch(`${ingredientsApiConfig.baseUrl}/auth/register`, {
		method: 'POST',
		headers: ingredientsApiConfig.headers,
		body: JSON.stringify(userData),
	}).then(checkResponse<AuthResponse>);
};

export const getUser = async () => {
	const accessToken = localStorage.getItem('accessToken');

	if (!accessToken) {
		throw new Error('Токен доступа не найден');
	}

	try {
		const response = await fetchWithRefresh<GetUserResponse>(
			`${ingredientsApiConfig.baseUrl}/auth/user`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${accessToken}`,
				},
			}
		);

		return response.user;
	} catch (error) {
		console.error('Ошибка в getUser:', error);
		throw error;
	}
};

export const updateUserData = async (data: UpdateUserData): Promise<User> => {
	const accessToken = localStorage.getItem('accessToken');

	if (!accessToken) {
		throw new Error('Токен доступа не найден');
	}

	try {
		const response = await fetchWithRefresh<GetUserResponse>(
			`${ingredientsApiConfig.baseUrl}/auth/user`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${accessToken}`,
				},
				body: JSON.stringify(data),
			}
		);

		if (!response.success) {
			throw new Error('Ошибка обновления данных');
		}

		return response.user;
	} catch (error) {
		console.error('Ошибка в updateUserData:', error);
		throw error;
	}
};
