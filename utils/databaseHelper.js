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

		const initialTask = {
			welcomeTask: {
				dueDate: "Long press to mark task as completed",
				priorityStatus: "Press to see task details",
				recurrenceStatus: "No",
				taskName: "Welcome to I-do",
				taskId: "welcomeTask",
				taskDetails: "",
				startDate: ""
			},
		};

		const userData = {
			name,
			email,
			userId,
			tasks: initialTask
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

// add new post for an user
export const addNewPostForUser = async (userId, postId, postData) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const userRef = child(dbRef, `users/${userId}/posts/${postId}`);
		// const taskRef = child(userRef, `tasks/${taskId}`);

		await set(userRef, postData);
	} catch (error) {
		console.log(error.message);
	}
};

// add hair ref for an user
export const addHairRefForUser = async (userId, hairData) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const userRef = child(dbRef, `users/${userId}/hairType`);
		// const taskRef = child(userRef, `tasks/${taskId}`);

		await set(userRef, hairData);
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

// fetch hair type node for an user
export const getHairType = async (userId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const hairTypeRef = child(dbRef, `users/${userId}/hairType`);

		const snapshot = await get(hairTypeRef);
		return snapshot.val();
	} catch (error) {
		console.log(error);
	}
};

// fetch existing post list for an user
export const getPostList = async (userId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const postListRef = child(dbRef, `users/${userId}/posts`);

		const snapshot = await get(postListRef);
		return snapshot.val();
	} catch (error) {
		console.log(error);
	}
};

// fetch basic info for an user
export const fetchUserInfo = async (userId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const userRef = child(dbRef, `users/${userId}`);

		const snapshot = (await get(userRef)).val();

		// fetching only name and email
		const infoObj = {
			name : snapshot.name,
			email : snapshot.email
		}
		return infoObj;
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

		await remove(taskRef);
	} catch (error) {
		console.log(error);
	}
};

// delete a post from database
export const deletePost = async (userId, postId) => {
	try {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const postRef = child(dbRef, `users/${userId}/posts/${postId}`);

		await remove(postRef);
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
