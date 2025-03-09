import { AppHeader } from '../app-header/app-header';
/* import { BurgerBuilder } from '../burger-constructor/burger-builder'; */
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import HomePage from '../modal/content';
import ModalProba from '../modal/proba-modalka';
import styles from './app.module.css';

export const App: React.FC = () => {
	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients />
				<ModalProba />
				{/* <BurgerBuilder data={ingredients.data} /> */}
			</main>
		</>
	);
};
