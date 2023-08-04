<script lang="ts">
	import { browser } from '$app/environment';
	import { formatDate, getRepoInfo } from '$lib/helper';
	import githubSvg from '$lib/svgs/github.svg?raw';
	import { fade } from 'svelte/transition';

	export let project_name: string;
	export let github_project: string;
</script>

<article class="flex gap-2 flex-col">
	<div class="flex flex-col gap-2">
		<div class="flex">
			<section id="{project_name}-desc" class="flex gap-2 flex-col">
				<p>
					<slot name="description" />
				</p>
			</section>
			<section id="leptitcoin-badges" class="flex flex-col gap-1">
				<slot name="links" />
			</section>
		</div>
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
	</div>
	{#if browser}
		{#await getRepoInfo(github_project)}
			<div class="placeholder aninmate-pulse w-full h-12" />
		{:then repoInfo}
			{#if repoInfo}
				<section in:fade={{ duration: 200 }} class="flex justify-between gap-x-3 w-full">
					<span class="font-mono bg-surface-700 px-3 py-1 rounded-md">
						{repoInfo.latest_commit.message}
					</span>
					<span class="text-end">
						{formatDate(new Date(repoInfo.latest_commit.date || 0).getTime())}
					</span>
				</section>
			{/if}
		{/await}
	{/if}
</article>
