// Import libraries
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
// import functions & components from this project
import { taskColor } from "../utils/taskPriorityColor";

/** This component renders the view of a single task based on the parameters
 *  provided.
 */
const TaskView = (props) => {
	// deciding the task title color based on task priority status
	const taskNameColor = taskColor(props.priorityStatus);
	// deciding what text will be shown based on the current date
	const dueDate =
		new Date().toDateString() === props.dueDate ? "Today" : props.dueDate;

	// The main view renderer
	return (
		// Making the view pressable so that can navigate to task details screens
		<TouchableOpacity style={styles.container}>
			{/* Task title renderer with different colors for each task */}
			<Text style={{ ...styles.taskName, color: taskNameColor }}>
				{props.taskName}
			</Text>
			{/* Due date & recurring status renderer */}
			<View style={styles.subtitleContainer}>
				<Text style={styles.dueDate}>Due Date : {dueDate}</Text>
				{/* checking the presence of recurrence status & rendering on presence */}
				{props.recurrenceStatus && props.recurrenceStatus !== "No" && (
					// recurrence status view
					<View style={styles.statusContainer}>
						<Text style={styles.status}>R</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default TaskView;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		marginVertical: 5,
		backgroundColor: "white",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	taskName: {
		fontSize: 18,
		fontWeight: "bold",
		letterSpacing: 0.5,
	},
	subtitleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	dueDate: {
		fontSize: 16,
		letterSpacing: 0.4,
		fontWeight: "600",
	},
	statusContainer: {
		backgroundColor: "lightgrey",
		width: 25,
		height: 25,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
	},
	status: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
