// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			octokit: import('octokit').Octokit;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
