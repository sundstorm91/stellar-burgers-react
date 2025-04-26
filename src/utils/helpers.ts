import { IngredientsApi } from '../types/data-types';

export function getIngredientById(id: string, ingredients: IngredientsApi) {
	return ingredients.data.find((item) => item._id === id);
}

export function isAuthPage(path: string): boolean {
	return [
		'/login',
		'/register',
		'/forgot-password',
		'/reset-password',
	].includes(path);
}
