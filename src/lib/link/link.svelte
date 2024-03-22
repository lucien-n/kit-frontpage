<script lang="ts">
	import { Button } from '$ui/button';
	import { ExternalLink } from 'radix-icons-svelte';
	import { links } from '.';

	export let link: keyof typeof links;
	$: ({ href, label } = links[link]);
</script>

<Button {href} variant="link" class="h-fit  p-0 text-xs " target="_blank">
	<ExternalLink size={12} />
	<u class="ml-1">{label}</u>
</Button>
