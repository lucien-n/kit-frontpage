<script lang="ts">
	import { PUBLIC_GITHUB_OWNER } from '$env/static/public';
	import { Button } from '$ui/button';
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
	class="container relative mx-auto flex h-full w-full flex-col items-center justify-center space-y-5"
>
	<div class="card mx-auto h-fit w-full p-3 lg:w-4/5 xl:w-2/5"></div>
	<p class="text-center italic">
		There is a plethora of all sorts of projects on
		<Button variant="link" href="https://github.com/{PUBLIC_GITHUB_OWNER}" class="px-0 text-base">
			github
		</Button>
	</p>
</div>
