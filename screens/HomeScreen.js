/** Home page - The first screen of the task manager app UI is developed here. */

// Import libraries
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// Import components & functions from this project
import HeaderTabButton from "../components/HeaderTabButton";
import { allTask } from "../data/allTask";
import TaskView from "../components/TaskView";

// A component used in top link bar
// the repetative code for each link is turned into a function to increase readability & usability
const CustomLinkText = ({ title, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.linkText}>{title}</Text>
		</TouchableOpacity>
	);
};

// The main component for home screen
const HomeScreen = ({ navigation }) => {
	// Side effect on page load
	/** In this effect hook, A navigation related icon added in the header of the screen
	 * using expo vector icons & react native header buttons packages.
	 * This code runs only once during page load.
	 */
	useEffect(() => {
		// adding headerRight property in options of header
		navigation.setOptions({
			headerRight: () => {
				return (
					// Custom component is used to enhance usability & readability of code
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

	// Main UI renderer
	return (
		<View style={styles.container}>
			{/* Top link conatiner - still under development */}
			<View style={styles.topLinkContainer}>
				<CustomLinkText title="Home" />
				<CustomLinkText title="Upcoming" />
				<CustomLinkText title="Completed" />
			</View>
			{/* Scrollable view to render items from data array */}
			<ScrollView>
				{/* Iterating over the data array */}
				{allTask.map((item) => {
					return (
						// Custom component used to render the view of task
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
		backgroundColor: "lightgrey",
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
