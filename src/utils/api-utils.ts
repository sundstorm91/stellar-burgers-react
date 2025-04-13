import { User } from '../services/features/user/types';

export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

export interface UpdateUserData {
	name?: string;
	email?: string;
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

export const checkResponse = (res: Response) => {
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
	}).then(checkResponse);
};

export const resetPassword = async (password: string, token: string) => {
	return await fetch(`${ingredientsApiConfig.baseUrl}/password-reset/reset`, {
		method: 'POST',
		headers: ingredientsApiConfig.headers,
		body: JSON.stringify({
			password: `${password}`,
			token: `${token}`,
		}),
	}).then(checkResponse);
};

export const refreshToken = () => {
	return fetch(`${ingredientsApiConfig.baseUrl}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkResponse)

		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err) {
		if ((err as Error).message === 'jwt expired') {
			const refreshData = await refreshToken();
			const newOptions = {
				...options,
				headers: {
					...options.headers,
					authorization: `Bearer ${refreshData.accessToken}`,
				},
			};

			const res = await fetch(url, newOptions);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const login = async (credential: {
	email: string;
	password: string;
}) => {
	const response = await fetch(`${ingredientsApiConfig.baseUrl}/auth/login`, {
		method: 'POST',
		headers: ingredientsApiConfig.headers,
		body: JSON.stringify(credential),
	});
	return checkResponse(response);
};

export const logout = async (): Promise<LogoutResponse> => {
	const refreshToken = localStorage.getItem('refreshToken');
	return (await fetch(`${ingredientsApiConfig.baseUrl}/auth/logout`, {
		method: 'POST',
		headers: ingredientsApiConfig.headers,
		body: JSON.stringify({ token: refreshToken }),
	}).then(checkResponse)) as LogoutResponse;
};

export const getUser = async (): Promise<User> => {
	const accessToken = localStorage.getItem('accessToken');

	if (!accessToken) {
		localStorage.removeItem('refreshToken');
		throw new Error('No access token available');
	}

	try {
		const response = await fetchWithRefresh(
			`${ingredientsApiConfig.baseUrl}/auth/user`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return response.user;
	} catch (error) {
		if (
			(error as Error).message.includes('404') ||
			(error as Error).message.includes('User not found')
		) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			throw new Error('User not found - session cleared');
		}

		if (
			(error as Error).message.includes('401') ||
			(error as Error).message.includes('403')
		) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			throw new Error('Authorization failed - session cleared');
		}

		throw error;
	}
};

export const updateUser = async (userData: UpdateUserData): Promise<User> => {
	const accessToken = localStorage.getItem('accessToken');

	if (!accessToken) {
		throw new Error('Требуется авторизация');
	}

	try {
		const response = await fetch(`${ingredientsApiConfig.baseUrl}/auth/user`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(userData),
		});

		const data = await checkResponse(response);
		return data.user;
	} catch (error) {
		if (
			(error as Error).message.includes('401') ||
			(error as Error).message.includes('403')
		) {
			// Очищаем токены при ошибках авторизации
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			throw new Error('Сессия истекла - требуется повторный вход');
		}
		throw error;
	}
};
