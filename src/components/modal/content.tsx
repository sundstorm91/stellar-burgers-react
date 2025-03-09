// components/HomePage.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../services/features/modal-data/action';

const HomePage: React.FC = () => {
	const dispatch = useDispatch();

	const handleOpenModal = () => {
		dispatch(
			openModal(
				<div>
					<h2>Modal Content</h2>
					<p>This is the content of the modal.</p>
				</div>
			)
		);
	};

	return (
		<div>
			<h1>Home Page</h1>
			<button onClick={handleOpenModal}>Open Modal</button>
		</div>
	);
};

export default HomePage;
