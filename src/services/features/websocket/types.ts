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
	connected: boolean;
	connecting: boolean;
	error?: string | null;
	data?: TOrdersData | null;
};

export interface IWSConnectPayload {
	url: string;
	feedType: TFeedType;
	accessToken?: string;
}

export interface IWSDisconnectPayload {
	feedType: TFeedType;
}

export interface IWSActionPayload {
	feedType: TFeedType;
	data?: TOrdersData;
	error?: Error;
}

export type WSErrorPayload = {
	name: string;
	message: string;
	eventType: string;
	originalMessage?: string;
	code?: number;
	reason?: string; // Причина закрытия
	wasClean?: boolean;
};

export interface ProcessedOrder extends TOrder {
	ingredientsData: (Ingredients | undefined)[];
	totalPrice: number;
}

export type TGroupedIngredient = Ingredients & {
	count: number; // Добавляем новое поле
};
