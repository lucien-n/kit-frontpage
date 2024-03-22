<script lang="ts">
	import { Project } from '$lib/projects';
	import * as Accordion from '$ui/accordion';
</script>

<Accordion.Root
	value="frontpage"
	class="w-full rounded-md border-primary/20 bg-background/20 py-8 backdrop-blur-3xl sm:border sm:px-12 sm:shadow-sm"
>
	<Project name="frontpage" />
	<Project name="leptitcoinV2" />
	<Project name="windows" />
</Accordion.Root>
