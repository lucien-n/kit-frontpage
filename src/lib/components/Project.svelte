<script lang="ts">
	import { browser } from '$app/environment';
	import { formatDate, getRepoInfo } from '$lib/helper';
	import githubSvg from '$lib/svgs/github.svg?raw';
	import { fade } from 'svelte/transition';
	import externalLinkSvg from '$lib/svgs/external_link.svg?raw';

	export let project_name: string;
	export let github_project: string;
	export let branch: string;
</script>

<article class="flex gap-2 flex-col">
	<div class="flex flex-col gap-2 justify-between">
		<div class="flex">
			<section id="{project_name}-desc" class="flex gap-2 flex-col w-full">
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
				class="btn variant-glass-primary hover:underline w-full"
				>Go To
				<div class="scale-[75%]">{@html externalLinkSvg}</div>
			</a>
			<a
				href="https://github.com/lucien-neuhoff/{github_project}"
				class="btn variant-glass hover:variant-ghost hover:underline p-3 aspect-square"
			>
				{@html githubSvg}
			</a>
		</section>
	</div>
	{#if browser}
		{#await getRepoInfo(github_project, branch)}
			<div class="placeholder aninmate-pulse w-full h-12" />
		{:then repoInfo}
			{#if repoInfo}
				<section in:fade={{ duration: 200 }} class="flex justify-between gap-x-3 w-full">
					<div class="font-mono bg-surface-700 px-3 py-1 rounded-md w-full gap-y-3 flex flex-col">
						<span class="font-bold"
							>{repoInfo.name} on
							<a
								href="https://github.com/lucien-neuhoff/{github_project}/tree/{branch}"
								class="underline">{branch}</a
							></span
						>
						<p>
							{repoInfo.latest_commit.message}
						</p>
						<span class="italic text-sm flex gap-[0.4em]"
							>by {repoInfo.latest_commit.author}
							<span class="text-[0.3em] self-center flex">⚪</span>
							{formatDate(new Date(repoInfo.latest_commit.date || 0).getTime())}</span
						>
					</div>
				</section>
			{/if}
		{/await}
	{/if}
</article>
