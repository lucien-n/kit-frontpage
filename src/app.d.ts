import { SupabaseClient } from '@supabase/supabase-js';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			supabase: SupabaseClient;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
