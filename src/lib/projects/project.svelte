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

	export let name: keyof typeof projects;

	const { info, content } = projects[name];
</script>

<Accordion.Item value={name}>
	<Accordion.Trigger>
		<div class="flex gap-2">
			<p class="text-xl font-bold">
				{info.name}
			</p>
			<p class="self-center text-muted-foreground">{info.summary}</p>
		</div>
	</Accordion.Trigger>
	<Accordion.Content class="text-base">
		<svelte:component this={content} />
		<div class="my-2" />
		<div class="flex gap-2">
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
