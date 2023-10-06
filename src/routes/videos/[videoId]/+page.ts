import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		videoId: params.videoId
	};
}) satisfies PageLoad;
