// actions/types.ts
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

interface OpenModalAction {
	type: typeof OPEN_MODAL;
	payload: {
		content: React.ReactNode; // Content to display in the modal
	};
}

interface CloseModalAction {
	type: typeof CLOSE_MODAL;
}

export type ModalActionTypes = OpenModalAction | CloseModalAction;

export const openModal = (content: React.ReactNode) => ({
	type: OPEN_MODAL,
	payload: { content },
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
});
