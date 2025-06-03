import { createSlice } from '@reduxjs/toolkit';

import { TWSState } from '../types';
import { wsConnectingPublic, wsErrorPublic, wsMessagePublic } from './actions';

const initialState: TWSState = {
	connected: false,
	connecting: false,
	data: null,
	error: null,
};

const feedPublicSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {},
	selectors: {
		getFeedData: (state) => state.data,
	},
	extraReducers: (builder) => {
		builder
			.addCase(wsConnectingPublic, (state) => {
				state.connecting = true;
				state.error = null;
			})
			.addCase(wsErrorPublic, (state, action) => {
				state.error = action.payload;
			})
			.addCase(wsMessagePublic, (state, action) => {
				state.data = action.payload;
			});
	},
});

export const { reducer: feedPublicReducer } = feedPublicSlice;
