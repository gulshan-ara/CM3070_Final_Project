/** Here New task adding UI & logic is implemented. */

import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CustomDatePicker from "../components/CustomDatePicker";

const NewTask = () => {
	const [dueDate, setDueDate] = useState(new Date().toDateString());

	return (
		<View>
			<CustomDatePicker label="Due Date" placeHolder={dueDate} />
		</View>
	);
};

export default NewTask;

const styles = StyleSheet.create({
	datePickerStyle: {
		width: 200,
		marginTop: 20,
	},
});
