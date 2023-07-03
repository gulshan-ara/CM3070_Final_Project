// import libraries
import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const CustomTextInput = ({ label, value, onChangeText }) => {
	// render view
	return (
		<View style={styles.container}>
			{/* Custom label for text input field */}
			<Text style={styles.label}>{label} :</Text>
			{/* Rendering the text input */}
			<TextInput
				style={styles.inputContainer}
				value={value} // sets the value of input field
				placeholder="Type here" // placeholder text to show initially
				onChangeText={onChangeText} // handles input change
			/>
		</View>
	);
};

export default CustomTextInput;

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
	inputContainer: {
		flex: 2.5,
		marginHorizontal: 5,
		paddingHorizontal: 8,
		alignItems: "center",
		borderBottomWidth: 1,
	},
});
