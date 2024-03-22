<script lang="ts">
	import { Link } from '$lib/link';
	import { Badge } from '$ui/badge';
	import { badges, type BadgeKey } from '.';

	export let badge: BadgeKey;
	$: ({ label, link, variant } = badges[badge]);
</script>

<Badge {variant} class="hover h-fit px-2">
	{#if link}
		<Link {link} />
	{:else}
		{label}
	{/if}
</Badge>
