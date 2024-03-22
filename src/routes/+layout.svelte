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
	<div class="h-full w-full" in:slide={{ axis: 'y', duration: 200 }}>
		<img
			src="background.svg"
			alt="background"
			class="absolute left-0 top-0 h-full w-full object-cover"
		/>
		<main>
			<slot />
		</main>
	</div>
{/key}
