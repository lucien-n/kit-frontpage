import type { Repository } from './types';
import { toast } from 'svelte-sonner';

export const getRepository = async (
	repository: string,
	branch: string
): Promise<Repository | null> => {
	try {
		const resp = await fetch(`/api/repo-info/${repository}?branch=${branch}`);
		const data = (await resp.json()) as Repository;

		return data;
	} catch (e) {
		toast.error(`An error occured while fetching "${repository}"`);
	}

	return null;
};
