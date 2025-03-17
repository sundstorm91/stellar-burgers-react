import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import modalReducer from '../features/modal-control/modal-slice';
export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		modal: modalReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>; /* ! */
export type AppDispatch = typeof store.dispatch;
