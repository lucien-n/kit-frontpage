<script lang="ts">
	import LinkIcon from './LinkIcon.svelte';

	export let project: string;
	export let stack: string;
	export let status: string;
	export let other: string = '';
</script>

<li>
	<a
		href="https://{project}.lucienn.dev"
		target="_blank"
		class="flex w-full gap-1 items-center group justify-between"
	>
		<span class="flex items-center gap-1">
			<LinkIcon
				src="https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://{project}.lucienn.dev"
				alt="{project} favicon"
			/>
			<slot />
		</span>
		<span>
			<div class="badge variant-ghost-warning">{stack}</div>
			<div class="badge variant-ghost-success">{status}</div>
			{#if other}
				<div class="badge variant-ghost-secondary">{other}</div>
			{/if}
		</span>
	</a>
</li>
