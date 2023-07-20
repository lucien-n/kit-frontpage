<script lang="ts">
	import type { Search } from '$lib/types/search';
	import { writable, type Writable } from 'svelte/store';

	import IpInfoModal from '$comp/IpInfoModal.svelte';
	import { formatDate } from '$lib/helper';
	import ChevronDownSvg from '$lib/svgs/chevron_down.svg?raw';
	import ChevronUpSvg from '$lib/svgs/chevron_up.svg?raw';
	import InfoSvg from '$lib/svgs/info.svg?raw';
	import UnlockSvg from '$lib/svgs/unlock.svg?raw';
	import {
		modalStore,
		type ModalComponent,
		type ModalSettings,
		filter
	} from '@skeletonlabs/skeleton';

	export let data: { supa_views: SupaView[] };

	let { supa_views } = data;
	$: ({ supa_views } = data);

	$: filtered_views = supa_views;
	$: last_viewed_info = supa_views[0];

	let columns: Search['by'][] = ['id', 'ip', 'count', 'ignore', 'last_viewed'];

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
				return (a.count || 1) > (b.count || 0) ? 1 : -1;
			});
		else if (params.by === 'ignore')
			views = supa_views.sort((a, b) => {
				return a.ignore ? 1 : -1;
			});
		else if (params.by === 'last_viewed')
			views = supa_views.sort((a, b) => {
				return new Date(a.created_at || 0) > new Date(b.created_at || 0) ? 1 : -1;
			});

		return $search.direction === 'asc' ? views : views.reverse();
	}

	function searchBy(by: Search['by']) {
		$search.by = by;
		$search.direction = $search.direction === 'asc' ? 'desc' : 'asc';
	}

	async function getViewIpInfo(ip: string): Promise<object> {
		const resp = await fetch(`http://ip-api.com/json/${ip}?fields=22282239`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await resp.json();
		if (!data) return { message: 'error' };

		return data;
	}

	async function openModal(ip: string) {
		last_viewed_info = supa_views.filter((view) => view.ip === ip)[0];

		const ip_info = await getViewIpInfo(ip);

		const modalComponent: ModalComponent = {
			ref: IpInfoModal,
			props: { ip, ip_info }
		};

		const settings: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(settings);
	}

	function getCount(views_to_count: SupaView[]): number {
		let total = 0;

		views_to_count.forEach(({ count }) => (total += count || 0));

		return total;
	}

	search.subscribe(({ by, direction }) => (filtered_views = filterViews({ by, direction })));
</script>

<section id="admin-panel" class=" w-full h-full flex flex-col items-center justify-center">
	<div class="w-full my-2">
		<button
			on:click={() => openModal(last_viewed_info.ip)}
			class="btn variant-filled-surface flex mx-auto">See last selected</button
		>
	</div>
	<div
		class="card h-[90%] w-[98%] xl:w-[80%] overflow-y-auto hide-scrollbar border border-surface-600"
	>
		{#await filtered_views then views}
			<table class="w-full overflow-y-auto border-collapse">
				<thead class="sticky top-0 bg-surface-900">
					<tr>
						{#each columns as col}
							<th class="p-3">
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
				</thead>
				<tbody>
					{#each views as view}
						<tr class="w-full even:bg-surface-700 focus:border border-1 border-primary-500">
							<td class="border border-1 border-surface-600 p-1">{view.id}</td>
							<td class="border border-1 border-surface-600 p-1 flex justify-between flex-wrap">
								<a href="http://{view.ip}" class="hover:underline" style="font-weight: 500;"
									>{view.ip}</a
								>
								<span class="flex gap-3">
									<button on:click={() => openModal(view.ip)}>
										{@html InfoSvg}
									</button>

									<a
										href="https://www.yougetsignal.com/tools/open-ports/?remoteAddress={view.ip}"
										class="flex self-center"
										target="_blank">{@html UnlockSvg}</a
									>
								</span>
							</td>
							<td class="border border-1 border-surface-600 p-1">{view.count}</td>
							<td
								class="border border-1 border-surface-600 p-1 {view.ignore
									? 'text-green-500'
									: ' text-red-500'}">{view.ignore}</td
							>
							<td class="border border-1 border-surface-600 p-1"
								>{formatDate(view.last_viewed || 0)}</td
							>
						</tr>
					{/each}
				</tbody>
				<tfoot class="sticky bottom-0 bg-surface-900">
					<tr>
						<td class="p-3" colspan="100">
							<span class="flex justify-between">
								<p>
									{filtered_views.length} entries
								</p>
								<p>
									{filtered_views.filter((view) => !view.ignore).length} non-ignored entries
								</p>
								<p>
									{getCount(filtered_views)} views total
								</p>
								<p>
									{getCount(filtered_views.filter((view) => !view.ignore))} non-ignored views
								</p>
							</span>
						</td>
					</tr>
				</tfoot>
			</table>
		{/await}
	</div>
</section>
