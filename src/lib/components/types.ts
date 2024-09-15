import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export type IconLinkProps = {
	href: string;
	label: string;
	icon: ComponentType<Icon>;
};
