<script lang="ts">
	export let ip: string;
	export let ip_info: any;
</script>

<section class="card flex flex-col w-[90%] md:w-1/2 xl:w-1/3">
	<h3 class="h3 w-full flex text-center">
		<a href="http://{ip}" class="hover:underline w-full p-3">{ip}</a>
	</h3>
	<hr />
	{#each Object.keys(ip_info).filter((key) => !['status', 'query'].includes(key)) as key}
		<span class="flex justify-between even:bg-surface-700 p-2"
			><p class="font-bold">{key.slice(0, 1).toUpperCase() + key.slice(1, key.length)}:</p>
			{#if ['mobile', 'proxy', 'hosting'].includes(key)}
				<p class={ip_info[key] ? 'text-green-500' : ' text-red-500'}>{ip_info[key]}</p>
			{:else}
				<p>{ip_info[key]}</p>
			{/if}
		</span>
	{/each}
</section>
