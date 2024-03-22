import type { ProjectInfo } from '..';
import Content from './content.svelte';

const projectInfo: ProjectInfo = {
	name: 'Windows',
	summary: 'See for yourself',
	badges: ['sveltekit', 'shadcn', 'wip'],
	link: 'https://windows.lucienn.dev',
	github: {
		repository: 'kit-windows',
		branch: 'main'
	}
};

export { projectInfo as project, Content };
