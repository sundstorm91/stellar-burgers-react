import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

const selectBuilder = (state: RootState) => state.builder;

export const selectOrderIngredients = createSelector(
	[selectBuilder],
	(builder) => {
		const { bun, ingredients } = builder;
		const orderIngredients: string[] = [];

		if (bun) {
			orderIngredients.push(bun._id); // Top bun
		}

		ingredients.forEach((ingredient) => {
			orderIngredients.push(ingredient._id); // Sauces and toppings
		});

		if (bun) {
			orderIngredients.push(bun._id); // Bottom bun
		}

		return orderIngredients;
	}
);

export const selectTotalPrice = createSelector(
	(state: RootState) => state.builder,
	(burgerConstructor): number => {
		const { bun, ingredients } = burgerConstructor;

		let total = 0;

		if (bun) {
			total += bun.price * 2;
		}

		ingredients.forEach((item) => {
			total += item.price;
		});

		return total;
	}
);
