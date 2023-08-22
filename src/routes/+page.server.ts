import { error } from '@sveltejs/kit';
export const load = async ({ getClientAddress, locals: { supabase } }) => {
	const ip = getClientAddress();

	try {
		await supabase.from('views').insert({ ip: ip });
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
