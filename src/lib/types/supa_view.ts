export type SupaView = {
	id: number;
	uid: string;
	created_at: Date;
	last_viewed: Date;
	ip: string;
	count: number;
	info: string | null;
	ignore: boolean;
};
