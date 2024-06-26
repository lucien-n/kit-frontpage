import { Content as FrontpageContent, project as frontpage } from './frontpage';
import { Content as LeptitcoinV2Content, project as leptitcoinV2 } from './leptitcoinv2';
import { Content as WindowsContent, project as windows } from './windows';
import Project from './project.svelte';
import Projects from './projects.svelte';
import type { BadgeKey } from '$lib/badge';

type ProjectInfo = {
	name: string;
	summary: string;
	badges: BadgeKey[];
	link?: string;
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
	leptitcoinV2: {
		info: leptitcoinV2,
		content: LeptitcoinV2Content
	},
	windows: {
		info: windows,
		content: WindowsContent
	}
} as const;

export { Project, Projects, projects, type ProjectInfo };
