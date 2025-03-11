import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import './styles.css';
import { Provider } from 'react-redux';
import { configureStore } from './services/store/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const store = configureStore();

// Define and export the AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Define and export the RootState type
export type RootState = ReturnType<typeof store.getState>;

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}>
				<App />
			</DndProvider>
		</Provider>
	</StrictMode>
);
