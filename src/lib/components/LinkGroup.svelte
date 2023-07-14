<script lang="ts">
	import LinkText from '$comp/LinkText.svelte';
	import Link from '$comp/Link.svelte';
	import LinkDescription from '$comp/LinkDescription.svelte';

	const L = {
		Link: Link,
		Text: LinkText,
		Desc: LinkDescription
	};
</script>

<ul class="flex flex-col gap-3">
	<slot {L} />
</ul>
