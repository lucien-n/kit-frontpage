<script lang="ts">
	import { projects } from '.';
	import * as Accordion from '$ui/accordion';

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
	</Accordion.Content>
</Accordion.Item>
