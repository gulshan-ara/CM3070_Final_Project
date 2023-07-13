// import libraries & packages
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
// importing icon libraries
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// importing components from this project
import CustomButton from "../components/CustomButton";
import { deleteTask } from "../utils/databaseHelper";

const TaskDetailsScreen = ({ navigation, route }) => {
	// retrieving data passed during navigation
	const taskObject = route.params;
	const title = taskObject.taskName;
	const description = taskObject.taskDetails;
	const startDate = taskObject.startDate;
	const dueDate = taskObject.dueDate;
	const priorityStatus = taskObject.priorityStatus;
	const recurrenceStatus = taskObject.recurrenceStatus;
	const taskId = taskObject.taskId;

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => {
				return (
					<TouchableOpacity
						onPress={() => navigation.navigate("I-do")}
					>
						<Ionicons
							name="arrow-back"
							size={24}
							color="black"
							style={{ marginHorizontal: 10, marginVertical: 5 }}
						/>
					</TouchableOpacity>
				);
			},
		});
	}, [navigation]);

	const handleDelete = async () => {
		console.log(taskId);
		await deleteTask(taskId);
		// navigation.goBack();
	};

	// render view
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
				{/* Pressable Icon for editing the task */}
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("Edit Task", {
							taskObj: taskObject,
						})
					}
				>
					<Feather
						name="edit-3"
						size={24}
						color="black"
						style={styles.editIcon}
					/>
				</TouchableOpacity>
			</View>
			{/* Rendering the task description view only if there's a task description given */}
			{description !== "" && (
				<Text style={styles.descriptionText}>
					<MaterialIcons name="description" size={20} color="black" />
					{description}
				</Text>
			)}
			{/* rendering view for Priority & due dates */}
			<View style={styles.itemContainer}>
				<Text style={styles.itemHeading}>Priority : </Text>
				<Text style={styles.itemText}>{priorityStatus}</Text>
			</View>
			<View style={styles.itemContainer}>
				<Text style={styles.itemHeading}>Due Date : </Text>
				<Text style={styles.itemText}>{dueDate}</Text>
			</View>
			<View style={styles.itemContainer}>
				<Text style={styles.itemHeading}>Start Date : </Text>
				<Text style={styles.itemText}>{startDate}</Text>
			</View>
			{/* Rendering the recurrenceStatus view only if there's a recurrencee frequency selected */}
			{recurrenceStatus !== "No" && (
				<View style={styles.itemContainer}>
					<Text style={styles.itemHeading}>Recurring : </Text>
					<Text style={styles.itemText}>{recurrenceStatus}</Text>
				</View>
			)}
			{/* Rendering a button for deleting tasks */}
			<CustomButton buttonText="Delete Task" onPress={handleDelete} />
		</View>
	);
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 100,
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
		marginVertical: 5,
		letterSpacing: 0.5,
	},
	descriptionText: {
		fontSize: 18,
		letterSpacing: 0.3,
		marginVertical: 10,
	},
	itemContainer: {
		flexDirection: "row",
		marginVertical: 5,
	},
	itemText: {
		fontSize: 16,
		letterSpacing: 0.3,
	},
	itemHeading: {
		fontSize: 18,
		letterSpacing: 0.3,
		fontWeight: "600",
		marginRight: 5,
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	editIcon: {
		paddingVertical: 10,
	},
});
