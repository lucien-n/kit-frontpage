<script lang="ts">
	import Avatar from '$lib/components/avatar.svelte';
	import IconLink from '$lib/components/icon-link.svelte';
	import Seo from '$lib/components/seo.svelte';
	import type { IconLinkProps } from '$lib/components/types';
	import { Button } from '&/button';
	import { Separator } from '&/separator';
	import { Github, Linkedin } from 'lucide-svelte';

	const name = 'Lucien';
	const mail = 'contact@lucienn.dev';

	const links: IconLinkProps[] = [
		{
			href: 'https://www.linkedin.com/in/lucien-neuhoff/',
			label: 'LinkedIn',
			icon: Linkedin
		},
		{
			href: 'https://github.com/lucien-n',
			label: 'Github',
			icon: Github
		}
	];
</script>

<Seo />

<div
	class="relative mx-auto flex h-full w-full flex-col items-center justify-center space-y-5 sm:container"
>
	<div class="flex flex-col sm:flex-row">
		<div class="self-center">
			<Avatar />
		</div>
		<div class="flex w-64 flex-col sm:ml-7">
			<h1 class="mt-3 text-4xl">{name}</h1>
			<div class="flex items-center gap-1">
				<Button variant="link" class="self-start px-0.5 text-lg" href="mailto:{mail}">
					{mail}
				</Button>
			</div>
			<Separator class="my-2" />
			<div class="flex items-center gap-2">
				{#each links as link, index}
					<IconLink {link} />
					{#if index < links.length - 1}
						<Separator orientation="vertical" />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
