import { createSlice } from '@reduxjs/toolkit';

import { TWSState } from './types';
import { wsConnecting, wsError, wsMessage } from './actions';

const initialState: TWSState = {
	connected: false,
	connecting: false,
	data: null,
	error: null,
};

const wsSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {},
	selectors: {
		getFeedData: (state) => state.data,
		/* дополнить нужно */
	},
	extraReducers: (builder) => {
		builder
			.addCase(wsConnecting, (state) => {
				state.connecting = true;
				state.error = null;
			})
			.addCase(wsError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(wsMessage, (state, action) => {
				state.data = action.payload;
			});
	},
});

export const { reducer: wsReducer } = wsSlice;
