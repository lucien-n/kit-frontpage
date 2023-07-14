<script>
	import LinkGroup from '$comp/LinkGroup.svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 w-full">
		<h1 class="h1 text-center">Projects</h1>
		<div class="card p-3 w-1/2 md:w-1/3 mx-auto h-fit">
			<LinkGroup let:L>
				<L.Link project="leptitcoin" stack="sveltekit" status="wip" other="supabase">
					<L.Text>LePtitCoin</L.Text>
					<L.Desc>Listing Website</L.Desc>
				</L.Link>
				<L.Link project="seton" stack="sveltekit" status="finished" other="firebase">
					<L.Text>Seton</L.Text>
					<L.Desc>Notes app</L.Desc>
				</L.Link>
				<L.Link project="calendar" stack="sveltekit" status="wip">
					<L.Text>Calendar</L.Text>
					<L.Desc>Calendar app</L.Desc>
				</L.Link>
			</LinkGroup>
		</div>
	</div>
</div>
