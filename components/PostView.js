// Import libraries & packages
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

// Main view renderer
const PostView = ({
	postText,
	date,
	onPressDelete,
	onPressEdit,
	isEditable,
}) => {
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
			{/* rendering the post creation date with editing icons when view is editable*/}
			{isEditable === true && (
				<View style={styles.subtitleContainer}>
					{/* delete icon */}
					<TouchableOpacity
						style={{ flex: 1 }}
						onPress={onPressDelete}
					>
						<AntDesign name="delete" size={24} color="black" />
					</TouchableOpacity>
					{/* edit icon */}
					<TouchableOpacity style={{ flex: 1 }} onPress={onPressEdit}>
						<AntDesign name="edit" size={24} color="black" />
					</TouchableOpacity>
          {/* post creation date */}
					<Text
						style={{ textAlign: "right", color: "grey", flex: 5 }}
					>
						{date}
					</Text>
				</View>
			)}

			{/* rendering the post creation date when view is non editable */}
			{isEditable !== true && (
				<Text style={{ textAlign: "right", color: "grey" }}>
					{date}
				</Text>
			)}
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
		backgroundColor: "floralwhite",
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
		width: 250,
	},
	subtitleContainer: {
		flexDirection: "row",
		marginTop: 15,
	},
});
