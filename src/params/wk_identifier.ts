import { WELL_KNOWN } from '$lib/well-known';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) =>
	Object.keys(WELL_KNOWN).some((wk_identifier) => wk_identifier === param);
