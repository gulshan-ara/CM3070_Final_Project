/** Here New task adding UI & logic is implemented. */

// import necessary libraries & packages
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

// import components & files
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTextInput from "../components/CustomTextInput";
import CustomModal from "../components/CustomModal";

const NewTask = () => {
	// state variabless to handle value change
	const [taskName, setTaskName] = useState("");
	const [taskDetails, setTaskDetails] = useState("");
	const [startDate, setStartDate] = useState(new Date().toDateString());
	const [dueDate, setDueDate] = useState(new Date().toDateString());
	const [showPriorityModal, setShowPriorityModal] = useState(false);
	const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);
	const [priorityStatus, setPriorityStatus] = useState("High");
	const [recurrenceStatus, setRecurrenceStatus] = useState("Everyday");

	const priorityStatusList = [
		{ text: "High" },
		{ text: "Low" },
		{ text: "Normal" },
		{ text: "Special" },
	];

	const recurrenceStatusList = [
		{ text: "Everyday" },
		{ text: "Every Week" },
		{ text: "Every Month" },
		{ text: "Every Year" },
	];

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
				multiline={true} // allowed multiline inputs
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
			<TouchableOpacity onPress={() => setShowPriorityModal(true)}>
				<Text>{priorityStatus}</Text>
			</TouchableOpacity>
			<CustomModal
				title="Choose Priority"
				confirmText="Set Priority"
				showAlert={showPriorityModal}
				closeAlert={setShowPriorityModal}
				optionData={priorityStatusList}
				value="High"
				onChange={setPriorityStatus}
			/>
			<TouchableOpacity onPress={() => setShowRecurrenceModal(true)}>
				<Text>{recurrenceStatus}</Text>
			</TouchableOpacity>
			<CustomModal
				title="Recurrence Frequency"
				confirmText="Set Recurrence"
				showAlert={showRecurrenceModal}
				closeAlert={setShowRecurrenceModal}
				optionData={recurrenceStatusList}
				value="Everyday"
				onChange={setRecurrenceStatus}
			/>
		</View>
	);
};

export default NewTask;

const styles = StyleSheet.create({});
