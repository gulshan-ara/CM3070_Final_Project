import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

const TaskDetailsScreen = ({ route }) => {
	const taskObject = route.params;
	const title = taskObject.taskName;
	const description = taskObject.taskDetails;
	const startDate = taskObject.startDate;
	const dueDate = taskObject.dueDate;
	const priorityStatus = taskObject.priorityStatus;
	const recurrenceStatus = taskObject.recurrenceStatus;

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
				<TouchableOpacity>
					<MaterialCommunityIcons
						name="file-edit-outline"
						size={24}
						color="black"
						style={styles.editIcon}
					/>
				</TouchableOpacity>
			</View>
			{description !== "" && (
				<Text style={styles.descriptionText}>
					<MaterialIcons name="description" size={20} color="black" />
					{description}
				</Text>
			)}
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
			{recurrenceStatus !== "No" && (
				<View style={styles.itemContainer}>
					<Text style={styles.itemHeading}>Recurring : </Text>
					<Text style={styles.itemText}>{recurrenceStatus}</Text>
				</View>
			)}

			<CustomButton buttonText="Delete Task" />
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
