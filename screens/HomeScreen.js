import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { startTransition, useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderTabButton from "../components/HeaderTabButton";
import { allTask } from "../data/allTask";
import TaskView from "../components/TaskView";

const CustomLinkText = ({ title, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.linkText}>{title}</Text>
		</TouchableOpacity>
	);
};

const HomeScreen = ({ navigation }) => {
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<HeaderButtons HeaderButtonComponent={HeaderTabButton}>
						<Item
							title="New Task"
							iconName="new-message"
							onPress={() => navigation.navigate("New Task")}
						/>
					</HeaderButtons>
				);
			},
		});
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.topLinkContainer}>
				<CustomLinkText title="Home" />
				<CustomLinkText title="Upcoming" />
				<CustomLinkText title="Completed" />
			</View>
			<ScrollView>
				{allTask.map((item) => {
					return (
						<TaskView
							key={item.taskName}
							taskName={item.taskName}
							dueDate={item.dueDate}
							priorityStatus={item.priorityStatus}
							recurrenceStatus={item.recurrenceStatus}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "lightgrey"
	},
	topLinkContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		margin: 10,
		backgroundColor: "white",
		paddingVertical: 10,
	},
	linkText: {
		fontSize: 20,
		fontWeight: "700",
	},
});
