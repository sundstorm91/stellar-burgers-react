import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
	isOpen: boolean;
	ingredientId: string | null;
}

const initialState: ModalState = {
	isOpen: false,
	ingredientId: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<string>) => {
			state.isOpen = true;
			state.ingredientId = action.payload;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.ingredientId = null;
		},
	},
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
