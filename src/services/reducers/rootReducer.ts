import { combineReducers } from 'redux';

// Редьюсер списка дел
const todoList = (state, action) => {};

// Редьюсер пользователя приложения
const user = (state, action) => {};

// Редьюсер коллективной работы над списком дел
const collaboration = (state, action) => {};

export const rootReducer = combineReducers({
	todoList,
	user,
	collaboration,
});
