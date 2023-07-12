import { getFirebaseApp } from "./firebaseInit";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";

export const addTask = async (taskId, taskData) => {
	const app = getFirebaseApp();
	const dbRef = ref(getDatabase(app));
	const tasksRef = child(dbRef, `tasks/${taskId}`);

	await set(tasksRef, taskData);
	return taskData;
};
