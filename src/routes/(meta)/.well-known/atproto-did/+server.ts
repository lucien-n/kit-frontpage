import { json, type RequestHandler } from '@sveltejs/kit';
import { ATPROTO_DID } from '$env/static/private';

export const GET: RequestHandler = () => json(ATPROTO_DID);
