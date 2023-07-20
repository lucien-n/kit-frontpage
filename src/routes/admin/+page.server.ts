import type { SupaView } from '$lib/types/supa_view';
import { error } from '@sveltejs/kit';

export const load = async ({ locals: { getSession, supabase } }) => {
	const user = (await getSession())?.user;
	if (!user) throw error(401, { message: 'Unauthorized' });

	const getSupaViews = async (): Promise<SupaView[] | undefined> => {
		const supa_views: SupaView[] = [];
		try {
			const { data: views } = await supabase.from('views').select('*');
			if (!views) return;

			views.forEach((view_data) => {
				const supa_view: SupaView = {
					id: view_data.id,
					created_at: new Date(view_data.created_at),
					ip: view_data.ip,
					count: view_data.count,
					info: view_data.info,
					ignore: view_data.ignore
				};
				supa_views.push(supa_view);
			});

			return supa_views;
		} catch (e) {
			console.warn(e);
		}

		return supa_views;
	};

	return {
		supa_views: await getSupaViews()
	};
};
