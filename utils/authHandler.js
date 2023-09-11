import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirebaseApp } from "./firebaseInit";

export const registerNewUser = async (email, password) => {
	try {
		const app = getFirebaseApp();
		const auth = getAuth(app);
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		// Signed in
		const user = userCredential.user;
		const userEmail = user.email;
		console.log("User signed up successfully", userEmail);

		// return user id
		const userId = userEmail.split("@")[0];
		return userId;
	} catch (error) {
		console.log(error);
	}
};

export const signInExistingUser = async (email, password) => {
	try {
		const app = getFirebaseApp();
		const auth = getAuth(app);
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);

		// Signed in
		const user = userCredential.user;
		const userEmail = user.email;
		console.log("User logged in successfully", userEmail);

		// return user id
		const userId = userEmail.split("@")[0];
		return userId;
	} catch (error) {
		console.log(error);
	}
};
