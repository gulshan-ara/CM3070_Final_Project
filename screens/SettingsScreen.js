import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// reusable component to show page links
const CustomLinkBar = ({ title, onPress }) => {
	return (
		<TouchableOpacity style={styles.linkContainer} onPress={onPress}>
			<Text style={styles.linkText}>{title}</Text>
		</TouchableOpacity>
	);
};

// main component showing all links
const SettingsScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<CustomLinkBar
				title="Account Info"
				onPress={() => {
					navigation.navigate("Account Info");
				}}
			/>
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
