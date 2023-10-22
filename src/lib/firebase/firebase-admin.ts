import {
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_PROJECT_ID
} from '$env/static/private';
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const { privateKey } = JSON.parse(FIREBASE_PRIVATE_KEY);

const adminFirebaseConfig = {
	credential: cert({
		projectId: FIREBASE_PROJECT_ID,
		privateKey: privateKey,
		clientEmail: FIREBASE_CLIENT_EMAIL
	})
};

export const getAdminApp = () => (getApps().length ? getApp() : initializeApp(adminFirebaseConfig));

export const getAdminDb = () => getFirestore(getAdminApp());

export const verifyIdToken = (token: string) => {
	const auth = getAuth(getAdminApp());
	return auth.verifyIdToken(token);
};

export const verifySessionToken = (token: string) => {
	const auth = getAuth(getAdminApp());
	return auth.verifySessionCookie(token);
};

// TODO: Poista keksi
export const createSessionCookie = (token: string, maxAge: number) => {
	const expiresIn = maxAge * 1000;
	const auth = getAuth(getAdminApp());
	const session = auth.createSessionCookie(token, { expiresIn });

	return session;
};

export const addAdminClaim = (uid: string) => {
	return getAuth(getAdminApp()).setCustomUserClaims(uid, { admin: true });
};
