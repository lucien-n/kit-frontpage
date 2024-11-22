<script lang="ts">
	import type { IconLinkProps } from './types';
	import * as Tooltip from '&/tooltip';

	interface Props {
		link: IconLinkProps;
	}

	let { link }: Props = $props();
</script>

<Tooltip.Root openDelay={100}>
	<Tooltip.Trigger class="mx-auto">
		<a href={link.href}>
			<link.icon
				class="opacity-70 transition-opacity ease-in-out hover:scale-110 hover:opacity-100"
			/>
		</a>
	</Tooltip.Trigger>
	<Tooltip.Content side="bottom">
		{link.label}
	</Tooltip.Content>
</Tooltip.Root>
