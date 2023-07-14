import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { Feather } from "@expo/vector-icons";
import PostView from "../components/PostView";

const ProfileScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.profileInfo}>
				<View style={styles.imgContainer}>
					<Image
						source={require("../assets/favicon.png")}
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

			<ScrollView style={{ flex: 1, marginTop: 5 }}>
				<PostView
					postText="This is my First post, I want to check how long it goes & looks like??? ehe ehehehheeee"
					date="Thu 23-06-23"
				/>
				<PostView
					postText="This is my First post"
					date="Thu 23-06-23"
				/>
        <PostView
					postText="This is my First post, I want to check how long it goes & looks like??? ehe ehehehheeee"
					date="Thu 23-06-23"
				/>
				<PostView
					postText="This is my First post"
					date="Thu 23-06-23"
				/>
        <PostView
					postText="This is my First post, I want to check how long it goes & looks like??? ehe ehehehheeee"
					date="Thu 23-06-23"
				/>
				<PostView
					postText="This is my First post"
					date="Thu 23-06-23"
				/>
			</ScrollView>

			<View style={styles.inputContainer}>
				<TouchableOpacity>
					<Feather
						name="plus"
						size={24}
						color="rgba(255,127,80, 0.9)"
					/>
				</TouchableOpacity>
				<TextInput style={styles.textBox} placeholder="Add new post" />
				<TouchableOpacity style={styles.postBtn}>
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
