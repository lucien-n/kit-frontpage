import type { RepoInfo } from '$lib/types/repo_info';

export function formatDate(time: number | string): string {
	const date = new Date(time);

	const datestring =
		date.getDate() +
		'/' +
		(date.getMonth() + 1) +
		'/' +
		date.getFullYear() +
		' ' +
		date.getHours() +
		':' +
		date.getMinutes();

	return datestring;
}

export const getRepoInfo = async (repo: string, branch: string): Promise<RepoInfo | null> => {
	try {
		const resp = await fetch(`/api/repo-info/${repo}?branch=${branch}`);
		const data = (await resp.json()) as RepoInfo;

		return data;
	} catch (e) {
		console.warn(e);
	}

	return null;
};
