<script lang="ts">
	import { Project } from '$lib/projects';
	import * as Accordion from '$ui/accordion';
</script>

<Accordion.Root value="frontpage" class="w-full">
	<Project name="frontpage" />
	<Project name="leptitcoinV2" />
	<Project name="windows" />
</Accordion.Root>
