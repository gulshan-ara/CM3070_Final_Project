// This component allows to show tasks as group with a label
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TaskView from "./TaskView";
import { useNavigation } from "@react-navigation/native";

// Here task list & other ne
const GroupedTasks = ({
	label,
	taskList,
	setTaskData,
	setShowAlert,
	userId,
}) => {
	const navigation = useNavigation();
	return (
		<View>
			<Text style={styles.label}>{label}</Text>
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
		</View>
	);
};

export default GroupedTasks;

const styles = StyleSheet.create({
	label: {
		fontSize: 20,
		marginHorizontal: 10,
		paddingVertical: 2,
		paddingHorizontal: 15,
		letterSpacing: 0.3,
		fontWeight: "bold",
	},
});
