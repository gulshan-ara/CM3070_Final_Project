// Import libraries & packages
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ buttonText, onPress, isdisabled }) => {
	// deciding the background color based on activity of the button
	const bgColor = isdisabled && isdisabled === true ? "grey" : "dodgerblue";

	// render view
	return (
		// Here touchableOpacity makes the view pressable so that it can work as a button
		<TouchableOpacity
			style={{ ...styles.btnConatiner, backgroundColor: bgColor }}
			onPress={onPress}
			disabled={isdisabled}
		>
			{/* the title of the button */}
			<Text style={styles.btnText}>{buttonText}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	btnConatiner: {
		marginHorizontal: "30%",
		width: "40%",
		alignItems: "center",
		marginVertical: 20,
		backgroundColor: "dodgerblue",
		borderRadius: 20,
	},
	btnText: {
		paddingVertical: 8,
		fontSize: 18,
		color: "white",
		fontWeight: "800",
	},
});
