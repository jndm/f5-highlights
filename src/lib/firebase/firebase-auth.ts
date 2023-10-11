import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export const signIn = async (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
	signOut(auth);
};
