import { env } from '$env/dynamic/private';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import { Octokit } from 'octokit';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: 'https://jalxdvhftqvgnwvlryve.supabase.co',
		supabaseKey: SUPABASE_SERVICE_ROLE_KEY,
		event
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	event.locals.octokit = new Octokit({ auth: env.GITHUB_TOKEN });

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
