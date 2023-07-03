import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TaskDetailsScreen = ({ route }) => {
  const task = route.params;
	return (
		<View>
			<Text>TaskDetailsScreen</Text>
      <Text>{task.taskName}</Text>
		</View>
	);
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({});
