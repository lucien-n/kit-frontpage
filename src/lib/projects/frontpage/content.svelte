<script lang="ts">
	import { PUBLIC_GITHUB_OWNER } from '$env/static/public';
	import { Button } from '$ui/button';
</script>

<div class="leading-6">
	<b>Frontpage</b> is the website you're currently on. <br />
	It's purpose is to put on display a few of my projects. <br />
	Checkout
	<Button variant="link" href="https://github.com/{PUBLIC_GITHUB_OWNER}" class="h-fit px-0 py-0">
		my github
	</Button>
	for more
</div>
