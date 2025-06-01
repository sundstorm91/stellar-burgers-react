import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IWSActionPayload, TWSState } from './types';
import { wsConnecting } from './actions';

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
	reducers: {
		/* wsConnecting(state, action: PayloadAction<IWSActionPayload>) {
			const { feedType } = action.payload;
			state[feedType] = {
				...state[feedType],
				connecting: true,
				connected: false,
				error: null,
			};
		},
		wsOpen(state, action: PayloadAction<IWSActionPayload>) {
			const { feedType } = action.payload;
			state[feedType] = {
				...state[feedType],
				connecting: false,
				connected: true,
				error: null,
			};
		},
		wsClose(state, action: PayloadAction<IWSActionPayload>) {
			const { feedType } = action.payload;
			state[feedType] = {
				...state[feedType],
				connecting: false,
				connected: false,
				error: null,
				data: null,
			};
		},
		wsError(state, action: PayloadAction<IWSActionPayload>) {
			const { feedType, error } = action.payload;
			state[feedType] = {
				...state[feedType],
				connecting: false,
				connected: false,
				error: error || new Error('Unknown WebSocket error'),
			};
		},
		wsMessage(state, action: PayloadAction<IWSActionPayload>) {
			const { feedType, data } = action.payload;
			state[feedType] = {
				...state[feedType],
				data,
			};
		}, */
	},
	selectors: {
		getFeedDataPublic: (state) => state.public.data,
		getFeedDataPrivate: (state) => state.private.data,
		/* дополнить нужно */
	},
	extraReducers: (builder) => {
		builder.addCase(wsConnecting, (state, action) => {
			state.
		});
	},
});

export const { reducer: wsReducer } = wsSlice;
export const {} = wsSlice.actions;
