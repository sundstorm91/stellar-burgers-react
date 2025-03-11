import modalReducer from '../../services/features/modal-data/reducer';
import { orderReducer } from '../../services/features/create-order/reducer';
import { reducerApi } from '../features/ingredients/reducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { burgerConstructorReducer } from '../../services/features/constructor/reducer';

// Define the type for the Redux DevTools extension
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers =
	(process.env.NODE_ENV === 'development' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const rootReducer = combineReducers({
	api: reducerApi,
	createOrder: orderReducer,
	modal: modalReducer,
	burgerConstructor: burgerConstructorReducer,
});

export const configureStore = () => {
	return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};
