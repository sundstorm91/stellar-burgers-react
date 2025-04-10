import { Route, Routes } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { Home } from '../../pages/Home';

export const App: React.FC = () => {
	return (
		<>
			<AppHeader />
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</>
	);
};
