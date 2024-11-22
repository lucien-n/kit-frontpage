import { WK_ATPROTO_DID } from '$env/static/private';
import { RequestHandler } from '@sveltejs/kit';

const WELL_KNOWN = {
	'atproto-did': WK_ATPROTO_DID,
	'security.txt': `Contact: mailto:contact@lucienn.dev
Preferred-Languages: en, fr
Expires: 2026-12-31T00:00:00Z`
} as const;

export const GET: RequestHandler = (event) => {
	const { identifier } = event.params;
	if (!identifier || !(identifier in WELL_KNOWN)) {
		return new Response(null, { status: 404 });
	}

	const body = WELL_KNOWN[identifier];
	return new Response(body);
};
