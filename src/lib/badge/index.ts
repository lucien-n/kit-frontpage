import type { links } from '$lib/link';
import Badge from './badge.svelte';

type TBadge = {
	variant: string;
	label?: string;
	link?: keyof typeof links;
};

const badges = {
	sveltekit: { variant: 'secondary', link: 'sveltekit' },
	shadcn: { variant: 'outline', link: 'shadcn' },
	skeleton: { variant: 'outline', link: 'skeleton' },
	supabase: { variant: 'outline', link: 'supabase' },
	firebase: { variant: 'outline', link: 'firebase' },
	archived: { variant: 'destructive', label: 'Archived' },
	mvp: { variant: 'destructive', label: 'MVP' },
	wip: { variant: 'destructive', label: 'WIP' }
} as const;

type BadgeKey = keyof typeof badges;

export { Badge, badges, type TBadge, type BadgeKey };
