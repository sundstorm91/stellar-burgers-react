import { AppHeader } from '../app-header/app-header';
import { BurgerBuilder } from '../burger-constructor/builder';
import { IngredientList } from '../burger-ingredients/ingredients-list';
import styles from './app.module.css';

export const App: React.FC = () => {
	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<IngredientList />
				<BurgerBuilder />
			</main>
		</>
	);
};
