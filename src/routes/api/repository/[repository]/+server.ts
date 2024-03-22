import { PUBLIC_GITHUB_OWNER } from '$env/static/public';
import type { Commit, Repository } from '$lib/types';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { Octokit } from 'octokit';

export const GET: RequestHandler = async ({
	locals: { octokit },
	params,
	url: { searchParams }
}) => {
	const repo_name = params.repo;
	const repo_branch = searchParams.get('branch') || 'main';

	if (!repo_name) return json({ message: 'missing repo name' }, { status: 422 });

	let info: Repository = {
		name: repo_name,
		latest_commit: {
			message: 'ref: this is an example commit',
			author: PUBLIC_GITHUB_OWNER,
			date: new Date().toUTCString()
		}
	};

	const github_repo_info = await getFromGithub(octokit, repo_name, repo_branch);
	if (github_repo_info) info = github_repo_info;

	return json(info, { status: 200 });
};

const getFromGithub = async (
	octokit: Octokit,
	repo_name: string,
	repo_branch: string
): Promise<Repository | null> => {
	try {
		const resp = await octokit.request(
			`GET /repos/${PUBLIC_GITHUB_OWNER ?? 'lucien-n'}/${repo_name}/commits/${repo_branch}`,
			{}
		);
		const data = resp.data;

		if (!data) return null;

		const latest_commit: Commit = {
			message: data.commit.message,
			author: data.commit.author.name,
			date: data.commit.author.date
		};

		const info: Repository = {
			name: repo_name,
			latest_commit
		};

		return info;
	} catch (e) {
		console.warn(e);
	}

	return null;
};
