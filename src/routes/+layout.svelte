<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import '../dark-theme.postcss';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { Modal } from '@skeletonlabs/skeleton';

	export let data: { supabase: SupabaseClient; session: Session };

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Lucien Neuhoff</title>
</svelte:head>

<Modal />

<main class="overflow-hidden w-full h-full">
	<slot />
</main>
