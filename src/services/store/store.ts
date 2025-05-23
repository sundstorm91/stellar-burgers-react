import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import constructorReducer from '../features/constructor/constructor-slice';
import orderReducer from '../features/create-order/order-slice';
import currentIngredient from '../features/current-ingredient/current-ingredient-slice';
import userReducer from '../features/user/user-slice';
export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		builder: constructorReducer,
		order: orderReducer,
		currentIngredient: currentIngredient,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>; /* ! */
export type AppDispatch = typeof store.dispatch;
