<script lang="ts">
	import { projects } from '.';
	import * as Accordion from '$ui/accordion';
	import { Button } from '$ui/button';
	import { ExternalLink, GithubLogo } from 'radix-icons-svelte';
	import { PUBLIC_GITHUB_OWNER } from '$env/static/public';
	import { CircleBackslash } from 'radix-icons-svelte';

	export let name: keyof typeof projects;

	const { info, content } = projects[name];
</script>

<Accordion.Item value={name}>
	<Accordion.Trigger>
		<div class="flex gap-2">
			<p class="font-bold">
				{info.name}
			</p>
			<p class="text-muted-foreground">{info.summary}</p>
		</div>
	</Accordion.Trigger>
	<Accordion.Content>
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
					<p class="mx-2 group-hover:underline">Go to</p>
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
	</Accordion.Content>
</Accordion.Item>
