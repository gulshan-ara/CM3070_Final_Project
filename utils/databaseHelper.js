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

// add new user info to database
export const addNewUserToDB = async (name, email, userId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const userRef = child(dbRef, `users/${userId}`);

		const userData = {
			name,
			email,
			userId,
		};

		await set(userRef, userData);
	} catch (error) {
		console.log(error);
	}
};

// add new task for an user
export const addNewTaskForUser = async (userId, taskId, taskData) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const userRef = child(dbRef, `users/${userId}/tasks/${taskId}`);
		// const taskRef = child(userRef, `tasks/${taskId}`);

		await set(userRef, taskData);
	} catch (error) {
		console.log(error.message);
	}
};

// fetch existing task list for an user
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


// fetch a particular task for an user
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

// delete a task from database
export const deleteTask = async (userId, taskId) => {
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

// edit a task
export const editTask = async (userId, taskId, taskData) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const tasksRef = child(dbRef, `users/${userId}/tasks/${taskId}`);

		await update(tasksRef, taskData);
	} catch (error) {
		console.log(error);
	}
};
