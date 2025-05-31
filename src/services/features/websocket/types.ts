import { Ingredients, TFeedType } from '../../../types/data-types';

export type TOrderStatus = 'done' | 'created' | 'pending';

export type TOrder = {
	_id: string;
	ingredients: string[];
	status: TOrderStatus;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
};

export type TOrdersData = {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
};

export interface OrderStats {
	total: number;
	totalToday: number;
	done: number[];
	pending: number[];
} /* ! */

export type TWSState = {
	[key in TFeedType]: {
		connected: boolean;
		connecting: boolean;
		error?: Error | null;
		data?: TOrdersData | null;
	};
};

export type WSErrorPayload = {
	name: string;
	message: string;
	eventType: string;
	originalMessage?: string;
	code?: number; // Коды из CloseEvent
	reason?: string; // Причина закрытия
	wasClean?: boolean; // Для close событий
};

export interface ProcessedOrder extends TOrder {
	ingredientsData: (Ingredients | undefined)[];
	totalPrice: number;
}

export type TGroupedIngredient = Ingredients & {
	count: number; // Добавляем новое поле
};
