/** This screen shows the other users list of i-do */
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

// main component
const UserListScreen = ({ navigation }) => {
	// fetching all users list from redux store
	const users = useSelector((state) => state.user.allUsers);

	// render UI
	return (
		//  scroll view to see all users name
		<ScrollView style={styles.container}>
			{/* iterating over the list */}
			{users.map((item) => {
				// returning a touchable name bar
				return (
					<TouchableOpacity
						key={item.userName}
						style={styles.nameContainer}
						//  can navigate to next screen on press
						onPress={() => {
							navigation.navigate("Post Screen", {
								userName: item.userName,
								userId: item.fetchedUserId,
							});
						}}
					>
						{/* user icon  */}
						<AntDesign name="user" size={30} color="black" />
						{/* other user's name */}
						<Text style={styles.nameText}>{item.userName}</Text>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
};

export default UserListScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "beige",
	},
	nameContainer: {
		marginHorizontal: 10,
		marginVertical: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		backgroundColor: "rgba(255, 228, 181, 0.7)",
		flexDirection: "row",
	},
	nameText: {
		fontSize: 18,
		fontWeight: "bold",
		letterSpacing: 0.5,
		flex: 1,
		marginHorizontal: 10,
	},
});
