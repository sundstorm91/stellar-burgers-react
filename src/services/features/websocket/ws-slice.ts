import { createSlice } from '@reduxjs/toolkit';
import { TFeedType } from '../../../types/data-types';
import {
	wsClose,
	wsConnect,
	wsConnecting,
	wsError,
	wsMessage,
	wsOpen,
} from '../../features/websocket/actions';
import { TOrdersData, TWSState } from './types';
export type TStatusWsLink =
	| 'connecting'
	| 'connected'
	| 'error'
	| 'disconnected';

const initialState: TWSState = {
	public: {
		connected: false,
		connecting: false,
		error: null,
		data: null,
	},
	private: {
		connected: false,
		connecting: false,
		error: null,
		data: null,
	},
};

const wsSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// подключение
			.addCase(wsConnect, (state, action) => {
				const { feedType } = action.meta;
				state[feedType].connecting = true;
				state[feedType].error = null;
			})
			// успешное подключение
			.addCase(wsOpen, (state, action) => {
				const { feedType } = action.meta;
				state[feedType].connected = true;
				state[feedType].connecting = false;
			})
			// закрытие соединения
			.addCase(wsClose, (state, action) => {
				const { feedType } = action.meta;
				state[feedType] = initialState[feedType];
			})
			// обработка ошибок
			.addCase(wsError, (state, action) => {
				const { feedType } = action.meta;
				state[feedType].error = action.payload;
				state[feedType].connecting = false;
				state[feedType].connected = false;
			})

			// обработка входящих сообщений

			.addCase(wsMessage, (state, action) => {
				// Проверяем только payload (данные заказов)
				if (
					typeof action.payload === 'object' &&
					action.payload !== null &&
					'orders' in action.payload
				) {
					const { feedType } = action.meta; // feedType берём из meta
					const data = action.payload as TOrdersData;

					state[feedType].data = data;
					console.log('Data saved to Redux:', { feedType, data }); // Логируем
				} else {
					console.error('Invalid wsMessage payload:', action.payload);
				}
			})

			// Обработка состояния "connecting"
			.addCase(wsConnecting, (state, action) => {
				const { feedType } = action.meta;
				state[feedType].connecting = true;
			});
	},
});

export default wsSlice.reducer;
