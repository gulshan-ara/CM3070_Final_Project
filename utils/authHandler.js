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
		// As no email can be used twice to sign up, so the user id is created from email
		// here all characters are removed from the email address thus pure string values only
		const userId = userEmail.replace(/[^a-zA-Z0-9 ]/g, '');
		console.log(userId);
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
		const userId = userEmail.replace(/[^a-zA-Z0-9 ]/g, '');
		console.log(userId);
		return userId;
	} catch (error) {
		console.log(error);
	}
};
