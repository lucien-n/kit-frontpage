import type { CommitInfo } from '$lib/types/commit_info';
import type { RepoInfo } from '$lib/types/repo_info';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import type { Octokit } from 'octokit';

export const GET: RequestHandler = async ({ locals: { octokit, supabase }, params }) => {
	try {
		const repo = params.repo;

		if (!repo) return new Response(null, { status: 422, statusText: 'Missing repo id' });

		let info: RepoInfo | null = null;

		const supa_repo_info = await getFromSupabase(supabase, repo);
		if (!supa_repo_info) {
			const github_repo_info = await getFromGithub(octokit, repo);

			if (github_repo_info) {
				info = {
					name: repo,
					latest_commit: {
						message: 'ref: this is an example commit',
						author: 'lucien-neuhoff',
						date: new Date().toUTCString()
					}
				};

				await saveRepoToSupabase(supabase, info);
			}
		} else {
			info = supa_repo_info;
		}

		return info
			? new Response(JSON.stringify(info), { status: 200, statusText: 'Success' })
			: new Response();
	} catch (e) {
		console.warn(e);
	}

	return new Response();
};

const getFromGithub = async (octokit: Octokit, repo: string): Promise<RepoInfo | null> => {
	try {
		const resp = await octokit.request(`GET /repos/lucien-neuhoff/${repo}/commits/dev`, {});
		const data = resp.data;

		if (!data) return null;

		const latest_commit: CommitInfo = {
			message: data.commit.message,
			author: data.commit.author.name,
			date: data.commit.author.date
		};

		const info: RepoInfo = {
			name: repo,
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
			date: repo_data.commit_data
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
		const { error } = await supabase.from('repos').insert({
			name: repo.name,
			commit_message: repo.latest_commit.message,
			commit_author: repo.latest_commit.author,
			commit_date: repo.latest_commit.date
		});
		if (error) throw new Error(error.message);
	} catch (e) {
		console.warn(e);
	}
};
