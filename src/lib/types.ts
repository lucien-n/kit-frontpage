export type Commit = {
	message: string;
	author: string;
	date?: string;
};

export type Repository = {
	name: string;
	latest_commit: Commit;
};
