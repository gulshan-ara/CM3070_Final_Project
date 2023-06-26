/** Here New task adding UI & logic is implemented. */

// import necessary libraries & packages
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

// import components & files
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTextInput from "../components/CustomTextInput";

const NewTask = () => {
	// state variabless to handle value change
	const [taskName, setTaskName] = useState("");
	const [taskDetails, setTaskDetails] = useState("");
	const [startDate, setStartDate] = useState(new Date().toDateString());
	const [dueDate, setDueDate] = useState(new Date().toDateString());

	// render the screen
	return (
		<View>
			{/* Input field to recieve task name */}
			<CustomTextInput
				label="Task Name"
				value={taskName}
				onChangeText={(text) => setTaskName(text)}
			/>
			{/* Input field to recieve task details */}
			<CustomTextInput
				label="Task Details"
				value={taskDetails}
				multiline={true}    // allowed multiline inputs
				onChangeText={(text) => setTaskDetails(text)}
			/>
			{/* Custom date picker component used to render & store start date */}
			<CustomDatePicker
				label="Start Date"
				placeHolder={startDate}
				onDateChange={setStartDate}
			/>
			{/* Custom date picker component used to render & store due date */}
			<CustomDatePicker
				label="Due Date"
				placeHolder={dueDate}
				onDateChange={setDueDate}
			/>
		</View>
	);
};

export default NewTask;

const styles = StyleSheet.create({});
