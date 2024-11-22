import { RequestHandler } from '@sveltejs/kit';
import { WELL_KNOWN } from '$lib/well-known';

export const GET: RequestHandler = (event) => {
	const body = WELL_KNOWN[event.params.identifier];

	return new Response(body);
};
