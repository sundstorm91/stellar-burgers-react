import { createAction } from '@reduxjs/toolkit';
import { TOrdersData } from '../types';

// Экшены, которые будут вызываться из компонентов
export const wsConnectPublic = createAction<string, 'WS_CONNECT_PUBLIC'>(
	'WS_CONNECT_PUBLIC'
);
export const wsDisconnectPublic = createAction<void, 'WS_DISCONNECT_PUBLIC'>(
	'WS_DISCONNECT_PUBLIC'
);

// Экшены, которые будет диспатчить middleware
export const wsConnectingPublic = createAction<void, 'WS_CONNECTING_PUBLIC'>(
	'WS_CONNECTING_PUBLIC'
);
export const wsOpenPublic = createAction<void, 'WS_OPEN_PUBLIC'>(
	'WS_OPEN_PUBLIC'
);
export const wsClosePublic = createAction<void, 'WS_CLOSE_PUBLIC'>(
	'WS_CLOSE_PUBLIC'
);
export const wsErrorPublic = createAction<string, 'WS_ERROR_PUBLIC'>(
	'WS_ERROR_PUBLIC'
);
export const wsMessagePublic = createAction<TOrdersData, 'WS_MESSAGE_PUBLIC'>(
	'WS_MESSAGE_PUBLIC'
);
