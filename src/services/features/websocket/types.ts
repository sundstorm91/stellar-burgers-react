import { TFeedType } from '../../../types/data-types';

export enum OrderFeedActionTypes {
	// Подключение
	WS_CONNECT = 'ORDER_FEED_WS_CONNECT',
	WS_DISCONNECT = 'ORDER_FEED_WS_DISCONNECT',
	WS_SEND = 'ORDER_FEED_WS_SEND',
	// Статусы
	WS_CONNECTING = 'ORDER_FEED_WS_CONNECTING',
	WS_OPEN = 'ORDER_FEED_WS_OPEN',
	WS_CLOSE = 'ORDER_FEED_WS_CLOSE',
	WS_ERROR = 'ORDER_FEED_WS_ERROR',
	// Данные
	WS_MESSAGE = 'ORDER_FEED_WS_MESSAGE',
}

export interface BaseFeedAction {
	meta: {
		feedType: TFeedType;
		authToken?: string;
	};
}

export interface OrderFeedConnectAction extends BaseFeedAction {
	type: OrderFeedActionTypes.WS_CONNECT;
	payload: {
		url: string;
	};
}

export interface OrderFeedDisconnectAction extends BaseFeedAction {
	type: OrderFeedActionTypes.WS_DISCONNECT;
}

export interface OrderFeedSendAction extends BaseFeedAction {
	type: OrderFeedActionTypes.WS_SEND;
	payload: unknown;
}

export interface OrderFeedConnectingAction extends BaseFeedAction {
	type: OrderFeedActionTypes.WS_CONNECTING;
}

export interface OrderFeedOpenAction extends BaseFeedAction {
	type: OrderFeedActionTypes.WS_OPEN;
}

export interface OrderFeedCloseAction extends BaseFeedAction {
	type: OrderFeedActionTypes.WS_CLOSE;
}

export interface OrderFeedErrorAction extends BaseFeedAction {
	type: OrderFeedActionTypes.WS_ERROR;
	payload: Error;
}

export interface OrderFeedMessageAction extends BaseFeedAction {
	type: OrderFeedActionTypes.WS_MESSAGE;
	payload: unknown;
}

export type OrderFeedActions =
	| OrderFeedConnectAction
	| OrderFeedDisconnectAction
	| OrderFeedSendAction
	| OrderFeedConnectingAction
	| OrderFeedOpenAction
	| OrderFeedCloseAction
	| OrderFeedErrorAction
	| OrderFeedMessageAction;
