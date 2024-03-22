<script>
	import { Toaster } from '$ui/sonner';
	import { ModeWatcher, mode } from 'mode-watcher';
	import '../app.pcss';
	import Lightswitch from '$lib/lightswitch.svelte';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
</script>

<svelte:head>
	<title>Lucien Neuhoff</title>
</svelte:head>

<ModeWatcher />
<Toaster richColors />

<div class="absolute right-2 top-2 z-50">
	<Lightswitch />
</div>

{#key ($page.url.href, $mode)}
	<main in:slide={{ axis: 'y', duration: 200 }}>
		<slot />
	</main>
{/key}
