import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";

const CustomLinkBar = ({ title }) => {
	return (
		<TouchableOpacity style={styles.linkContainer}>
			<Text style={styles.linkText}>{title}</Text>
		</TouchableOpacity>
	);
};

const SettingsScreen = () => {
	return (
		<View style={styles.container}>
			<CustomLinkBar title="Account Settings" />
			<CustomLinkBar title="Create Hair Routine" />
			<CustomLinkBar title="Recycle Bin" />
			<CustomLinkBar title="Switch Theme" />
			<CustomLinkBar title="Help" />
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "beige",
		height: "100%",
		paddingHorizontal: 5,
	},
	linkContainer: {
		marginHorizontal: 10,
		marginVertical: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: "rgba(255, 228, 181, 0.7)",
	},
	linkText: {
		fontSize: 16,
		fontWeight: "bold",
		letterSpacing: 0.3,
	},
});
