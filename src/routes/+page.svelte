<script lang="ts">
	import Project from '$comp/Project.svelte';
	import Badge from '$comp/badges/Badge.svelte';
	import FirebaseBadge from '$comp/badges/FirebaseBadge.svelte';
	import SkeletonBadge from '$comp/badges/SkeletonBadge.svelte';
	import SupabaseBadge from '$comp/badges/SupabaseBadge.svelte';
	import SveltekitBadge from '$comp/badges/SveltekitBadge.svelte';
	import FirebaseLink from '$comp/links/FirebaseLink.svelte';
	import SkeletonLink from '$comp/links/SkeletonLink.svelte';
	import SupabaseLink from '$comp/links/SupabaseLink.svelte';
	import SveltekitLink from '$comp/links/SveltekitLink.svelte';
	import githubSvg from '$lib/svgs/github.svg?raw';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	export let data: { view_count: number };

	let { view_count } = data;
	$: ({ view_count } = data);
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
					<Project project_name="leptitcoin" github_project="skit-leptitcoin">
						<svelte:fragment slot="description">
							<b>LePtitCoin</b> is a listing website with the idea of recreating something like
							LeBonCoin in <u><SveltekitLink /></u>. <br />
							<u><SupabaseLink /></u> allows for quick and easy auth and database.
						</svelte:fragment>
						<svelte:fragment slot="links">
							<SveltekitBadge />
							<SupabaseBadge />
							<SkeletonBadge />
							<Badge variant="primary">WIP</Badge>
						</svelte:fragment>
					</Project>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><p class="text-lg">Seton</p></svelte:fragment>
				<svelte:fragment slot="summary"><p class="opacity-80">Notes website</p></svelte:fragment>
				<svelte:fragment slot="content">
					<Project project_name="seton" github_project="sveltekit-notes">
						<svelte:fragment slot="description">
							<b>Seton</b> was built as a testing ground for <u><SkeletonLink /></u> in
							<u><SveltekitLink /></u>. <br />
							It's an app that lets you create notes, add tags and edit them either logged in or not.
							<br />
							<u><FirebaseLink /></u> was used for the auth and database.
						</svelte:fragment>
						<svelte:fragment slot="links">
							<SveltekitBadge />
							<FirebaseBadge />
							<SkeletonBadge />
							<Badge variant="primary">MVP</Badge>
						</svelte:fragment>
					</Project>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><p class="text-lg">Calendar</p></svelte:fragment>
				<svelte:fragment slot="summary"><p class="opacity-80">Calendar website</p></svelte:fragment>
				<svelte:fragment slot="content">
					<Project project_name="calendar" github_project="sveltekit-calendar">
						<svelte:fragment slot="description">
							<b>Calendar</b> is on hold until <b>LePtitCoin</b> has an MVP out. <br />
							The goal of calendar would be to create an interactive calendar. <br />
							It was first supposed to be used to plan out events for a shared garden.
							<br />
							<span class="font-mono"
								>It's just a plain calendar, it'll be remade with <u><SkeletonLink /></u></span
							>
						</svelte:fragment>
						<svelte:fragment slot="links">
							<SveltekitBadge />
							<Badge variant="primary">On Hold</Badge>
						</svelte:fragment>
					</Project>
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
