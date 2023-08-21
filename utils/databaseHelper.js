import { getFirebaseApp } from "./firebaseInit";
import {
	child,
	get,
	getDatabase,
	ref,
	remove,
	set,
	update,
} from "firebase/database";

export const addNewUserToDB = async (name, email, userId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const userRef = child(dbRef, `users/${userId}`);

		const userData = {
			name,
			email,
			userId
		};

		await set(userRef, userData);
	} catch (error) {
		console.log(error);
	}
};

export const addTask = async (userId, taskId, taskData) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const tasksRef = child(dbRef, `users/${userId}/tasks/${taskId}`);

		await set(tasksRef, taskData);
	} catch (error) {
		console.log(error);
	}
};

export const getTaskList = async (userId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const taskListRef = child(dbRef, `users/${userId}/tasks`);

		const snapshot = await get(taskListRef);
		return snapshot.val();
	} catch (error) {
		console.log(error);
	}
};

export const getTask = async (taskId, userId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const taskRef = child(dbRef, `users/${userId}/tasks/${taskId}`);

		const snapshot = await get(taskRef);
		return snapshot.val();
	} catch (error) {
		console.log(error);
	}
};

export const deleteTask = async (taskId, userId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const taskRef = child(dbRef, `users/${userId}/tasks/${taskId}`);
		console.log(taskRef);
		await remove(taskRef);
	} catch (error) {
		console.log(error);
	}
};

export const editTask = async (taskId, taskData) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const tasksRef = child(dbRef, `tasks/${taskId}`);

		await update(tasksRef, taskData);
	} catch (error) {
		console.log(error);
	}
};
