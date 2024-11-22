import { WK_ATPROTO_DID, WK_DISCORD } from '$env/static/private';

export const WELL_KNOWN = {
	'atproto-did': WK_ATPROTO_DID,
	discord: WK_DISCORD
} as const;
