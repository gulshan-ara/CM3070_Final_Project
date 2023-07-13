import { getFirebaseApp } from "./firebaseInit";
import { child, get, getDatabase, ref, remove, set, update } from "firebase/database";

export const addTask = async (taskId, taskData) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const tasksRef = child(dbRef, `tasks/${taskId}`);

		await set(tasksRef, taskData);
	} catch (error) {
		console.log(error);
	}
};

export const getTaskList = async () => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const taskListRef = child(dbRef, `tasks`);

		const snapshot = await get(taskListRef);
		return snapshot.val();
	} catch (error) {
		console.log(error);
	}
};

export const deleteTask = async (taskId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const taskRef = child(dbRef, `tasks/${taskId}`);
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
