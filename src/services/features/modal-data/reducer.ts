// reducers/modalReducer.ts
import { OPEN_MODAL, CLOSE_MODAL, ModalActionTypes } from './action';

interface ModalState {
	isOpen: boolean;
	content: React.ReactNode | null;
}

const initialState: ModalState = {
	isOpen: false,
	content: null,
};

const modalReducer = (state = initialState, action: any): ModalState => {
	switch (action.type) {
		case OPEN_MODAL:
			return {
				...state,
				isOpen: true,
				content: action.payload.content,
			};
		case CLOSE_MODAL:
			return {
				...state,
				isOpen: false,
				content: null,
			};
		default:
			return state;
	}
};

export default modalReducer;
