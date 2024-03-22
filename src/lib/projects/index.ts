import { Content as FrontpageContent, project as frontpage } from './frontpage';
import { Content as LeptitcoinV2Content, project as leptitcoinV2 } from './leptitcoinv2';
import Project from './project.svelte';

type ProjectInfo = {
	name: string;
	summary: string;
	github: {
		repository: string;
		branch: string;
	};
};

const projects = {
	frontpage: {
		info: frontpage,
		content: FrontpageContent
	},
	leptitcoin: {
		info: leptitcoinV2,
		content: LeptitcoinV2Content
	}
} as const;

export { Project, projects, type ProjectInfo };
