// Import libraries & packages
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ buttonText, onPress, isdisabled, buttonStyle }) => {
	// deciding the background color based on activity of the button
	const bgColor =
		isdisabled && isdisabled === true
			? "rgba(128, 128, 128, 0.5)"
			: "rgba(255,127,80, 0.9)";

	// render view
	return (
		// Here touchableOpacity makes the view pressable so that it can work as a button
		<TouchableOpacity
			style={{
				...styles.btnConatiner,
				backgroundColor: bgColor,
				...buttonStyle,
			}}
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
		borderRadius: 20,
	},
	btnText: {
		paddingVertical: 8,
		fontSize: 18,
		color: "white",
		fontWeight: "800",
	},
});
