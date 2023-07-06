import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { taskColor } from "../utils/taskPriorityColor";

const TaskView = (props) => {
	const taskNameColor = taskColor(props.priorityStatus);
  const dueDate = new Date().toDateString() === props.dueDate ? "Today" : props.dueDate;

	return (
		<TouchableOpacity style={styles.container}>
			<Text style={{ ...styles.taskName, color: taskNameColor }}>
				{props.taskName}
			</Text>
			<View style={styles.subtitleContainer}>
				<Text style={styles.dueDate}>Due Date : {dueDate}</Text>
				{props.recurrenceStatus && props.recurrenceStatus !== "No" && (
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
    backgroundColor: 'lightgrey',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  },
  status: {
    fontSize: 18, 
    fontWeight: "bold"
  }
});
