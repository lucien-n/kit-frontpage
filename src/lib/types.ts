export type Commit = {
	message: string;
	author: string;
	date?: string;
};

export type Repository = {
	name: string;
	latestCommit: Commit;
};
