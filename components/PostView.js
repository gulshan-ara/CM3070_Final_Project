// Import libraries & packages
import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

// Main view renderer
const PostView = ({ postText, date }) => {

	//  here post text & post creation date is passed as prop
	return (
		// the main container 
		<View style={styles.container}>
			{/* Container for profile picture & post text */}
			<View style={styles.postContent}>
				{/* rendring the profile picture */}
				<View style={styles.imgContainer}>
					<Image
						source={require("../assets/user.jpg")}
						style={{ width: 30, height: 30, borderRadius: 15 }}
					/>
				</View>
				{/* rendering the post text */}
				<Text style={styles.postText}>{postText}</Text>
			</View>
			{/* rendering the post creation date */}
			<Text style={{ textAlign: "right", color: "grey" }}>{date}</Text>
		</View>
	);
};

export default PostView;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		marginVertical: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
    backgroundColor: "floralwhite"
	},
	postContent: {
		flexDirection: "row",
	},
	imgContainer: {
		marginHorizontal: 5,
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
	postText: {
		fontSize: 16,
		fontWeight: "600",
		letterSpacing: 0.3,
    width: 250
	},
});
