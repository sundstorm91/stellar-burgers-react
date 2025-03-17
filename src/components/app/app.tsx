import { AppHeader } from '../app-header/app-header';
import { IngredientList } from '../burger-ingredients/ingredients-list';
import { Modal } from '../modal/modal';
import styles from './app.module.css';

export const App: React.FC = () => {
	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<IngredientList />
				<Modal />
			</main>
		</>
	);
};
