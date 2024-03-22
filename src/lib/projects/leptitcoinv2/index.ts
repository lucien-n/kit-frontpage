import type { ProjectInfo } from '..';
import Content from './content.svelte';

const projectInfo: ProjectInfo = {
	name: 'Leptitcoin V2',
	summary: 'Listing website',
	github: {
		repository: 'skit-lepticoin-v2',
		branch: 'dev'
	}
};

export { projectInfo as project, Content };
