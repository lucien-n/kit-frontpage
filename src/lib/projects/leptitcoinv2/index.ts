import type { ProjectInfo } from '..';
import Content from './content.svelte';

const projectInfo: ProjectInfo = {
	name: 'Leptitcoin V2',
	summary: 'Listing website',
	badges: ['sveltekit', 'shadcn', 'supabase', 'wip'],
	link: 'https://leptitcoin-v2.lucienn.dev',
	github: {
		repository: 'skit-lepticoin-v2',
		branch: 'dev'
	}
};

export { projectInfo as project, Content };
