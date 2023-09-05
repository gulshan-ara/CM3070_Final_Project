/** Home page - The first screen of the task manager app UI is developed here. */

// Import libraries
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Import components & functions from this project
import HeaderTabButton from "../components/HeaderTabButton";
import TaskView from "../components/TaskView";
import AwesomeAlert from "react-native-awesome-alerts";
import { editTask, getTaskList } from "../utils/databaseHelper";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import GroupedTasks from "../components/GroupedTasks";
import { getFirebaseApp } from "../utils/firebaseInit";
import { child, getDatabase, ref, onValue, off } from "firebase/database";

// A component used in top link bar
// the repetative code for each link is turned into a function to increase readability & usability
const CustomLinkText = ({ title, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.linkText}>{title}</Text>
		</TouchableOpacity>
	);
};

// The main component for home screen
const HomeScreen = ({ navigation }) => {
	// user id is stored for fetching other related data's of current user
	const userId = useSelector((state) => state.user.userId);
	const [showAlert, setShowAlert] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [alltaskList, setAllTaskList] = useState([]);
	const [completedTaskList, setCompletedTaskList] = useState([]);
	const [todaysTaskList, setTodaysTaskList] = useState([]);
	const [overDueTaskList, setOverDueTaskList] = useState([]);
	const [tomorrowsTaskList, setTomorrowsTaskList] = useState([]);
	const [taskData, setTaskData] = useState({});
	const [isHome, setIsHome] = useState(true);
	const [isCompleted, setIsCompleted] = useState(false);
	const [isUpcoming, setIsUpcoming] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());

	// side effect to update date daily
	useEffect(() => {
		// running the effect everyday
		const interval = setInterval(() => {
			setCurrentDate(new Date());
		}, 86400000);
		return () => clearInterval(interval);
	}, []);

	// Side effect on page load
	/** In this effect hook, A navigation related icon added in the header of the screen
	 * using expo vector icons & react native header buttons packages.
	 * This code runs only once during page load.
	 */
	useEffect(() => {
		// adding headerRight property in options of header
		navigation.setOptions({
			headerRight: () => {
				return (
					// Custom component is used to enhance usability & readability of code
					<HeaderButtons HeaderButtonComponent={HeaderTabButton}>
						<Item
							title="New Task"
							iconName="new-message"
							onPress={() =>
								navigation.navigate("New Task", {
									userId: userId,
								})
							}
						/>
					</HeaderButtons>
				);
			},
		});
	}, []);

	// filtering out completed tasks from db
	const filteringCompletedTasks = (taskList) => {
		const taskArray = [];
		Object.values(taskList).map((item) => {
			if (item.completed === true) {
				taskArray.push(item);
			}
		});
		return taskArray;
	};

	// filtering tasks due today
	const filteringTodayTasks = (taskList) => {
		const tasksOfToday = [];
		Object.values(taskList).map((item) => {
			const taskDueDate = new Date(item.dueDate).toDateString();
			const todaysDate = currentDate.toDateString();
			if (todaysDate === taskDueDate) {
				tasksOfToday.push(item);
			}
		});
		return tasksOfToday;
	};

	// filtering overdue tasks
	const filteringOverDueTasks = (taskList) => {
		const overDueTasks = [];
		Object.values(taskList).map((item) => {
			const taskDueDate = new Date(item.dueDate).getTime();
			const todaysDate = currentDate.getTime();
			if (
				todaysDate - 86400000 > taskDueDate &&
				item.completed !== true
			) {
				overDueTasks.push(item);
			}
		});
		return overDueTasks;
	};

	// filteringg tasks for tomorrow
	const filteringTomorrowsTasks = (taskList) => {
		const tasksOfTomorrow = [];
		Object.values(taskList).map((item) => {
			const taskDueDate = new Date(item.dueDate).toDateString();
			const tomorrowsDate = new Date(
				currentDate.getTime() + 86400000
			).toDateString();
			if (tomorrowsDate === taskDueDate) {
				tasksOfTomorrow.push(item);
			}
		});
		return tasksOfTomorrow;
	};

	// fetching task list from db when new task is being added
	useEffect(() => {
		const fetchTaskList = async () => {
			try {
				// loading indicator until data is fetched
				setIsLoading(true);
				const retrievedtaskList = alltaskList;
				console.log(retrievedtaskList);
				const completedTasks = filteringCompletedTasks(
					retrievedtaskList
				);
				// storing completed tasks list
				setCompletedTaskList(completedTasks);
				setTodaysTaskList(filteringTodayTasks(retrievedtaskList));
				setTomorrowsTaskList(
					filteringTomorrowsTasks(retrievedtaskList)
				);
				setOverDueTaskList(filteringOverDueTasks(retrievedtaskList));
				// hide loading indicator after data is fetched
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		};
		fetchTaskList();
	}, [alltaskList]);

	// fetching tasklist from database & adding it to local state
	useEffect(() => {
		const app = getFirebaseApp();
		const dbRef = ref(getDatabase(app));
		const taskListRef = child(dbRef, `users/${userId}/tasks`);

		onValue(taskListRef, (snapshot) => {
			const taskList = [];
			snapshot.forEach((childSnapshot) => {
				const task = childSnapshot.val();
				taskList.push(task);
			});

			setAllTaskList(taskList);
		});

		return () => {
			// Clean up the Firebase listener when the component unmounts
			off(taskListRef);
		};
	}, []);

	// Main UI renderer
	return (
		<View style={styles.container}>
			{/* Top link conatiner - still under development */}
			<View style={styles.topLinkContainer}>
				<CustomLinkText
					title="Home"
					onPress={() => {
						setIsHome(true);
						setIsCompleted(false);
						setIsUpcoming(false);
					}}
				/>
				<CustomLinkText
					title="Upcoming"
					onPress={() => {
						setIsHome(false);
						setIsCompleted(false);
						setIsUpcoming(true);
					}}
				/>
				<CustomLinkText
					title="Completed"
					onPress={() => {
						setIsHome(false);
						setIsCompleted(true);
						setIsUpcoming(false);
					}}
				/>
			</View>

			{/* loading indicator */}
			{isLoading && (
				<ActivityIndicator
					size="large"
					color="black"
					style={{ marginVertical: 200 }}
				/>
			)}
			{/* view to render no task is added yet */}
			{Object.keys(alltaskList).length === 1 && (
				<View>
					<TaskView
						taskName={Object.values(alltaskList)[0].taskName}
						dueDate={Object.values(alltaskList)[0].dueDate}
						priorityStatus={
							Object.values(alltaskList)[0].priorityStatus
						}
						recurrenceStatus={
							Object.values(alltaskList)[0].recurrenceStatus
						}
						onPress={() =>
							navigation.navigate("Task Details", {
								taskName: Object.values(alltaskList)[0]
									.taskName,
								taskDetails: Object.values(alltaskList)[0]
									.taskDetails,
								priorityStatus: Object.values(alltaskList)[0]
									.priorityStatus,
								startDate: Object.values(alltaskList)[0]
									.startDate,
								dueDate: Object.values(alltaskList)[0].dueDate,
								recurrenceStatus: Object.values(alltaskList)[0]
									.recurrenceStatus,
								taskId: Object.values(alltaskList)[0].taskId,
								userId: userId,
							})
						}
					/>
					<View style={styles.midContainer}>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "600",
								letterSpacing: 0.3,
							}}
						>
							No task added yet😢
						</Text>
						<CustomButton
							buttonText="Add Task"
							onPress={() =>
								navigation.navigate("New Task", {
									userId: userId,
								})
							}
						/>
					</View>
				</View>
			)}
			{/* Scrollable view to render items from data array */}
			{isHome && Object.keys(alltaskList).length > 1 && (
				<ScrollView style={{ height: "88%" }}>
					{/* Showing tasks by group */}
					{/* Today's Tasks */}
					<GroupedTasks
						label="Today"
						taskList={todaysTaskList}
						setShowAlert={setShowAlert}
						setTaskData={setTaskData}
						userId={userId}
					></GroupedTasks>
					{/* SHOW TOMORROW'S TASK HERE */}
					<GroupedTasks
						label="Tomorrow"
						taskList={tomorrowsTaskList}
						setShowAlert={setShowAlert}
						setTaskData={setTaskData}
						userId={userId}
					></GroupedTasks>
					{/* Overdue tasks */}
					<GroupedTasks
						label="OverDue Tasks"
						taskList={overDueTaskList}
						setShowAlert={setShowAlert}
						setTaskData={setTaskData}
						userId={userId}
					></GroupedTasks>
				</ScrollView>
			)}

			{/* Scrollable view to render items from data array */}
			{isCompleted && completedTaskList !== null && (
				<ScrollView style={{ height: "88%" }}>
					{/* Iterating over the task array */}
					{Object.values(completedTaskList).map((item) => {
						return (
							// Custom component used to render the view of task
							<TaskView
								key={item.taskName}
								taskName={item.taskName}
								dueDate={item.dueDate}
								priorityStatus={item.priorityStatus}
								recurrenceStatus={item.recurrenceStatus}
								onPress={() =>
									navigation.navigate("Task Details", {
										taskName: item.taskName,
										taskDetails: item.taskDetails,
										priorityStatus: item.priorityStatus,
										startDate: item.startDate,
										dueDate: item.dueDate,
										recurrenceStatus: item.recurrenceStatus,
										taskId: item.taskId,
										userId: userId,
									})
								}
								onLongPress={() => {
									setTaskData(item);
									setShowAlert(true);
								}}
							/>
						);
					})}
				</ScrollView>
			)}
			<AwesomeAlert
				show={showAlert}
				title="Mark as Completed?"
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={false}
				showConfirmButton={true}
				showCancelButton={true}
				cancelText="No"
				confirmText="Yes"
				confirmButtonColor="dodgerblue"
				cancelButtonColor="lightgrey"
				titleStyle={{ letterSpacing: 0.3 }}
				onConfirmPressed={() => {
					const updatedTaskData = { ...taskData, completed: true };
					editTask(userId, taskData.taskId, updatedTaskData);
					setShowAlert(false);
				}}
				onDismiss={() => {
					setShowAlert(false);
				}}
				onCancelPressed={() => {
					setShowAlert(false);
				}}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "beige",
	},
	topLinkContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		margin: 10,
		backgroundColor: "lemonchiffon",
		paddingVertical: 10,
	},
	linkText: {
		fontSize: 20,
		fontWeight: "700",
	},
	midContainer: {
		height: 400,
		alignItems: "center",
		marginVertical: 100,
	},
	modalView: {
		width: 250,
	},
	modalText: {
		fontSize: 16,
		letterSpacing: 0.3,
		marginVertical: 10,
	},
});
