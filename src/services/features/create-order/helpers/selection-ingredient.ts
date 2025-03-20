import { RootState } from '../../../store/store';

export const selectionIngredientId = (state: RootState) => {
	const { bun, ingredients } = state.builder;

	const orderIngredients: Array<string> = [];

	if (bun) {
		orderIngredients.push(bun._id);
	}

	ingredients.forEach((item) => {
		orderIngredients.push(item._id);
	});

	if (bun) {
		orderIngredients.push(bun._id);
	}

	return orderIngredients;
};
