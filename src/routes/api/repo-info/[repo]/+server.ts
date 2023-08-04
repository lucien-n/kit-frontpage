import type { RepoInfo } from '$lib/types/repo_info';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { octokit }, params }) => {
	try {
		const repo = params.repo;

		if (!repo) return new Response(null, { status: 422, statusText: 'Missing repo id' });

		const resp = await octokit.request(`GET /repos/lucien-neuhoff/${repo}/commits/dev`, {});
		const data = resp.data;

		if (!data) return new Response(null, { status: 500, statusText: 'Internal Server Error' });

		const latestCommit = {
			message: data.commit.message || 'ref: this is an example commit',
			author: data.commit.author.name || 'lucien-neuhoff',
			date: data.commit.author.date || new Date().toUTCString()
		};

		const info: RepoInfo = {
			latestCommit
		};

		return new Response(JSON.stringify(info), { status: 200, statusText: 'Success' });
	} catch (e) {
		console.warn(e);
	}

	return new Response();
};
