import type { CommitInfo } from './commit_info';

export type RepoInfo = {
	name: string;
	latest_commit: CommitInfo;
};
