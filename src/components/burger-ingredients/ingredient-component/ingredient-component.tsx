import { Ingredients } from '../../types/data-types';
import styles from './ingredient-components.module.css';
import React, { useState } from 'react';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../../modal/modal-overlay';
import { IngredientDetails } from '../../modal/ingredient-details';

type TypeItem = 'bun' | 'main' | 'sauce';

interface IngredientComponentProps {
	products: Ingredients[];
	type: TypeItem;
}

export const Component: React.FC<IngredientComponentProps> = ({
	products,
	type,
}) => {
	const [openModalId, setOpenModalId] = useState<string | null>(null);
	const openModal = (id: string) => setOpenModalId(id);
	const closeModal = () => setOpenModalId(null);
	const currentCard = products.find((card) => card._id === openModalId);

	return (
		<>
			<div className={styles.ingredientsField}>
				<Counter count={1} size='default' />
				{products
					.filter((item) => item.type === type)
					.map((item) => (
						<div key={item._id}>
							<div
								aria-hidden='true'
								className={styles.ingredientItem}
								onClick={() => openModal(item._id!)}>
								<img src={item.image} alt={item.name} />
								<div className={styles.price}>
									<p className='text text_type_digits-default'>{item.price}</p>
									<CurrencyIcon type={'primary'} />
								</div>
								<p className={styles.description}>{item.name}</p>
							</div>
						</div>
					))}

				{currentCard && (
					<ModalOverlay onClose={closeModal} isOpen={!!openModalId}>
						<IngredientDetails product={currentCard} />
					</ModalOverlay>
				)}
			</div>
		</>
	);
};
