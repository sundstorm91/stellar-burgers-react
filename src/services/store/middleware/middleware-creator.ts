import { Middleware, MiddlewareAPI } from 'redux';
import { TFeedType } from '../../../types/data-types';
import {
	OrderFeedActions,
	OrderFeedActionTypes,
} from '../../features/websocket/types';
import { AppDispatch, RootState } from '../store';

export const middlewareCreator = (): Middleware => {
	const sockets = new Map<TFeedType, WebSocket>();

	return (store: MiddlewareAPI<AppDispatch, RootState>) =>
		(next) =>
		(action: unknown) => {
			if (!isOrderFeedAction(action)) {
				return next(action);
			}

			const { feedType } = action.meta;
			const socket = sockets.get(feedType);

			switch (action.type) {
				case OrderFeedActionTypes.WS_CONNECT:
					socket?.close();

					const newSocket = new WebSocket(action.payload.url);
					sockets.set(feedType, newSocket);

					newSocket.onopen = () => {
						store.dispatch({
							type: OrderFeedActionTypes.WS_OPEN,
							meta: { feedType },
						});
					};

					newSocket.onmessage = (event) => {
						store.dispatch({
							type: OrderFeedActionTypes.WS_MESSAGE,
							payload: JSON.parse(event.data),
							meta: { feedType },
						});
					};

					newSocket.onclose = () => {
						store.dispatch({
							type: OrderFeedActionTypes.WS_CLOSE,
							meta: { feedType },
						});
						sockets.delete(feedType); // Очищаем ссылку
					};

					newSocket.onerror = () => {
						store.dispatch({
							type: OrderFeedActionTypes.WS_ERROR,
							payload: new Error('WebSocket connection failed'),
							meta: { feedType },
						});
					};
					break;

				case OrderFeedActionTypes.WS_DISCONNECT:
					socket?.close();
					sockets.delete(feedType);
					break;

				case OrderFeedActionTypes.WS_SEND:
					if (socket?.readyState === WebSocket.OPEN) {
						socket.send(JSON.stringify(action.payload));
					}
					break;
			}

			return next(action);
		};
};

function isOrderFeedAction(action: unknown): action is OrderFeedActions {
	return (
		typeof action === 'object' &&
		action !== null &&
		'type' in action &&
		Object.values(OrderFeedActionTypes).includes(
			(action as { type: OrderFeedActionTypes }).type
		)
	);
}

/*
export const middlewareCreator =
	(): Middleware => (store: MiddlewareAPI) => (next) => (action: unknown) => {
		const sockets: Record<TFeedType, WebSocket | null> = {
			public: null,
			private: null,
		};

		// Type guard для проверки OrderFeedActions
		if (!isOrderFeedAction(action)) return next(action);

		const { feedType } = action.meta;

		switch (action.type) {
			case OrderFeedActionTypes.WS_CONNECT: {
				if (sockets[feedType]) sockets[feedType]?.close();

				const { url } = action.payload;
				sockets[feedType] = new WebSocket(url);

				sockets[feedType].onopen = () => {
					store.dispatch({
						type: OrderFeedActionTypes.WS_OPEN,
						meta: { feedType },
					});
				};

				sockets[feedType]!.onmessage = (event) => {
					store.dispatch({
						type: OrderFeedActionTypes.WS_MESSAGE,
						payload: JSON.parse(event.data),
						meta: { feedType },
					});
				};

				sockets[feedType]!.onclose = () => {
					store.dispatch({
						type: OrderFeedActionTypes.WS_CLOSE,
						meta: { feedType },
					});
				};

				sockets[feedType]!.onerror = (error) => {
					store.dispatch({
						type: OrderFeedActionTypes.WS_ERROR,
						payload: new Error(error.type),
						meta: { feedType },
					});
				};

				break;
			}

			case OrderFeedActionTypes.WS_DISCONNECT: {
				if (sockets[feedType]) {
					sockets[feedType]?.close();
					sockets[feedType] = null;
				}
				break;
			}

			case OrderFeedActionTypes.WS_SEND: {
				if (sockets[feedType]?.readyState === WebSocket.OPEN) {
					sockets[feedType]?.send(JSON.stringify(action.payload));
				}
				break;
			}

			default:
				return next(action);
		}
	};

function isOrderFeedAction(action: unknown): action is OrderFeedActions {
	return (
		typeof action === 'object' &&
		action !== null &&
		'type' in action &&
		Object.values(OrderFeedActionTypes).includes((action as any).type)
	);
}
 */
