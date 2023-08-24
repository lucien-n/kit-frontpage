import type { CommitInfo } from '$lib/types/commit_info';
import type { RepoInfo } from '$lib/types/repo_info';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import type { Octokit } from 'octokit';
// 							  h    m    s    ms
const REPO_FETCH_TIMEOUT_MS = 12 * 60 * 60 * 100;

export const GET: RequestHandler = async ({
	locals: { octokit, supabase },
	params,
	url: { searchParams }
}) => {
	try {
		const repo_name = params.repo;
		const repo_branch = searchParams.get('branch') || 'main';

		if (!repo_name) return new Response(null, { status: 422, statusText: 'Missing repo id' });

		let info: RepoInfo | null = null;

		const should_refetch = await shouldRefetchRepoInfo(supabase, repo_name);

		if (should_refetch) {
			const github_repo_info = await getFromGithub(octokit, repo_name, repo_branch);

			if (!github_repo_info) {
				info = {
					name: repo_name,
					latest_commit: {
						message: 'ref: this is an example commit',
						author: 'lucien-neuhoff',
						date: new Date().toUTCString()
					}
				};
			} else {
				info = github_repo_info;
				await saveRepoToSupabase(supabase, info);
			}
		} else {
			const supa_repo_info = await getFromSupabase(supabase, repo_name);
			if (supa_repo_info) info = supa_repo_info;
		}

		return info
			? new Response(JSON.stringify(info), { status: 200, statusText: 'Success' })
			: new Response();
	} catch (e) {
		console.warn(e);
	}

	return new Response();
};

const getFromGithub = async (
	octokit: Octokit,
	repo_name: string,
	repo_branch: string
): Promise<RepoInfo | null> => {
	try {
		const resp = await octokit.request(
			`GET /repos/lucien-neuhoff/${repo_name}/commits/${repo_branch}`,
			{}
		);
		const data = resp.data;

		if (!data) return null;

		const latest_commit: CommitInfo = {
			message: data.commit.message,
			author: data.commit.author.name,
			date: data.commit.author.date
		};

		const info: RepoInfo = {
			name: repo_name,
			latest_commit
		};

		return info;
	} catch (e) {
		console.warn(e);
	}

	return null;
};

const getFromSupabase = async (
	supabase: SupabaseClient,
	repo: string
): Promise<RepoInfo | null> => {
	try {
		const { data } = await supabase.from('repos').select('*').eq('name', repo);

		const repo_data = data?.[0];

		if (!repo_data) return null;

		const latest_commit: CommitInfo = {
			author: repo_data.commit_author,
			message: repo_data.commit_message,
			date: repo_data.commit_date
		};

		const repo_info: RepoInfo = {
			name: repo,
			latest_commit
		};

		return repo_info;
	} catch (e) {
		console.warn(e);
	}

	return null;
};

const saveRepoToSupabase = async (supabase: SupabaseClient, repo: RepoInfo): Promise<void> => {
	try {
		const { error } = await supabase
			.from('repos')
			.update({
				name: repo.name,
				commit_message: repo.latest_commit.message,
				commit_author: repo.latest_commit.author,
				commit_date: repo.latest_commit.date
			})
			.eq('name', repo.name);

		if (error) throw new Error(error.message);
	} catch (e) {
		console.warn(e);
	}
};

const shouldRefetchRepoInfo = async (
	supabase: SupabaseClient,
	repo_name: string
): Promise<boolean> => {
	try {
		const { data } = await supabase.from('repos').select('updated_at').eq('name', repo_name);

		const repo_data = data?.[0];

		if (!repo_data) return true;

		const created_at = new Date(repo_data.updated_at);

		return (
			new Date().getUTCMilliseconds() - created_at.getUTCMilliseconds() > REPO_FETCH_TIMEOUT_MS
		);
	} catch (e) {
		console.warn(e);
	}
	return false;
};
