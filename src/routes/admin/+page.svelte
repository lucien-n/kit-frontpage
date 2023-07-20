<script lang="ts">
	import type { Search } from '$lib/types/search';
	import type { SupaView } from '$lib/types/supa_view';
	import { writable, type Writable } from 'svelte/store';
	import { browser } from '$app/environment';

	import ChevronUpSvg from '$lib/svgs/chevron_up.svg?raw';
	import ChevronDownSvg from '$lib/svgs/chevron_down.svg?raw';
	import UnlockSvg from '$lib/svgs/unlock.svg?raw';
	import InfoSvg from '$lib/svgs/info.svg?raw';
	import {
		popup,
		type ModalSettings,
		type PopupSettings,
		modalStore,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import IpInfoModal from '$comp/IpInfoModal.svelte';

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
								<!-- {#await getViewFlag(view.ip) then src}
									<img {src} alt="flag" />
								{/await} -->
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
						<td class="border border-1 border-surface-600 p-1">{view.ignore}</td>
					</tr>
				{/each}
			</table>
		{/await}
	</div>
</section>
