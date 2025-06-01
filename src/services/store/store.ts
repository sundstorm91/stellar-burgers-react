import { combineSlices, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import constructorReducer from '../features/constructor/constructor-slice';
import orderReducer from '../features/create-order/order-slice';
import currentIngredient from '../features/current-ingredient/current-ingredient-slice';
import userReducer from '../features/user/user-slice';
import { socketMiddleware } from './middleware/socket-middleware';
import { wsReducer } from '../features/websocket/ws-slice';
import {
	wsConnect as connect,
	wsClose as onClose,
	wsConnecting as onConnecting,
	wsDisconnect as disconnect,
	wsError as onError,
	wsMessage as onMessage,
	wsOpen as onOpen,
} from '../features/websocket/actions';

const websocketMiddleware = socketMiddleware({
	connect,
	disconnect,
	onConnecting,
	onClose,
	onError,
	onMessage,
	onOpen,
});

/* убрать редьюсеры! */
const rootReducer = combineSlices({
	ingredients: ingredientsReducer,
	builder: constructorReducer,
	order: orderReducer,
	currentIngredient: currentIngredient,
	user: userReducer,
	websocket: wsReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(websocketMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>; /* ! */
export type AppDispatch = typeof store.dispatch;
