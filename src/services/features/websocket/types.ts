import { TFeedType } from '../../../types/data-types';

export type TOrder = {
	_id: string;
	ingredients: string[];
	status: 'created' | 'pending' | 'done';
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
