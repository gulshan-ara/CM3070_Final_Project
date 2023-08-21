/** Home page - The first screen of the task manager app UI is developed here. */

// Import libraries
import {
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
import { getTaskList } from "../utils/databaseHelper";
import CustomButton from "../components/CustomButton";

const OpeningModalView = () => {
	return (
		<View style={styles.modalView}>
			<Text style={styles.modalText}>For better app usage</Text>
			<Text>- Press the top icon to add new task.</Text>
			<Text>- Press bottom Icons to navigate through app. </Text>
			<Text>- Press a taskcard to find task details.</Text>
			<Text>- LongPress a task card to see options.</Text>
		</View>
	);
};

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
const HomeScreen = ({ navigation, route }) => {
	// user id is stored for fetching other related data's of current user
	const userId = route.params.userId;
	const [showAlert, setShowAlert] = useState(false);
	const [taskList, setTaskList] = useState([]);

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
							onPress={() => navigation.navigate("New Task")}
						/>
					</HeaderButtons>
				);
			},
		});
	}, []);

	useEffect(() => {
		const fetchTaskList = async () => {
			try {
				const retrievedtaskList = await getTaskList(userId);
				setTaskList(retrievedtaskList);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTaskList();
	}, [taskList]);

	useEffect(() => {
		setShowAlert(true);
	}, []);

	// Main UI renderer
	return (
		<View style={styles.container}>
			{/* Top link conatiner - still under development */}
			<View style={styles.topLinkContainer}>
				<CustomLinkText title="Home" />
				<CustomLinkText title="Upcoming" />
				<CustomLinkText title="Completed" />
			</View>
			{/* view to render no task is added yet */}
			{(taskList === null || taskList === []) && (
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
								screen: "New Task",
								params: { userId: userId },
							})
						}
					/>
				</View>
			)}
			{/* Scrollable view to render items from data array */}
			{taskList !== null && (
				<ScrollView style={{ height: "88%" }}>
					{/* Iterating over the task array */}
					{Object.values(taskList).map((item) => {
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
									})
								}
							/>
						);
					})}
				</ScrollView>
			)}
			<AwesomeAlert
				show={showAlert}
				title="Welcome to I-do"
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={false}
				showConfirmButton={true}
				confirmText="Got It"
				confirmButtonColor="dodgerblue"
				titleStyle={{ letterSpacing: 0.3 }}
				onConfirmPressed={() => {
					setShowAlert(false);
				}}
				onDismiss={() => {
					setShowAlert(false);
				}}
				customView={<OpeningModalView />}
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
		marginVertical: 200,
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
