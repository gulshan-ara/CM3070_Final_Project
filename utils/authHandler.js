import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseApp } from "./firebaseInit";

export const registerNewUser = (email, password) => {
	const app = getFirebaseApp();
	const auth = getAuth(app);
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log("User signed up successfully", user.email);
		})
		.catch((error) => {
			const errorMessage = error.message;
			console.log(errorMessage);
		});
};

export const signInExistingUser = (email, password) => {
	const app = getFirebaseApp();
	const auth = getAuth(app);
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log("User logged in successfully", user.email);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorMessage);
		});
};
