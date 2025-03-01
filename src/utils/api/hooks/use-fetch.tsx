import { useState, useEffect } from 'react';
import { IUseFetchResult } from '../../../components/types/data-types';

export const UseFetch = <T,>(url: string): IUseFetchResult<T> => {
	const [ingredients, setIngredients] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.status) {
					throw new Error('Error: status' + response.status);
				}
				const result = (await response.json()) as T;
				setIngredients(result);
			} catch (error) {
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return { ingredients, loading, error };
};
