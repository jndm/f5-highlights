import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { userStore } from '../stores/user';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export const googleSignin = async () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			const authUser = result.user;
			userStore.set({
				uid: authUser.uid,
				email: authUser.email
			});
		})
		.catch((error) => {
			console.error(error);
		});
};

export const logout = () => {
	signOut(auth);
};
