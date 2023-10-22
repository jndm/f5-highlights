import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { VideoDoc } from '$lib/models/video';
import { FIREBASE_VIDEO_COLLECTION_PATH } from '$env/static/private';
import { getAdminDb } from '$lib/firebase/firebase-admin';

export const load = (async ({ locals, params }) => {
	if (!locals.user) throw redirect(307, '/login');

	try {
		const snapshot = await getAdminDb()
			.collection(FIREBASE_VIDEO_COLLECTION_PATH)
			.doc(params.id)
			.get();

		const video: VideoDoc = snapshot.data() as VideoDoc;
		return { video };
	} catch (err) {
		throw redirect(303, '/');
	}
}) satisfies PageServerLoad;
