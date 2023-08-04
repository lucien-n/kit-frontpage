import type { RepoInfo } from '$lib/types/repo_info';

export function formatDate(time: number | string): string {
	const date = new Date(time);

	const month = date.toLocaleString('default', { month: 'short' });
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formatted_date = `${month} ${day} ${hours.toString().padStart(2, '0')}h${minutes
		.toString()
		.padStart(2, '0')}`;

	return formatted_date;
}

export const getRepoInfo = async (repo: string): Promise<RepoInfo | null> => {
	try {
		const resp = await fetch(`/api/repo-info/${repo}`);
		const data = (await resp.json()) as RepoInfo;

		return data;
	} catch (e) {
		console.warn(e);
	}

	return null;
};
