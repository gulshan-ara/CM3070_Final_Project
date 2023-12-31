// Import libraries
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
// import functions & components from this project

/** This component renders the view of a single task based on the parameters
 *  provided.
 */
const TaskView = (props) => {
	// deciding what text will be shown based on the current date
	const dueDate =
		new Date().toDateString() === props.dueDate ? "Today" : props.dueDate;

	// The main view renderer
	return (
		// Making the view pressable so that can navigate to task details screens
		<TouchableOpacity
			style={{ ...styles.container}}
			onPress={props.onPress}
			onLongPress={props.onLongPress}
			accessible={true} 
			accessibilityLabel="This is a task view"
		>
			{/* Task title renderer with different colors for each task */}
			<Text style={{ ...styles.taskName }}>{props.taskName}</Text>
			<Text style={{ ...styles.dueDate }}>Priority : {props.priorityStatus}</Text>
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
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: 'rgba(255, 228, 181, 0.7)'
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
