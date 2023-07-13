/** This component is used for rendering date picker.
 * Here the label prop handles the label of date picker
 * The pressable TextInput field handles the visibility of date picker.
 */

// import libraries and packages
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import DatePicker from "@react-native-community/datetimepicker";

const CustomDatePicker = ({ label, placeHolder, onDateChange }) => {
	// handles the visibility of date Picker
	const [showPicker, setShowPicker] = useState(false);
	// handle date state
	const [date, setDate] = useState(placeHolder);

	// function to handle date change
	const onChangeDate = ({ type }, pickedDate) => {
		// if date is set (Ok button is pressed)
		if (type === "set") {
			const currentDate = pickedDate;
			// converting date object into string value and storing in state
			setDate(currentDate.toDateString());
			// updating the given state value to use later
			onDateChange(currentDate.toDateString());
			// hiding date picker
			setShowPicker(false);
		} else {
			setShowPicker(!showPicker);
		}
	};

	// rendering the view
	return (
		<>
			{/* Render the date picker input box with label */}
			<View style={styles.container}>
				{/* customisable label for datePicker */}
				<Text style={styles.label}>{label} :</Text>
				{/* TouchableOpacity is used for handling the visibility of datePicker */}
				<TouchableOpacity
					style={styles.dateContainer}
					onPress={() => setShowPicker(true)}
				>
					{/* Text field to show the date */}
					<Text style={styles.dateText}>{date}</Text>
				</TouchableOpacity>
			</View>

			{/* Render the date picker on condition */}
			{showPicker && (
				<DatePicker
					mode="date" // mode defines the picker type(eg: date/time)
					display="calender" // picker view is defined by display prop
					value={new Date()} // value is required & recieves a date object to show on initial render
					onChange={onChangeDate} // handles the date change
				/>
			)}
		</>
	);
};

export default CustomDatePicker;

const styles = StyleSheet.create({
	container: {
		marginVertical: 5,
		marginHorizontal: 10,
		flexDirection: "row",
	},
	label: {
		fontWeight: "bold",
		fontSize: 18,
		margin: 5,
		paddingHorizontal: 5,
		flex: 1.5,
	},
	dateContainer: {
		backgroundColor: "rgba(255, 250, 205, 0.7)",
		flex: 2.5,
		marginHorizontal: 5,
		padding: 8,
		// alignItems: "center",
		borderBottomWidth: 1
	},
	dateText: {
		fontSize: 16,
		letterSpacing: 0.5,
	},
});
