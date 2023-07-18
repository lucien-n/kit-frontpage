import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ getClientAddress, locals: { supabase } }) => {
	const ip = getClientAddress();

	try {
		const { error: err } = await supabase.from('views').insert({ ip: ip });
		if (err) throw error(500, err);
	} catch (e) {
		console.warn(e);
	}

	try {
		const { error: err } = await supabase.rpc('increment_view_count', { client_ip: ip });
		if (err) throw error(500, err);
	} catch (e) {
		console.warn(e);
	}
};
