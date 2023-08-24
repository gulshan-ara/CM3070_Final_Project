// import libraries and packages
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

// import components from this project
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTextInput from "../components/CustomTextInput";
import CustomModal from "../components/CustomModal";
import CustomButton from "../components/CustomButton";
import { editTask } from "../utils/databaseHelper";
import CustomAlert from "../components/CustomAlert";

const EditTaskScreen = ({ navigation, route }) => {
	// retreiving data passed via navigation
	const initialValues = route.params.taskObj;
	const userId = initialValues.userId;
	const [showAlert, setShowAlert] = useState(false);
	// setting the initial value of variables
	const [taskName, setTaskName] = useState(initialValues.taskName);
	const [taskDetails, setTaskDetails] = useState(initialValues.taskDetails);
	const [startDate, setStartDate] = useState(initialValues.startDate);
	const [dueDate, setDueDate] = useState(initialValues.dueDate);
	const [showPriorityModal, setShowPriorityModal] = useState(false);
	const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);
	const [priorityStatus, setPriorityStatus] = useState(
		initialValues.priorityStatus
	);
	const [recurrenceStatus, setRecurrenceStatus] = useState(
		initialValues.recurrenceStatus
	);

	const priorityStatusList = [
		{ text: "High" },
		{ text: "Low" },
		{ text: "Normal" },
		{ text: "Special" },
	];

	const recurrenceStatusList = [
		{ text: "No" },
		{ text: "Everyday" },
		{ text: "Every Week" },
		{ text: "Every Month" },
		{ text: "Every Year" },
	];

	const handleEdit = async () => {
		editTask(userId, initialValues.taskId, {
			taskId: initialValues.taskId,
			taskName,
			priorityStatus,
			dueDate,
			startDate,
			taskDetails,
			recurrenceStatus,
		});
	};

	// checking if there's any changes happened to enable the edit button
	const hasChanges = () => {
		return (
			initialValues.taskName != taskName ||
			initialValues.taskDetails != taskDetails ||
			initialValues.startDate != startDate ||
			initialValues.dueDate != dueDate ||
			initialValues.priorityStatus != priorityStatus ||
			initialValues.recurrenceStatus != recurrenceStatus
		);
	};

	return (
		<View style={styles.container}>
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
				onChangeText={(text) => setTaskDetails(text)}
			/>

			{/* View to set priority status of a task. OnPressing the text, it'll render a modal */}
			<View style={styles.itemConatiner}>
				<Text style={styles.itemLabel}>Priority : </Text>
				<TouchableOpacity
					onPress={() => setShowPriorityModal(true)}
					style={styles.itemBackground}
				>
					<Text style={{ fontSize: 16 }}>
						{priorityStatus} Priority
					</Text>
				</TouchableOpacity>
			</View>

			{/* Custom modal renderer */}
			<CustomModal
				title="Choose Priority"
				confirmText="Set Priority"
				showAlert={showPriorityModal}
				closeAlert={setShowPriorityModal}
				optionData={priorityStatusList}
				value={priorityStatus}
				onChange={setPriorityStatus}
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

			{/* View to set reccurring frequency of a task. OnPressing the text, it'll render a modal */}
			<View style={styles.itemConatiner}>
				<Text style={styles.itemLabel}>Recurring : </Text>
				<TouchableOpacity
					onPress={() => setShowRecurrenceModal(true)}
					style={styles.itemBackground}
				>
					<Text style={{ fontSize: 16 }}>{recurrenceStatus}</Text>
				</TouchableOpacity>
			</View>

			{/* Custom modal renderer */}
			<CustomModal
				title="Recurrence Frequency"
				confirmText="Set Recurrence"
				showAlert={showRecurrenceModal}
				closeAlert={setShowRecurrenceModal}
				optionData={recurrenceStatusList}
				value={recurrenceStatus}
				onChange={setRecurrenceStatus}
			/>

			{/* render the edit buttton only if there's changes in values from initial values */}
			{hasChanges() && (
				<CustomButton
					buttonText="Edit task"
					onPress={() => {
						setShowAlert(true);
					}}
				/>
			)}

			<CustomAlert
				isVisible={showAlert}
				alertTitle="Confirm Edit?"
				confirmText="Edit task"
				cancel={setShowAlert}
				confirm={async () => {
					handleEdit();
					navigation.navigate("Task Details", {
						taskName: taskName,
						taskDetails: taskDetails,
						priorityStatus: priorityStatus,
						startDate: startDate,
						dueDate: dueDate,
						recurrenceStatus: recurrenceStatus,
						userId: userId,
					});
				}}
			/>
		</View>
	);
};

export default EditTaskScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "beige",
		height: "100%",
	},
	itemConatiner: {
		flexDirection: "row",
		margin: 10,
	},
	itemLabel: {
		fontWeight: "bold",
		fontSize: 18,
		marginHorizontal: 5,
		paddingHorizontal: 5,
		flex: 1.5,
	},
	itemBackground: {
		flex: 2.5,
		marginHorizontal: 5,
		paddingHorizontal: 8,
		alignItems: "flex-start",
		borderBottomWidth: 1,
	},
});
