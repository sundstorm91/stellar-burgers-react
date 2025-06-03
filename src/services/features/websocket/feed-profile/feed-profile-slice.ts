import { createSlice } from '@reduxjs/toolkit';

import { TWSState } from '../types';
import {
	wsConnectingProfile,
	wsErrorProfile,
	wsMessageProfile,
} from './actions';

const initialState: TWSState = {
	connected: false,
	connecting: false,
	data: null,
	error: null,
};

const feedProfileSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {},
	selectors: {
		getFeedData: (state) => state.data,
	},
	extraReducers: (builder) => {
		builder
			.addCase(wsConnectingProfile, (state) => {
				state.connecting = true;
				state.error = null;
			})
			.addCase(wsErrorProfile, (state, action) => {
				state.error = action.payload;
			})
			.addCase(wsMessageProfile, (state, action) => {
				state.data = action.payload;
			});
	},
});

export const { reducer: feedProfileReducer } = feedProfileSlice;
