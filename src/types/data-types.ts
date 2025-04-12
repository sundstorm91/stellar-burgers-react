interface Ingredients {
	_id: string;
	name: string;
	type: 'sauce' | 'bun' | 'main';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

interface IngredientsApi {
	success?: boolean;
	data: Ingredients[];
}

interface IUseFetchResult<T> {
	ingredients: T | null;
	loading: boolean;
	error: Error | null;
}

type TypePositionBun = 'верх' | 'низ';
type TypePropertyBun = 'bottom' | 'top';

interface PositionBun {
	property: TypePropertyBun;
	value: TypePositionBun;
}

type TypeComponent = 'bun' | 'main' | 'sauce';

interface IngredientComponentProps {
	products: Ingredients[];
	type: TypeComponent;
	position?: PositionBun;
}

interface CurrentIngredient {
	currentIngredient: Ingredients;
	isModal?: boolean;
}

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export type {
	Ingredients,
	IngredientsApi,
	IUseFetchResult,
	TypeComponent,
	IngredientComponentProps,
	ModalProps,
	PositionBun,
	CurrentIngredient,
};
