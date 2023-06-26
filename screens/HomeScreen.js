import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
	return (
		<View>
			<Text>HomeScreen</Text>
			<TouchableOpacity onPress={() => navigation.navigate("NewTask")}>
				<Text>Add Task</Text>
			</TouchableOpacity>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
