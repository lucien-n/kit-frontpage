<script lang="ts">
	import { Project } from '$lib/projects';
	import * as Accordion from '$ui/accordion';
</script>

<Accordion.Root
	value="frontpage"
	class="w-full rounded-md border border-primary/20 bg-background/20 px-12 py-8 shadow-sm backdrop-blur-3xl"
>
	<Project name="frontpage" />
	<Project name="leptitcoinV2" />
	<Project name="windows" />
</Accordion.Root>
