import { TOrderStatus } from '../services/features/websocket/types';
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

export const getStatusText = (status: TOrderStatus): string => {
	const statusMap: Record<TOrderStatus, string> = {
		done: 'Выполнен',
		created: 'Создан',
		pending: 'Готовится',
	};
	return statusMap[status];
};
