import { verifySessionToken, getAdminDb } from '$lib/firebase/firebase-admin';
import type { CreateVideoErrors } from '$lib/models/form-models';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { VideoDoc } from '$lib/models/video';

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(307, '/login');

	try {
		const snapshot = await getAdminDb().collection(`dev/videos/video`).get();
		return {
			videos: snapshot.docs.map((doc) => ({ ...(doc.data() as VideoDoc), id: doc.id }))
		};
	} catch (err) {
		console.error(err);
	}
}) satisfies PageServerLoad;

export const actions = {
	createVideo: async ({ locals, request }) => {
		if (!locals.user) throw redirect(303, 'login');

		const data = await request.formData();

		const { name, description, videoId } = Object.fromEntries(data);

		const errors: CreateVideoErrors = { name: {}, videoId: {} };
		let validationFailed = false;
		if (!name.length) {
			errors.name!.required = true;
			validationFailed = true;
		}

		if (!videoId.length) {
			errors.videoId!.required = true;
			validationFailed = true;
		}

		if (validationFailed) {
			return fail(400, { errors });
		}

		try {
			const doc = await getAdminDb().collection(`dev/videos/video`).add({
				name,
				description,
				videoId,
				source: 1
			});

			// TODO: Should push to document array fetched in load
			return {
				id: doc.id,
				name,
				description,
				videoId,
				source: 1
			};
		} catch (err) {
			console.error(err);
			return fail(500);
		}
	}
} satisfies Actions;
