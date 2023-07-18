import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: 'https://jalxdvhftqvgnwvlryve.supabase.co',
		supabaseKey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbHhkdmhmdHF2Z253dmxyeXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3MDA5NDMsImV4cCI6MjAwNTI3Njk0M30.CFbLHGORnmuxSXSQXdHSD0Y7rk_mgBfEOpPrJi1JySo',
		event
	});

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
