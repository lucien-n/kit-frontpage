<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import '../dark-theme.postcss';
</script>

<svelte:head>
	<title>Lucien Neuhoff</title>
</svelte:head>

<main class="overflow-hidden w-full h-full">
	<slot />
</main>
