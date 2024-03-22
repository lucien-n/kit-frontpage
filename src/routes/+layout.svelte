<script>
	import { Toaster } from '$ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Lightswitch from '$lib/lightswitch.svelte';
</script>

<svelte:head>
	<title>Lucien Neuhoff</title>
</svelte:head>

<ModeWatcher />
<Toaster richColors />

<div class="absolute right-2 top-2 z-50">
	<Lightswitch />
</div>

<main>
	<slot />
</main>
