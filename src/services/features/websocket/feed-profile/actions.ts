import { createAction } from '@reduxjs/toolkit';
import { TOrdersData } from '../types';

// Экшены, которые будут вызываться из компонентов
export const wsConnectProfile = createAction<string, 'WS_CONNECT_PROFILE'>(
	'WS_CONNECT_PROFILE'
);
export const wsDisconnectProfile = createAction<void, 'WS_DISCONNECT_PROFILE'>(
	'WS_DISCONNECT_PROFILE'
);

// Экшены, которые будет диспатчить middleware
export const wsConnectingProfile = createAction<void, 'WS_CONNECTING_PROFILE'>(
	'WS_CONNECTING_PROFILE'
);
export const wsOpenProfile = createAction<void, 'WS_OPEN_PROFILE'>(
	'WS_OPEN_PROFILE'
);
export const wsCloseProfile = createAction<void, 'WS_CLOSE_PROFILE'>(
	'WS_CLOSE_PROFILE'
);
export const wsErrorProfile = createAction<string, 'WS_ERROR_PROFILE'>(
	'WS_ERROR_PROFILE'
);
export const wsMessageProfile = createAction<TOrdersData, 'WS_MESSAGE_PROFILE'>(
	'WS_MESSAGE_PROFILE'
);
