import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ buttonText, onPress, isdisabled }) => {
	const bgColor =
		isdisabled && isdisabled === true ? "grey" : "dodgerblue";
	return (
		<TouchableOpacity
			style={{ ...styles.btnConatiner, backgroundColor: bgColor }}
			onPress={onPress}
			disabled={isdisabled}
		>
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
