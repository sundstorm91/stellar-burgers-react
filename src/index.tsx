import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import './styles.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { store } from './services/store/store';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<HashRouter basename='/stellar-burgers-react'>
			<Provider store={store}>
				<DndProvider backend={HTML5Backend}>
					<App />
				</DndProvider>
			</Provider>
		</HashRouter>
	</StrictMode>
);
