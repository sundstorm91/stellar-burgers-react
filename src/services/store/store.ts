import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from '@services/reducers/rootReducer';

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

export const configureStore = () => {
	return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};
