<script>
	import { Toaster } from '$ui/sonner';
	import '../app.pcss';
</script>

<svelte:head>
	<title>Lucien Neuhoff</title>
</svelte:head>

<Toaster richColors />

<main>
	<slot />
</main>
