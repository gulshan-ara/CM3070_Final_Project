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
import React, { useEffect, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Import components & functions from this project
import HeaderTabButton from "../components/HeaderTabButton";
import TaskView from "../components/TaskView";
import AwesomeAlert from "react-native-awesome-alerts";
import { editTask, fetchUserInfo, getTaskList } from "../utils/databaseHelper";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import GroupedTasks from "../components/GroupedTasks";
import { getFirebaseApp } from "../utils/firebaseInit";
import { child, getDatabase, ref, onValue, off } from "firebase/database";
import {
	allUsersList,
	updateHairObj,
	userEmailInfo,
	userNameInfo,
	userPosts,
} from "../redux_store/userSlice";
import HairCard from "../components/HairCard";

// A component used in top link bar
// the repetative code for each link is turned into a function to increase readability & usability
const CustomLinkText = ({ title, onPress, onFocus }) => {
	// check if onFocus and show a different color text
	let styledText;
	if (onFocus === true) {
		styledText = { ...styles.linkText, color: "rgba(60, 179, 113, 0.6)" };
	} else {
		styledText = styles.linkText;
	}

	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={styledText}>{title}</Text>
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
	const [upcomingTaskList, setUpcomingTaskList] = useState({});
	const [taskData, setTaskData] = useState({});
	const [isHome, setIsHome] = useState(true);
	const [isCompleted, setIsCompleted] = useState(false);
	const [isUpcoming, setIsUpcoming] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());
	const dispatch = useDispatch();

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
			if (item.completed !== true) {
				const taskDueDate = new Date(item.dueDate).toDateString();
				const todaysDate = currentDate.toDateString();
				if (todaysDate === taskDueDate) {
					tasksOfToday.push(item);
				}
			}
		});
		return tasksOfToday;
	};

	// filtering overdue tasks
	const filteringOverDueTasks = (taskList) => {
		const overDueTasks = [];
		Object.values(taskList).map((item) => {
			if (item.completed !== true) {
				const taskDueDate = new Date(item.dueDate).getTime();
				const todaysDate = currentDate.getTime();
				if (
					todaysDate - 86400000 > taskDueDate &&
					item.completed !== true
				) {
					overDueTasks.push(item);
				}
			}
		});
		return overDueTasks;
	};

	// filteringg tasks for tomorrow
	const filteringTomorrowsTasks = (taskList) => {
		const tasksOfTomorrow = [];
		Object.values(taskList).map((item) => {
			if (item.completed !== true) {
				const taskDueDate = new Date(item.dueDate).toDateString();
				const tomorrowsDate = new Date(
					currentDate.getTime() + 86400000
				).toDateString();
				if (tomorrowsDate === taskDueDate) {
					tasksOfTomorrow.push(item);
				}
			}
		});
		return tasksOfTomorrow;
	};

	// filtering upcoming tasks
	useEffect(() => {
		// making array of objects for unique due dates of task
		const tasksGroupBydueDates = alltaskList.reduce((acc, task) => {
			const dueDateOfTask = task.dueDate;
			// checking if the task is completed or not
			if (task.completed !== true) {
				// task due date is later than today's date
				if (new Date(dueDateOfTask).getTime() > currentDate.getTime()) {
					if (!acc[dueDateOfTask]) {
						acc[dueDateOfTask] = [];
					}
					acc[dueDateOfTask].push(task);
				}
			}
			return acc;
		}, {});

		// storing the array in local state
		setUpcomingTaskList(tasksGroupBydueDates);
	}, [alltaskList]);

	// fetching task list from db when new task is being added
	useEffect(() => {
		const fetchTaskList = async () => {
			try {
				// loading indicator until data is fetched
				setIsLoading(true);
				const retrievedtaskList = alltaskList;
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
		const postsRef = child(dbRef, `users/${userId}/posts`);
		const hairRef = child(dbRef, `users/${userId}/hairType`);
		const usersRef = child(dbRef, `users`);
		const refs = [taskListRef, postsRef, usersRef, hairRef];

		// when data changes on database
		onValue(taskListRef, (snapshot) => {
			const taskList = [];
			snapshot.forEach((childSnapshot) => {
				const task = childSnapshot.val();
				taskList.push(task);
			});

			// saving the freshly fetched data to local state
			setAllTaskList(taskList);
		});

		// fetch posts created by user from database
		onValue(postsRef, (snapshot) => {
			const postsList = [];
			snapshot.forEach((childSnapshot) => {
				const post = childSnapshot.val();
				postsList.push(post);
			});

			// saving posts in redux store
			dispatch(userPosts({ postListArray: postsList }));
		});

		// fetch posts created by user from database
		onValue(usersRef, (snapshot) => {
			const usersList = [];
			snapshot.forEach((childSnapshot) => {
				const user = childSnapshot.val();
				const userName = user.name;
				const fetchedUserId = user.userId;
				if (fetchedUserId !== userId) {
					usersList.push({ userName, fetchedUserId });
				}
			});

			// saving posts in redux store
			dispatch(allUsersList({ usersList: usersList }));
		});

		// tracking hairType node of db & saving in redux store
		onValue(hairRef, (snapshot) => {
			const hairObject = snapshot.val();
			dispatch(updateHairObj({ hairObject }));
		});

		return () => {
			// Closing the db call when the component unmounts
			refs.forEach((ref) => off(ref));
		};
	}, []);

	// Fetching user name and email from database and saving in redux store
	useEffect(() => {
		const userBasicInfo = async () => {
			const info = await fetchUserInfo(userId);
			dispatch(userNameInfo({ userName: info.name }));
			dispatch(userEmailInfo({ userEmail: info.email }));
		};

		userBasicInfo();
	}, []);

	// fetch hairNode from state
	const hairNode = useSelector((state) => state.user.hairObj);

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
					onFocus={isHome}
				/>
				<CustomLinkText
					title="Upcoming"
					onPress={() => {
						setIsHome(false);
						setIsCompleted(false);
						setIsUpcoming(true);
					}}
					onFocus={isUpcoming}
				/>
				<CustomLinkText
					title="Completed"
					onPress={() => {
						setIsHome(false);
						setIsCompleted(true);
						setIsUpcoming(false);
					}}
					onFocus={isCompleted}
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
					{/* dummy task view */}
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
					{/* Show hair task card */}
					{hairNode !== null && hairNode.isShown === true && (
						<HairCard
							onPress={() => {
								navigation.navigate("Hair Task");
							}}
						/>
					)}
					{/* Add task button */}
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
					{/* Show hair tasks card */}
					{hairNode !== null && hairNode.isShown === true && (
						<HairCard
							onPress={() => {
								navigation.navigate("Hair Task");
							}}
						/>
					)}
					{/* preventing empty screen */}
					{todaysTaskList.length === 0 &&
						tomorrowsTaskList.length === 0 &&
						overDueTaskList.length === 0 && (
							<View style={styles.midContainer}>
								<Text
									style={{
										fontSize: 16,
										fontWeight: "600",
										letterSpacing: 0.3,
									}}
								>
									Add more tasks
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
						)}
					{/* Showing tasks by group */}
					{/* Today's Tasks */}
					{Object.keys(todaysTaskList).length !== 0 && (
						<GroupedTasks
							label="Today"
							taskList={todaysTaskList}
							setShowAlert={setShowAlert}
							setTaskData={setTaskData}
							userId={userId}
						></GroupedTasks>
					)}
					{/* SHOW TOMORROW'S TASK HERE */}
					{Object.keys(tomorrowsTaskList).length !== 0 && (
						<GroupedTasks
							label="Tomorrow"
							taskList={tomorrowsTaskList}
							setShowAlert={setShowAlert}
							setTaskData={setTaskData}
							userId={userId}
						></GroupedTasks>
					)}
					{/* Overdue tasks */}
					{Object.keys(overDueTaskList).length !== 0 && (
						<GroupedTasks
							label="OverDue Tasks"
							taskList={overDueTaskList}
							setShowAlert={setShowAlert}
							setTaskData={setTaskData}
							userId={userId}
						></GroupedTasks>
					)}
				</ScrollView>
			)}

			{/* showing upcoming task list */}
			{isUpcoming && upcomingTaskList !== null && (
				<ScrollView style={{ height: "88%" }}>
					{Object.keys(upcomingTaskList).map((item) => {
						return (
							<GroupedTasks
								key={item}
								label={item}
								taskList={upcomingTaskList[item]}
								setShowAlert={setShowAlert}
								setTaskData={setTaskData}
								userId={userId}
							/>
						);
					})}
				</ScrollView>
			)}
			{/* showing empty upcoming task list */}
			{isUpcoming && upcomingTaskList === null && (
				<View style={styles.midContainer}>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "600",
							letterSpacing: 0.3,
						}}
					>
						Add more tasks
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
			)}

			{/* showing empty completed task screen */}
			{isCompleted && completedTaskList.length === 0 && (
				<View style={styles.midContainer}>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "600",
							letterSpacing: 0.3,
						}}
					>
						No completed tasks yet
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
										completed: item.completed,
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
