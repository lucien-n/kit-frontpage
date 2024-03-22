<script lang="ts">
	import { links } from '.';

	export let link: keyof typeof links;
	$: ({ href, label } = links[link]);
</script>

<a {href} style="font-weight: 500;" target="_blank"><u>{label}</u></a>
