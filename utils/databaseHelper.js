import { getFirebaseApp } from "./firebaseInit";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";

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

