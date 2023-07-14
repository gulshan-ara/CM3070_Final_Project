import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const PostView = ({ postText, date }) => {
	return (
		<View style={styles.container}>
			<View style={styles.postContent}>
				<View style={styles.imgContainer}>
					<Image
						source={require("../assets/favicon.png")}
						style={{ width: 30, height: 30, borderRadius: 15 }}
					/>
				</View>
				<Text style={styles.postText}>{postText}</Text>
			</View>
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
