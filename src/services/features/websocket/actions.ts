import { createAction } from '@reduxjs/toolkit';
import { TOrdersData } from './types';

// Экшены, которые будут вызываться из компонентов
export const wsConnect = createAction<string, 'WS_CONNECT'>('WS_CONNECT');
export const wsDisconnect = createAction<void, 'WS_DISCONNECT'>(
	'WS_DISCONNECT'
);

// Экшены, которые будет диспатчить middleware
export const wsConnecting = createAction<void, 'WS_CONNECTING'>(
	'WS_CONNECTING'
);
export const wsOpen = createAction<void, 'WS_OPEN'>('WS_OPEN');
export const wsClose = createAction<void, 'WS_CLOSE'>('WS_CLOSE');
export const wsError = createAction<string, 'WS_ERROR'>('WS_ERROR');
export const wsMessage = createAction<TOrdersData, 'WS_MESSAGE'>('WS_MESSAGE');
