import Link from './link.svelte';

type TLink = {
	label: string;
	href: string;
};

const links: { [key: string]: TLink } = {
	sveltekit: { label: 'SvelteKit', href: 'https://kit.svelte.dev/' },
	shadcn: { label: 'Shadcn', href: 'https://shadcn-svelte.com/' },
	skeleton: { label: 'Skeleton', href: 'https://www.skeleton.dev/' },
	supabase: { label: 'Supabase', href: 'https://supabase.com/' },
	firebase: { label: 'Firebase', href: 'https://firebase.google.com/' }
} as const;

export { Link, links, type TLink };
