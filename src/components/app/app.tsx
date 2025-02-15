import { AppHeader } from '../app-header/app-header';
import { BurgerBuilder } from '../burger-constructor/burger-builder';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

export const App = () => {
	return (
		<>
			<AppHeader />
			<main>
				<BurgerIngredients />
				<BurgerBuilder />
			</main>
		</>
	);
};
