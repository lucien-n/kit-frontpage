<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	const { children } = $props();
</script>

<svelte:head>
	<title>Lucien Neuhoff</title>
</svelte:head>

{#key $page.url.href}
	<div class="h-full w-full" in:slide={{ axis: 'y', duration: 200 }}>
		<img
			src="background.svg"
			alt="background"
			class="absolute left-0 top-0 h-full w-full object-cover"
		/>
		<main>
			{@render children()}
		</main>
	</div>
{/key}
