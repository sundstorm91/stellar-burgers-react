export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

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
