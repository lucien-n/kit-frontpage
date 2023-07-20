import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: 'https://jalxdvhftqvgnwvlryve.supabase.co',
		supabaseKey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbHhkdmhmdHF2Z253dmxyeXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3MDA5NDMsImV4cCI6MjAwNTI3Njk0M30.CFbLHGORnmuxSXSQXdHSD0Y7rk_mgBfEOpPrJi1JySo',
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
};
