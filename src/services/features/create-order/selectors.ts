import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

const selectBuilder = (state: RootState) => state.builder;

export const selectOrderIngredients = createSelector(
	[selectBuilder],
	(builder) => {
		const { bun, ingredients } = builder;
		const orderIngredients: string[] = [];

		if (bun) {
			orderIngredients.push(bun._id);
		}

		ingredients.forEach((ingredient) => {
			orderIngredients.push(ingredient._id);
		});

		if (bun) {
			orderIngredients.push(bun._id);
		}

		return orderIngredients;
	}
);

export const selectTotalPrice = createSelector([selectBuilder], (builder) => {
	const { bun, ingredients } = builder;

	let total = 0;

	if (bun) {
		total += bun.price * 2;
	}

	ingredients.forEach((item) => {
		total += item.price;
	});

	return total;
});
