/** Here New task adding UI & logic is implemented. */

// import necessary libraries & packages
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

// import components & files
import CustomDatePicker from "../components/CustomDatePicker";

const NewTask = () => {
	// state variabless to handle value change
	const [startDate, setStartDate] = useState(new Date().toDateString());
	const [dueDate, setDueDate] = useState(new Date().toDateString());

	// render the screen 
	return (
		<View>
			{/* Custom date picker component used to store two dates */}
			<CustomDatePicker label="Due Date" placeHolder={dueDate} onDateChange={setDueDate}/>
			<CustomDatePicker label="Start Date" placeHolder={startDate} onDateChange={setStartDate}/>
		</View>
	);
};

export default NewTask;

const styles = StyleSheet.create({
});
