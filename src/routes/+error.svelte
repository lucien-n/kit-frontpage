<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '&/button';
	import { Separator } from '&/separator';
	import { ChevronRight } from 'lucide-svelte';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="flex justify-center gap-8">
		<h1 class="text-9xl font-bold tracking-tight">
			{$page.status}
		</h1>
		<div>
			<Separator orientation="vertical" />
		</div>
		<div>
			<p class="text-xl">
				{$page.error?.message}
			</p>
			<Button class="p-0 text-base text-muted-foreground" variant="link" href="/">
				<ChevronRight class="mt-1" />
				Navigate back home
			</Button>
		</div>
	</div>
</div>
