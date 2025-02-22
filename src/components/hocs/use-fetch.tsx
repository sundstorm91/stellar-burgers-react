import { useState, useEffect } from 'react';

export interface IUseFetchResult<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

export const UseFetch = <T,>(url: string): IUseFetchResult<T> => {
	const [data, setData] = useState<T | null>(null);
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
				setData(result);
			} catch (error) {
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return { data, loading, error };
};
