import { initialState, feedProfileSlice } from './feed-profile-slice';
import {
	wsConnectingProfile,
	wsErrorProfile,
	wsMessageProfile,
} from './actions';
import { UnknownAction } from 'redux';
import { TOrder, TOrdersData } from '../types';
describe('websocketSlice extraReducers', () => {
	const mockData: TOrdersData = {
		orders: [
			{
				_id: 'randomId_123',
				createdAt: '00:00',
				ingredients: ['id_1', 'id_2', 'id_3'],
				name: 'random-order',
				number: 79445,
				status: 'done',
				updatedAt: '00:07',
			},
			{
				_id: 'randomId_456',
				createdAt: '01:00',
				ingredients: ['id_5', 'id_6', 'id_7'],
				name: 'random-order2',
				number: 79446,
				status: 'done',
				updatedAt: '01:07',
			},
		] as TOrder[],
		success: true,
		total: 5,
		totalToday: 2,
	};
	it('should handle wsConnectingProfile(pending)', () => {
		const action = wsConnectingProfile;
		const state = feedProfileSlice.reducer(
			initialState,
			action as unknown as UnknownAction
		);
		expect(state).toEqual({
			...initialState,
			connecting: true,
			error: null,
		});
	});

	it('should handle wsErrorProfile (connection error)', () => {
		const errorMessage = 'Connection failed';
		const action = wsErrorProfile(errorMessage);
		const state = feedProfileSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			error: errorMessage,
		});
	});

	it('should handle wsMessageProfile (incoming message)', () => {
		const action = wsMessageProfile(mockData);
		const state = feedProfileSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			data: mockData,
		});
	});
});
