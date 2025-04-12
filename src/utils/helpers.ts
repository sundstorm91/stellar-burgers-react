import { IngredientsApi } from '../types/data-types';

export function getIngredientById(id: string, ingredients: IngredientsApi) {
	return ingredients.data.find((item) => item._id === id);
}
