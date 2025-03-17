import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
	isOpen: boolean;
	content: React.ReactNode | null;
}

const initialState: ModalState = {
	isOpen: false,
	content: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<React.ReactNode>) => {
			state.isOpen = true;
			state.content = action.payload;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.content = null;
		},
	},
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
