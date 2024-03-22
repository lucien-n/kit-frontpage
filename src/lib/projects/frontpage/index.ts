import type { ProjectInfo } from '..';
import Content from './content.svelte';

const projectInfo: ProjectInfo = {
	name: 'Frontpage',
	summary: 'Portfolio-ish',
	github: {
		repository: 'kit-frontpage',
		branch: 'main'
	}
};

export { projectInfo as project, Content };
