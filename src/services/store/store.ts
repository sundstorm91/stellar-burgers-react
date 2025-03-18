import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import modalReducer from '../features/modal-control/modal-slice';
import constructorReducer from '../features/constructor/constructor-slice';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		modal: modalReducer,
		builder: constructorReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>; /* ! */
export type AppDispatch = typeof store.dispatch;
