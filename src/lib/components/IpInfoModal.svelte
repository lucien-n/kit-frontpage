<script lang="ts">
	export let ip: string;
	export let ip_info: any;
	console.log(ip_info);
</script>

<section class="card p-2 gap-2 flex flex-col w-[90%] md:w-1/2 xl:w-1/3">
	<h3 class="h3 w-full">
		<a href="http://{ip}" class="hover:underline">{ip}</a>
	</h3>
	<hr />
	{#each Object.keys(ip_info) as key}
		<span class="flex justify-between"
			><p class="font-bold">{key.slice(0, 1).toUpperCase() + key.slice(1, key.length)}:</p>
			<p>{ip_info[key]}</p>
		</span>
	{/each}
</section>
