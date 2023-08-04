<script lang="ts">
	import { browser } from '$app/environment';
	import { formatDate, getRepoInfo } from '$lib/helper';
	import githubSvg from '$lib/svgs/github.svg?raw';
	import { fade } from 'svelte/transition';

	export let project_name: string;
	export let github_project: string;
</script>

<article>
	<section id="{project_name}-desc" class="flex gap-2 flex-col">
		<p>
			<slot name="description" />
		</p>
		<section id="{project_name}-links" class="flex gap-2">
			<a
				href="https://{project_name}.lucienn.dev"
				class="btn variant-glass-primary hover:underline w-full">Go To</a
			>
			<a
				href="https://github.com/lucien-neuhoff/{github_project}"
				class="btn variant-glass hover:variant-ghost hover:underline p-3 aspect-square"
			>
				{@html githubSvg}
			</a>
		</section>
		{#if browser}
			{#await getRepoInfo(github_project)}
				<div class="placeholder aninmate-pulse w-44 h-5" />
			{:then repoInfo}
				{#if repoInfo}
					<section in:fade={{ duration: 200 }} class="flex justify-between">
						<span class="font-mono bg-black bg-opacity-70 px-3 py-1 rounded-md">
							{repoInfo.latestCommit.message}
						</span>
						<span>
							{formatDate(new Date(repoInfo.latestCommit.date || 0).getTime())}
						</span>
					</section>
				{/if}
			{/await}
		{/if}
	</section>
	<section id="leptitcoin-badges">
		<slot name="links" />
	</section>
</article>
