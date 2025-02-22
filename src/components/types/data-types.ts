interface Ingredients {
	_id?: string;
	name?: string;
	type?: string;
	proteins?: number;
	fat?: number;
	carbohydrates?: number;
	calories?: number;
	price?: number;
	image?: string;
	image_mobile?: string;
	image_large?: string;
	__v?: number;
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

type TypeBun = 'top' | 'bottom';

interface BunComponentProps {
	products: Ingredients[];
	type: TypeBun;
}

interface CurrentComponentProps {
	product: Ingredients;
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
	TypeBun,
	BunComponentProps,
	CurrentComponentProps,
	ModalProps,
};
