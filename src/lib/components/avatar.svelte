<script lang="ts">
	import * as Avatar from '&/avatar';

	const avatar = 'https://avatars.githubusercontent.com/u/77048269?v=4';
	const alt = 'lucien-n';
	const fallback = 'LN';
</script>

<Avatar.Root class="h-36 w-36">
	<Avatar.Image src={avatar} {alt} />
	<Avatar.Fallback>{fallback}</Avatar.Fallback>
</Avatar.Root>
