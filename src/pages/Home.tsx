import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import styles from './pages.module.css';

export const Home: React.FC = () => {
	return (
		<>
			<main className={styles.main}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</>
	);
};
