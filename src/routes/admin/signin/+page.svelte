<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: { supabase: SupabaseClient };
	export let form;

	let { supabase } = data;
	$: ({ supabase } = data);

	let show_password = false;
	let loading = false;

	const handleSubmit: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		loading = true;
		return async ({ update }: { update: any }) => {
			loading = false;
			update();
		};
	};
</script>

<section class="w-full h-full flex justify-center items-center">
	<form
		use:enhance={handleSubmit}
		action="/admin/signin"
		method="post"
		class="card flex flex-col p-4 gap-3 w-full md:w-1/3 xl:w-1/4"
	>
		{#if form?.message}
			<p class="flex mx-auto italic opacity-70">{form.message}</p>
		{/if}
		<section>
			<label for="email">Email</label>
			<input name="email" id="email" class="input" value={form?.email || ''} />
		</section>
		<section>
			<label for="password">Password</label>
			<div class="input-group flex flex-row">
				<input
					type={show_password ? 'text' : 'password'}
					id="password"
					class="input"
					name="password"
					value={form?.password || ''}
				/>
				<button
					type="button"
					aria-label="show password"
					class="hover:underline"
					on:click={() => (show_password = !show_password)}
				>
					{#if show_password}
						hide
					{:else}
						show
					{/if}
				</button>
			</div>
		</section>
		<hr />
		<button type="submit" class="btn variant-ghost" disabled={loading}
			>{loading ? 'Loading... ' : 'Sign In'}</button
		>
	</form>
</section>
