import { createAction } from '@reduxjs/toolkit';
import { TFeedType } from '../../../types/data-types';
import { TOrdersData } from './types';

export const wsOpen = createAction(
	'WS_OPEN',
	(
		feedType: TFeedType
	): {
		payload: undefined;
		meta: { feedType: TFeedType };
	} => ({
		payload: undefined,
		meta: { feedType },
	})
);

export const wsClose = createAction(
	'WS_CLOSE',
	(
		feedType: TFeedType
	): {
		payload: undefined;
		meta: { feedType: TFeedType };
	} => ({
		payload: undefined,
		meta: { feedType },
	})
);

export const wsConnecting = createAction(
	'WS_CONNECTING',
	(
		feedType: TFeedType
	): {
		payload: undefined;
		meta: { feedType: TFeedType };
	} => ({
		payload: undefined,
		meta: { feedType },
	})
);

export const wsConnect = createAction(
	'WS_CONNECT',
	(params: { url: string; feedType: TFeedType; authToken?: string }) => ({
		payload: {
			url: params.url,
		},
		meta: {
			feedType: params.feedType,
			...(params.feedType === 'private' ? { authToken: params.authToken } : {}),
		},
	})
);

export const wsDisconnect = createAction(
	'WS_DISCONNECT',
	(
		feedType: TFeedType
	): {
		payload: undefined;
		meta: { feedType: TFeedType };
	} => ({
		payload: undefined,
		meta: { feedType },
	})
);

export const wsSend = createAction(
	'WS_SEND',
	<T>(params: { feedType: TFeedType; data: T }) => ({
		payload: params.data,
		meta: {
			feedType: params.feedType,
		},
	})
);

export const wsMessage = createAction(
	'WS_MESSAGE',
	(params: { feedType: TFeedType; data: TOrdersData }) => ({
		payload: params.data,
		meta: { feedType: params.feedType },
	})
);

export const wsError = createAction(
	'WS_ERROR',
	(
		feedType: TFeedType,
		error: Error
	): {
		payload: Error;
		meta: { feedType: TFeedType };
	} => ({
		payload: error,
		meta: { feedType },
	})
);
