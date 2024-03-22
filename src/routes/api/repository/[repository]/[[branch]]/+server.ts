import { PUBLIC_GITHUB_OWNER } from '$env/static/public';
import type { Commit, Repository } from '$lib/types';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { RequestError, type Octokit } from 'octokit';

export const GET: RequestHandler = async ({ locals: { octokit }, params }) => {
	const { repository, branch } = params;

	if (!repository) return json({ message: 'missing repo name' }, { status: 422 });

	let info: Repository = {
		name: repository,
		latestCommit: {
			message: 'feat: example commit',
			author: PUBLIC_GITHUB_OWNER,
			date: new Date().toUTCString()
		}
	};

	const repositoryInfo = await getFromGithub(octokit, repository, branch ?? 'main');
	if (repositoryInfo) info = repositoryInfo;

	return json(info, { status: 200 });
};

const getFromGithub = async (
	octokit: Octokit,
	repository: string,
	branch: string
): Promise<Repository | null> => {
	try {
		const { data } = await octokit.request(
			`GET /repos/${PUBLIC_GITHUB_OWNER ?? 'lucien-n'}/${repository}/commits/${branch}`
		);
		if (!data) return null;

		const latestCommit: Commit = {
			message: data.commit.message,
			author: data.commit.author.name,
			date: data.commit.author.date
		};

		const info: Repository = {
			name: repository,
			latestCommit
		};

		return info;
	} catch (e) {
		if (e instanceof RequestError) {
			return error(e.status, e.message);
		} else {
			throw e;
		}
	}
};
