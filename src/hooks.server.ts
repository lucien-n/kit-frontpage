import { GITHUB_TOKEN } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { Octokit } from 'octokit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.octokit = new Octokit({ auth: GITHUB_TOKEN });

	return resolve(event);
};
