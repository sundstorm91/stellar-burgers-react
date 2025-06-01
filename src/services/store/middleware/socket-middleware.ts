import { Middleware } from 'redux';

import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

import { RootState } from '../store';
import { refreshToken } from '../../../utils/api-utils';

export type WsActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string> /* WsErrorPayload? | Error*/;
	onMessage: ActionCreatorWithPayload<R>;
	onSend?: ActionCreatorWithPayload<S>;
};

export const socketMiddleware = <R, S>(
	wsActions: WsActions<R, S>,
	withTokenRefresh = false
): Middleware<Record<string, never>, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			disconnect,
			onError,
			onClose,
			onMessage,
			onConnecting,
			onOpen,
			onSend,
		} = wsActions;
		const { dispatch } = store;
		return (next) => (action) => {
			if (connect.match(action)) {
				const { payload: url } = action;
				socket = new WebSocket(url);
				onConnecting && dispatch(onConnecting());

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					onError && dispatch(onError('Error'));
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());
				};

				socket.onmessage = (event) => {
					const { data } = event;

					try {
						const parsedData = JSON.parse(data);

						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							refreshToken()
								.then((refreshData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										refreshData.accessToken.replace('Bearer ', '')
									);
									dispatch(connect(wssUrl.toString()));
								})
								.catch((error) => {
									dispatch(onError((error as Error).message));
								});
							dispatch(disconnect());

							return;
						}

						dispatch(onMessage(parsedData));
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
					return;
				};

				if (socket && onSend?.match(action)) {
					try {
						const data = JSON.stringify(action.payload);
						socket.send(data);
					} catch (error) {
						dispatch(onError((error as Error).message));
					}
				}

				if (socket && disconnect.match(action)) {
					socket.close();
					socket = null;
				}
			}
			next(action);
		};
	};
};
