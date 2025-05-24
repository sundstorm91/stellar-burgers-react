import { Middleware, MiddlewareAPI } from 'redux';
import { TFeedType } from '../../../types/data-types';

import { AppDispatch, RootState } from '../store';
import {
	wsClose,
	wsConnect,
	wsDisconnect,
	wsError,
	wsMessage,
	wsOpen,
	wsSend,
} from '../../features/websocket/actions';

export const middlewareCreator = (): Middleware => {
	const sockets = new Map<TFeedType, WebSocket>();

	return (store: MiddlewareAPI<AppDispatch, RootState>) =>
		(next) =>
		(action: unknown) => {
			// Проверяем, является ли action одним из наших ws-экшенов
			if (
				!isAction(action) ||
				(!wsConnect.match(action) &&
					!wsDisconnect.match(action) &&
					!wsSend.match(action))
			) {
				return next(action as never); // Приводим к never, если action не наш
			}

			const { feedType } = action.meta;
			const socket = sockets.get(feedType);

			if (wsConnect.match(action)) {
				socket?.close();

				const { url } = action.payload;
				const { authToken } = action.meta;

				const finalUrl =
					feedType === 'private' && authToken
						? `${url}?token=${authToken}`
						: url;

				const newSocket = new WebSocket(finalUrl);
				sockets.set(feedType, newSocket);

				newSocket.onopen = () => store.dispatch(wsOpen(feedType));
				newSocket.onmessage = (event) => handleMessage(event, feedType, store);
				newSocket.onclose = () => handleClose(feedType, store, sockets);
				newSocket.onerror = (event) => handleError(event, feedType, store);
			}

			if (wsDisconnect.match(action)) {
				socket?.close();
				sockets.delete(feedType);
			}

			if (wsSend.match(action) && socket?.readyState === WebSocket.OPEN) {
				socket.send(JSON.stringify(action.payload));
			}

			return next(action);
		};
};

const handleClose = (
	feedType: TFeedType,
	store: MiddlewareAPI<AppDispatch, RootState>,
	sockets: Map<TFeedType, WebSocket>
) => {
	store.dispatch(wsClose(feedType));
	sockets.delete(feedType);
};

const handleError = (
	event: Event,
	feedType: TFeedType,
	store: MiddlewareAPI<AppDispatch, RootState>
) => {
	const error = new Error('WebSocket error');
	if ('message' in event) error.message = String(event.message);
	store.dispatch(wsError(feedType, error));
};

// Type guard для проверки, что action имеет meta с feedType
function isAction(
	action: unknown
): action is { meta: { feedType: TFeedType } } {
	return (
		(typeof action === 'object' &&
			action !== null &&
			'meta' in action &&
			typeof (action as { meta: unknown }).meta === 'object' &&
			(action as { meta: { feedType?: unknown } }).meta?.feedType ===
				'public') ||
		(action as { meta: { feedType?: unknown } }).meta?.feedType === 'private'
	);
}

const handleMessage = (
	event: MessageEvent,
	feedType: TFeedType,
	store: MiddlewareAPI<AppDispatch, RootState>
) => {
	try {
		const data = JSON.parse(event.data);
		store.dispatch(wsMessage({ feedType, data }));
	} catch (err) {
		const error =
			err instanceof Error
				? err
				: new Error('Failed to parse WebSocket message');
		store.dispatch(wsError(feedType, error));
	}
};
