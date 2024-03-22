<script lang="ts">
	import { Button } from '$ui/button';
	import { links } from '.';

	export let link: keyof typeof links;
	$: ({ href, label } = links[link]);
</script>

<Button {href} variant="link" class="h-fit  p-0 text-xs " target="_blank">
	<u>{label}</u>
</Button>
