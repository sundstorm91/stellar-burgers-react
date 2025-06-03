import { combineSlices, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import constructorReducer from '../features/constructor/constructor-slice';
import orderReducer from '../features/create-order/order-slice';
import currentIngredient from '../features/current-ingredient/current-ingredient-slice';
import userReducer from '../features/user/user-slice';
import { socketMiddleware } from './middleware/socket-middleware';
import { feedPublicReducer } from '../features/websocket/feed-public/feed-public-slice';
import { feedProfileReducer } from '../features/websocket/feed-profile/feed-profile-slice';
import {
	wsConnectPublic,
	wsClosePublic,
	wsConnectingPublic,
	wsDisconnectPublic,
	wsErrorPublic,
	wsMessagePublic,
	wsOpenPublic,
} from '../features/websocket/feed-public/actions';
import {
	wsConnectProfile,
	wsCloseProfile,
	wsConnectingProfile,
	wsDisconnectProfile,
	wsErrorProfile,
	wsMessageProfile,
	wsOpenProfile,
} from '../features/websocket/feed-profile/actions';

const feedPublicMiddleware = socketMiddleware({
	connect: wsConnectPublic,
	disconnect: wsDisconnectPublic,
	onConnecting: wsConnectingPublic,
	onClose: wsClosePublic,
	onError: wsErrorPublic,
	onMessage: wsMessagePublic,
	onOpen: wsOpenPublic,
});

const feedProfileMiddleware = socketMiddleware({
	connect: wsConnectProfile,
	disconnect: wsDisconnectProfile,
	onConnecting: wsConnectingProfile,
	onClose: wsCloseProfile,
	onError: wsErrorProfile,
	onMessage: wsMessageProfile,
	onOpen: wsOpenProfile,
});

const rootReducer = combineSlices({
	ingredients: ingredientsReducer,
	builder: constructorReducer,
	order: orderReducer,
	currentIngredient: currentIngredient,
	user: userReducer,
	wsPublicFeed: feedPublicReducer,
	wsProfileFeed: feedProfileReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(feedPublicMiddleware, feedProfileMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>; /* ! */
export type AppDispatch = typeof store.dispatch;
