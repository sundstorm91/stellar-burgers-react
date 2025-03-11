import styles from './ingredient-components.module.css';
import React, { useState } from 'react';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../../modal/modal-overlay';
import { IngredientDetails } from '../../modal/ingredient-details';
import Modal from '../../modal/modal';
import { RootState } from '../../..';
import { useSelector } from 'react-redux';

export const Component: React.FC = () => {
	const ingredients = useSelector(
		(state: RootState) => state.api.ingredients.data
	);
	const [openModalId, setOpenModalId] = useState<string | null>(null);
	const openModal = (id: string) => setOpenModalId(id);
	const closeModal = () => setOpenModalId(null);
	const currentCard = ingredients.find((card) => card._id === openModalId);
	const typeComponents = [
		{
			type: 'bun',
			title: 'Булки',
		},

		{
			type: 'sauce',
			title: 'Соусы',
		},

		{
			type: 'main',
			title: 'Начинки',
		},
	];

	return (
		<>
			{typeComponents.map((component) => {
				const filtredIngredients = ingredients.filter(
					(ingredient) => ingredient.type === component.type
				);

				if (filtredIngredients.length === 0) return null;
				return (
					<>
						<h2>{component.title}</h2>
						<div key={component.type} className={styles.typeWrapper}>
							<Counter count={1} size='default' />
							{filtredIngredients.map((item) => (
								<div key={item._id} className={styles.ingredientItem}>
									<div
										aria-hidden='true'
										className={styles.ingredientItem}
										onClick={() => openModal(item._id!)}>
										<img src={item.image} alt={item.name} />
										<div className={styles.price}>
											<p className='text text_type_digits-default'>
												{item.price}
											</p>
											<CurrencyIcon type={'primary'} />
										</div>
										<p className={styles.description}>{item.name}</p>
									</div>
								</div>
							))}
							{currentCard && (
								<>
									<ModalOverlay onClose={closeModal} isOpen={!!openModalId} />
									<Modal onClose={closeModal} isOpen={!!openModalId}>
										<IngredientDetails product={currentCard} />
									</Modal>
								</>
							)}
						</div>
					</>
				);
			})}
		</>
	);
};
/* <div key={item._id} className={styles.ingredientItem}>
														<div
															aria-hidden='true'
															className={styles.ingredientItem}
															onClick={() => handleIngredientClick(item)}>
															<img src={item.image} alt={item.name} />
															<div className={styles.price}>
																<p className='text text_type_digits-default'>
																	{item.price}
																</p>
																<CurrencyIcon type={'primary'} />
															</div>
															<p className={styles.description}>{item.name}</p>
														</div>
													</div> */