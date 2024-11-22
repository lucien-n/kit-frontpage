import { json, type RequestHandler } from '@sveltejs/kit';
import { ATPROTO_DID } from '$env/static/private';

export const GET: RequestHandler = () => new Response(ATPROTO_DID);
