import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderTabButton from "../components/HeaderTabButton";

const CustomLinkText = ({title, onPress}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.linkText}>{title}</Text>
		</TouchableOpacity>
	);
};

const HomeScreen = ({ navigation }) => {
	// useEffect(() => {
	// 	navigation.setOptions({
	// 		headerRight: () => {
	// 			return (
	// 				<HeaderButtons HeaderButtonComponent={HeaderTabButton}>
	// 					<Item
	// 						title="New Task"
	// 						iconName="new-message"
	// 						onPress={() => navigation.navigate("New Task")}
	// 					/>
	// 				</HeaderButtons>
	// 			);
	// 		},
	// 	});
	// }, []);

	return (
		<View>
			<View style={styles.topLinkContainer}>
				<CustomLinkText title="Home"/>
				<CustomLinkText title="Upcoming"/>
				<CustomLinkText title="Completed"/>
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	topLinkContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 10,
		backgroundColor: 'lightgrey',
		paddingVertical: 10
	},
	linkText: {
		fontSize: 18,
		fontWeight: "700"
	}
});
