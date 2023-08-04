import type { Database } from '$lib/database.types';
import { SupabaseClient, type Session } from '@supabase/supabase-js';
import type { Octokit } from 'octokit';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	type SupaView = Database['public']['Tables']['views']['Row'];

	declare namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			octokit: Octokit;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}
