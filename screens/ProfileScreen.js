import {
	Alert,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import PostView from "../components/PostView";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderTabButton from "../components/HeaderTabButton";
import { FontAwesome5 } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { addNewPostForUser } from "../utils/databaseHelper";
import { useSelector } from "react-redux";

//  Component to render profile screen
const ProfileScreen = ({ navigation }) => {
	// state variables
	const [postText, setPostText] = useState("");
	// fetching current user Id from redux state
	const userId = useSelector((state) => state.user.userId);

	// adding post to databasse
	const handlePostSubmission = async () => {
		// creating an unique post id
		const postId = uuid.v4();
		// post content and post creation date
		const postData = {
			postContent: postText,
			postCreationDate: new Date().toDateString(),
		};

		// adding post to database
		await addNewPostForUser(userId, postId, postData);
	};

	// icon to navigate to another screens
	useEffect(() => {
		// adding headerRight property in options of header
		navigation.setOptions({
			headerRight: () => {
				return (
					// Custom component is used to enhance usability & readability of code
					<HeaderButtons HeaderButtonComponent={HeaderTabButton}>
						<Item
							title="Friends"
							iconName="user-friends"
							IconComponent={FontAwesome5}
						/>
					</HeaderButtons>
				);
			},
		});
	}, []);

	// Main UI to render in profile screen
	return (
		<View style={styles.container}>
			{/* user info view */}
			<View style={styles.profileInfo}>
				<View style={styles.imgContainer}>
					<Image
						source={require("../assets/user.jpg")}
						style={{ width: 80, height: 80, borderRadius: 40 }}
					/>
				</View>
				<View style={styles.nameContainer}>
					<Text style={styles.nameText}>Gulshan Ara</Text>
					<Text style={styles.aboutText} numberOfLines={3}>
						This section is to show some info
					</Text>
				</View>
			</View>

			{/* Existings posts view */}
			<ScrollView style={{ flex: 1, marginTop: 5 }}>
				<PostView
					postText="This is my First post, I am checking how looks like on screen???"
					date="Thu 23-06-23"
				/>
				<PostView
					postText="This is my Second post"
					date="Thu 23-06-23"
				/>
				<PostView
					postText="I'm proud to share that I completed task X!!!"
					date="Thu 23-06-23"
				/>
				<PostView
					postText="Feeling happy to complete 20 tasks in 3 days!!"
					date="Thu 23-06-23"
				/>
				<PostView
					postText="Feeling happy to complete 20 tasks in 3 days!!"
					date="Thu 23-06-23"
				/>
				<PostView
					postText="Feeling happy to complete 20 tasks in 3 days!!"
					date="Thu 23-06-23"
				/>
			</ScrollView>

			{/* post creation view */}
			<View style={styles.inputContainer}>
				{/* upload image icon */}
				<TouchableOpacity>
					<Feather
						name="plus"
						size={24}
						color="rgba(255,127,80, 0.9)"
					/>
				</TouchableOpacity>
				{/* Type post content */}
				<TextInput
					style={styles.textBox}
					placeholder="Add new post"
					multiline
					value={postText}
					onChangeText={(txt) => setPostText(txt)}
				/>
				{/* Adding the post in database by pressing post button */}
				<TouchableOpacity
					style={styles.postBtn}
					onPress={() => {
						if (postText !== "") {
							handlePostSubmission();
							setPostText("");
						} else {
							Alert.alert("Add some text to post!");
						}
					}}
				>
					<Text style={styles.postText}>Post</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "beige",
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	inputContainer: {
		flexDirection: "row",
		paddingHorizontal: 8,
		paddingVertical: 10,
		height: 50,
		backgroundColor: "rgba(255, 228, 181, 0.7)",
	},
	textBox: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 50,
		borderColor: "black",
		marginHorizontal: 15,
		paddingHorizontal: 12,
	},
	postBtn: {
		marginHorizontal: 2,
		paddingHorizontal: 5,
	},
	postText: {
		color: "rgba(255,127,80, 0.9)",
		fontSize: 18,
		fontWeight: "bold",
		letterSpacing: 0.3,
	},
	profileInfo: {
		backgroundColor: "rgba(255, 228, 181, 0.6)",
		flexDirection: "row",
	},
	imgContainer: {
		margin: 10,
		padding: 10,
	},
	nameContainer: {
		marginHorizontal: 10,
		paddingHorizontal: 5,
		marginVertical: 25,
	},
	nameText: {
		fontSize: 24,
		fontWeight: "bold",
		letterSpacing: 0.3,
	},
	aboutText: {
		fontSize: 17,
		fontWeight: "600",
		letterSpacing: 0.3,
		width: 200,
	},
});
