import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import constructorReducer from '../features/constructor/constructor-slice';
import orderReducer from '../features/create-order/order-slice';
import currentIngredient from '../features/current-ingredient/current-ingredient-slice';
import userReducer from '../features/user/user-slice';
import { middlewareCreator } from './middleware/middleware-creator';
import wsReducer from '../features/websocket/ws-slice';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		builder: constructorReducer,
		order: orderReducer,
		currentIngredient: currentIngredient,
		user: userReducer,
		websocket: wsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middlewareCreator()),
});

export type RootState = ReturnType<typeof store.getState>; /* ! */
export type AppDispatch = typeof store.dispatch;
