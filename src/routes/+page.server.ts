import { error } from '@sveltejs/kit';
export const load = async ({ getClientAddress, locals: { supabase, octokit } }) => {
	const ip = getClientAddress();

	try {
		const resp = await supabase.from('views').insert({ ip: ip });
		console.log(resp);
	} catch (e) {
		console.warn(e);
	}

	try {
		const { error: err } = await supabase.rpc('increment_view_count', { client_ip: ip });
		if (err) throw error(500, err);
	} catch (e) {
		console.warn(e);
	}

	let view_count = 0;
	try {
		const { data: count } = await supabase.rpc('total_views');
		view_count = count || -1;
	} catch (e) {
		console.warn(e);
	}

	return {
		view_count: view_count
	};
};
