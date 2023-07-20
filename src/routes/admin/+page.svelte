<script lang="ts">
	import type { SupaView } from '$lib/supa_view';
	export let data: { views: Promise<SupaView[]> };
</script>

<section id="admin-panel" class="w-full h-full flex items-center justify-center overflow-scroll">
	<div class="card mt-10 w-full lg:w-1/2">
		{#await data.views}
			<p>loading views</p>
		{:then supa_views}
			<table class="w-full">
				<tr class="w-full">
					<th class="border border-1 border-primary-900 p-1">Id</th>
					<th class="border border-1 border-primary-900 p-1">Ip Addres</th>
					<th class="border border-1 border-primary-900 p-1">View Count</th>
					<th class="border border-1 border-primary-900 p-1">Ignore</th>
				</tr>
				{#each supa_views as view}
					<tr class="w-full">
						<td class="border border-1 border-primary-900 p-1">{view.id}</td>
						<td class="border border-1 border-primary-900 p-1"
							><a href="http://{view.ip}" class="hover:underline">{view.ip}</a></td
						>
						<td class="border border-1 border-primary-900 p-1">{view.count}</td>
						<td class="border border-1 border-primary-900 p-1">{view.ignore}</td>
					</tr>
				{/each}
			</table>
		{/await}
	</div>
</section>
