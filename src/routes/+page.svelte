<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import githubSvg from '$lib/svgs/github.svg?raw';
	import SveltekitLink from '$comp/links/SveltekitLink.svelte';
	import SupabaseLink from '$comp/links/SupabaseLink.svelte';
	import SkeletonLink from '$comp/links/SkeletonLink.svelte';
	import FirebaseLink from '$comp/links/FirebaseLink.svelte';
	import type { RepoInfo } from '$lib/types/repo_info';
	import { onMount } from 'svelte';

	export let data: { view_count: number };

	let { view_count } = data;
	$: ({ view_count } = data);

	const getRepoInfo = async (repo: string): Promise<RepoInfo | void> => {
		try {
			const resp = await fetch(`/api/repo-info/${repo}`);
			const data = (await resp.json()) as RepoInfo;
			console.log(data);
		} catch (e) {
			console.warn(e);
		}
	};

	onMount(() => {
		getRepoInfo('skit-leptitcoin');
	});
</script>

<svelte:head>
	<meta
		name="keywords"
		content="lucien, neuhoff, lucien neuhoff, web development, html, css, javascript, typescript, tailwind, nodejs, go, python, supabase, firebase, svelte, sveltekit"
	/>
	<meta
		name="description"
		content="EN I'm Lucien Neuhoff, a 17yo fullstack webdevelopper. Programming has been my passion for many years."
	/>
	<meta name="author" content="Lucien Neuhoff" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div
	class="container relative h-full mx-auto flex flex-col justify-center space-y-5 w-full items-center"
>
	<h1 class="h1 mt-0">Projects</h1>
	<p class="font-normal mt-0 mb-4">{view_count} views</p>
	<div class="card p-3 w-full lg:w-1/2 xl:w-1/3 mx-auto h-fit">
		<Accordion autocollapse>
			<AccordionItem open>
				<svelte:fragment slot="lead"><p class="text-lg">LePtitCoin</p></svelte:fragment>
				<svelte:fragment slot="summary"><p class="opacity-80">Listing website</p></svelte:fragment>
				<svelte:fragment slot="content">
					<section id="leptitcoin-desc" class="flex gap-2 flex-col">
						<p>
							<b>LePtitCoin</b> is a listing website with the idea of recreating something like
							LeBonCoin in <u><SveltekitLink /></u>. <br />
							<u><SupabaseLink /></u> allows for quick and easy auth and database.
						</p>
						<section id="leptitcoin-links" class="flex gap-2">
							<a
								href="https://leptitcoin.lucienn.dev"
								class="btn variant-glass-primary hover:underline w-full">Go To</a
							>
							<a
								href="https://github.com/lucien-neuhoff/skit-leptitcoin"
								class="btn variant-glass hover:variant-ghost hover:underline p-3 aspect-square"
							>
								{@html githubSvg}
							</a>
						</section>
						{#await getRepoInfo('kit-frontpage') then repoInfo}
							<section>
								{repoInfo.latestCommit}
							</section>
						{/await}
					</section>
					<section id="leptitcoin-badges">
						<div class="badge variant-glass-warning"><SveltekitLink /></div>
						<div class="badge variant-glass-success"><SupabaseLink /></div>
						<div class="badge variant-glass-tertiary"><SkeletonLink /></div>
						<div class="badge variant-glass-secondary">WIP</div>
					</section>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><p class="text-lg">Seton</p></svelte:fragment>
				<svelte:fragment slot="summary"><p class="opacity-80">Notes website</p></svelte:fragment>
				<svelte:fragment slot="content">
					<section id="seton-desc" class="flex gap-2 flex-col">
						<p>
							<b>Seton</b> was built as a testing ground for <u><SkeletonLink /></u> in
							<u><SveltekitLink /></u>. <br />
							It's an app that lets you create notes, add tags and edit them either logged in or not.
							<br />
							<u><FirebaseLink /></u> was used for the auth and database.
						</p>
						<section id="seton-links" class="flex gap-2">
							<a
								href="https://seton.lucienn.dev"
								class="btn variant-glass-primary hover:underline w-full">Go To</a
							>
							<a
								href="https://github.com/lucien-neuhoff/sveltekit-notes"
								class="btn variant-glass hover:variant-ghost hover:underline p-3 aspect-square"
							>
								{@html githubSvg}
							</a>
						</section>
					</section>
					<section id="seton-badges">
						<div class="badge variant-glass-warning"><SveltekitLink /></div>
						<div class="badge variant-glass-success"><FirebaseLink /></div>
						<div class="badge variant-glass-tertiary"><SkeletonLink /></div>
						<div class="badge variant-glass-secondary">Working</div>
					</section>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><p class="text-lg">Calendar</p></svelte:fragment>
				<svelte:fragment slot="summary"><p class="opacity-80">Calendar website</p></svelte:fragment>
				<svelte:fragment slot="content">
					<section id="calendar-desc" class="flex gap-2 flex-col">
						<p>
							<b>Calendar</b> is on hold until <b>LePtitCoin</b> has an MVP out. <br />
							The goal of calendar would be to create an interactive calendar. <br />
							It was first supposed to be used to plan out events for a shared garden.
							<br />
							<span class="font-mono"
								>It's just a plain calendar, it'll be remade with <u><SkeletonLink /></u></span
							>
						</p>
						<section id="calendar-links" class="flex gap-2">
							<a
								href="https://calendar.lucienn.dev"
								class="btn variant-glass-primary hover:underline w-full">Go To</a
							>
							<a
								href="https://github.com/lucien-neuhoff/sveltekit-calendar"
								class="btn variant-glass hover:variant-ghost hover:underline p-3 aspect-square"
							>
								{@html githubSvg}
							</a>
						</section>
					</section>
					<section id="calendar-badges">
						<div class="badge variant-glass-warning"><SveltekitLink /></div>
						<div class="badge variant-glass-secondary">WIP</div>
					</section>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
	<p class="italic">
		There is a pletora of all sorts of projects on <a
			class="hover:underline"
			href="https://github.com/lucien-neuhoff">my github</a
		>
	</p>
</div>
