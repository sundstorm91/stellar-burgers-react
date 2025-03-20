import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterItem {
	id: string | null;
	count: 0 | number;
}

export interface CounterState {
	counters: CounterItem[];
	counter: CounterItem;
}
const initialState: CounterState = {
	counters: [],
	counter: {
		count: 0,
		id: null,
	},
};

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		plus: (state, action: PayloadAction<{ id: string }>) => {
			const { id: outerId } = action.payload;
			const current = state.counters.find((item) => outerId === item.id);
			const obj = {
				id: null,
				count: 0,
			};

			if (!current) {
				state.counters.push(obj);
			} else {
				if (current) {
					state.counters
						.filter((item) => outerId === item.id)
						.map((item) => (item.count += 1));
				}
			}
		},
		minus: (state, action) => {},
	},
});

export const { plus, minus } = counterSlice.actions;
export default counterSlice.reducer;
