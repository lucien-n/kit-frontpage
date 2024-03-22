<script lang="ts">
	import { PUBLIC_GITHUB_OWNER } from '$env/static/public';
	import { Projects } from '$lib/projects';

	import { Button } from '$ui/button';
	import { EnvelopeClosed } from 'radix-icons-svelte';
</script>

<svelte:head>
	<meta
		name="keywords"
		content="lucien, neuhoff, lucien neuhoff, web development, html, css, javascript, typescript, tailwind, nodejs, go, python, supabase, firebase, svelte, sveltekit, shadcn"
	/>
	<meta
		name="description"
		content="EN I'm Lucien Neuhoff, a 18 years old fullstack web developper. Programming has been my passion for years."
	/>
	<meta name="author" content="Lucien Neuhoff" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div
	class="relative mx-auto flex h-full w-full flex-col items-center justify-center space-y-5 sm:container"
>
	<div class="w-full px-2 md:w-3/4 lg:w-1/2">
		<Projects />
	</div>
	<div class="flex flex-col">
		<p class="text-center italic">
			There is a plethora of all sorts of projects on
			<Button variant="link" href="https://github.com/{PUBLIC_GITHUB_OWNER}" class="px-0 text-base">
				github
			</Button>
		</p>
		<Button variant="link" href="mailto:contact@lucienn.dev" class="flex gap-2 px-1 text-base">
			<EnvelopeClosed />
			<p>Contact me</p>
		</Button>
	</div>
</div>
