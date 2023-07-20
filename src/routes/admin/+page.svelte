<script lang="ts">
	import type { Search } from '$lib/types/search';
	import type { SupaView } from '$lib/types/supa_view';
	import { writable, type Writable } from 'svelte/store';

	import ChevronUpSvg from '$lib/svgs/chevron_up.svg?raw';
	import ChevronDownSvg from '$lib/svgs/chevron_down.svg?raw';
	import UnlockSvg from '$lib/svgs/unlock.svg?raw';

	export let data: { supa_views: SupaView[] };

	let { supa_views } = data;
	$: ({ supa_views } = data);

	$: filtered_views = supa_views;

	let columns: Search['by'][] = ['id', 'ip', 'count', 'ignore'];

	const search: Writable<Search> = writable({ by: 'id', direction: 'asc' });

	function filterViews(params: Search) {
		let views: SupaView[] = [];
		if (params.by === 'id')
			views = supa_views.sort((a, b) => {
				return a.id > b.id ? 1 : -1;
			});
		if (params.by === 'ip')
			views = supa_views.sort((a, b) => {
				return a.ip.toUpperCase() > b.ip.toUpperCase() ? 1 : -1;
			});
		else if (params.by === 'count')
			views = supa_views.sort((a, b) => {
				return a.count > b.count ? 1 : -1;
			});
		else if (params.by === 'ignore')
			views = supa_views.sort((a, b) => {
				return a.ignore ? 1 : -1;
			});

		return $search.direction === 'asc' ? views : views.reverse();
	}

	function searchBy(by: Search['by']) {
		$search.by = by;
		$search.direction = $search.direction === 'asc' ? 'desc' : 'asc';
	}

	async function getViewFlag(ip: string): Promise<string> {
		const resp = await fetch(`https://api.ip2flag.com/${ip}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				Origin: 'localhost'
			}
		});
		const flag = await resp.json();
		if (!flag) return 'err';

		return flag.flag;
	}

	search.subscribe(({ by, direction }) => (filtered_views = filterViews({ by, direction })));
</script>

<section id="admin-panel" class="w-full h-full flex items-center justify-center overflow-scroll">
	<div class="card mt-10 h-[90%] w-[98%] xl:w-1/2 overflow-y-auto hide-scrollbar">
		{#await filtered_views}
			<p>loading views</p>
		{:then views}
			<table class="w-full overflow-y-auto border-collapse">
				<tr class="w-full">
					{#each columns as col}
						<th class="border border-1 border-surface-700 p-1">
							<span class="flex hover:underline">
								<button
									class="hover:underline flex self-center justify-between w-full"
									on:click={() => searchBy(col)}
								>
									{col}
									{#if $search.direction === 'asc'}
										{@html ChevronUpSvg}
									{:else}
										{@html ChevronDownSvg}
									{/if}
								</button>
							</span>
						</th>
					{/each}
				</tr>
				{#each views as view}
					<tr class="w-full even:bg-surface-700">
						<td class="border border-1 border-surface-600 p-1">{view.id}</td>
						<td class="border border-1 border-surface-600 p-1 flex justify-between">
							<a href="http://{view.ip}" class="hover:underline" style="font-weight: 500;"
								>{view.ip}</a
							>
							<span class="flex gap-3">
								{#await getViewFlag(view.ip) then src}
									<img {src} alt="flag" />
								{/await}
								<a
									href="https://www.yougetsignal.com/tools/open-ports/?remoteAddress={view.ip}"
									class="flex self-center"
									target="_blank">{@html UnlockSvg}</a
								>
							</span>
						</td>
						<td class="border border-1 border-surface-600 p-1">{view.count}</td>
						<td class="border border-1 border-surface-600 p-1">{view.ignore}</td>
					</tr>
				{/each}
			</table>
		{/await}
	</div>
</section>
