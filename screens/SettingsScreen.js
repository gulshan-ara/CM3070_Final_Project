import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { updateHairNode } from "../utils/databaseHelper";
import { useSelector } from "react-redux";

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
	// fetch userId from redux store
	const userId = useSelector((state) => state.user.userId);
	const hairNode = useSelector((state) => state.user.hairObj);
	const [showHairRoutine, setShowHairRoutine] = useState(false);
	const [hideHairRoutine, setHideHairRoutine] = useState(false);
	const [createHairRoutine, setCreateHairRoutine] = useState(false);

	// hook to check if there's existing hair object ot not
	useEffect(() => {
		const showCreateHairRoutine = () => {
			if (hairNode === null) {
				setCreateHairRoutine(true);
			} else {
				setCreateHairRoutine(false);
			}
		};
		showCreateHairRoutine();
	}, [hairNode]);

	return (
		<View style={styles.container}>
			{/* Link to view account details */}
			<CustomLinkBar
				title="Account Info"
				onPress={() => {
					navigation.navigate("Account Info");
				}}
			/>
			{/* Link to questionnaire for generating hair care routine */}
			{createHairRoutine && hairNode === null && (
				<CustomLinkBar
					title="Create Hair Routine"
					onPress={() => {
						try {
							// rendering questionnaire screen
							navigation.navigate("Hair Quiz");
						} catch (error) {
							Alert.alert(error);
						} finally {
							setCreateHairRoutine(false);
						}
					}}
				/>
			)}
			{/* Link to handle visibility of hair care Routine */}
			{createHairRoutine === false &&
				// if initial values exist then show one link else another
				(showHairRoutine ? (
					<CustomLinkBar
						title="Show Hair Routine"
						onPress={async () => {
							try {
								// updating visibility in database
								await updateHairNode(userId, {
									...hairNode,
									isShown: true,
								});
								Alert.alert("Hair tasklist is visible now!");
								setShowHairRoutine(false);
								setHideHairRoutine(true);
							} catch (error) {
								Alert.alert(error);
							}
						}}
					/>
				) : (
					<CustomLinkBar
						title="Hide Hair Routine"
						onPress={async () => {
							try {
								// updating visibility in database
								await updateHairNode(userId, {
									...hairNode,
									isShown: false,
								});
								Alert.alert("Hair tasklist is hidden now!");
								setHideHairRoutine(false);
								setShowHairRoutine(true);
							} catch (error) {
								Alert.alert(error);
							}
						}}
					/>
				))}

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
