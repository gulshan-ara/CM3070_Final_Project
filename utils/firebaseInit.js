// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFirebaseApp = () => {
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
    apiKey: "AIzaSyCWaShWMS9q_DIJOtAWQJV0plsA4iZ-xq8",
    authDomain: "cm3070-final-project.firebaseapp.com",
    projectId: "cm3070-final-project",
    storageBucket: "cm3070-final-project.appspot.com",
    messagingSenderId: "671604184071",
    appId: "1:671604184071:web:9270ae71e71df732e586a2"
  };

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	return app;
};
