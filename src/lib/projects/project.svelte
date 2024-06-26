<script lang="ts">
	import { projects } from '.';
	import * as Accordion from '$ui/accordion';
	import { Button } from '$ui/button';
	import { ExternalLink, GithubLogo } from 'radix-icons-svelte';
	import { PUBLIC_GITHUB_OWNER } from '$env/static/public';
	import { CircleBackslash } from 'radix-icons-svelte';
	import moment from 'moment';
	import { getRepository } from '$lib/github';
	import { Skeleton } from '$ui/skeleton';
	import { Badge } from '$lib/badge';

	export let name: keyof typeof projects;

	const { info, content } = projects[name];
</script>

<Accordion.Item value={name} class="w-full">
	<Accordion.Trigger class="hover:no-underline">
		<div class="flex gap-2">
			<p class="text-xl font-bold hover:underline">
				{info.name}
			</p>
			<div class="group hidden gap-1 self-center sm:flex">
				{#each info.badges as badge}
					<Badge {badge} />
				{/each}
			</div>
		</div>
	</Accordion.Trigger>
	<Accordion.Content class="text-base">
		<p class="self-center text-muted-foreground">{info.summary}</p>
		<div class="my-2" />
		<svelte:component this={content} />
		<div class="my-2" />
		<div class="mt-5 flex gap-2">
			{#if !info.link}
				<Button class="group w-full" variant="secondary" disabled>
					<CircleBackslash size={20} />
					<p class="mx-2 group-hover:underline">Not hosted</p>
				</Button>
			{:else}
				<Button href={info.link ?? '/'} class="group w-full" variant="secondary">
					<ExternalLink size={20} />
					<p class="mx-2 group-hover:underline">Visit</p>
				</Button>
			{/if}
			<Button
				href="https://github.com/{PUBLIC_GITHUB_OWNER}/{info.github.repository}/tree/{info.github
					.branch}"
				size="icon"
			>
				<GithubLogo size={20} />
			</Button>
		</div>
		<div class="my-2" />
		<div>
			<p class="flex gap-1 italic text-muted-foreground">
				last activity
				{#await getRepository(info.github.repository, info.github.branch)}
					<Skeleton class="h-3 w-24 self-center" />
				{:then repository}
					{repository?.latestCommit?.date
						? moment(repository.latestCommit.date).fromNow()
						: 'unknown'}
				{/await}
			</p>
		</div>
	</Accordion.Content>
</Accordion.Item>
