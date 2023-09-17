/** This screen renders the posts of selected friend */
import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getPostList } from "../utils/databaseHelper";
import PostView from "../components/PostView";
import uuid from "react-native-uuid";

// main component
const FriendsPostScreen = ({ route, navigation }) => {
	// fetching name and user id from route
	const name = route.params.userName;
	const id = route.params.userId;
	const [postList, setPostList] = useState([]);

	// hook to fetch post list of selected user on loading
	useEffect(() => {
		const fetchPostListofUser = async () => {
			const list = await getPostList(id);
			setPostList(list);
		};

		fetchPostListofUser();
	}, []);

	// hook to set page heading as the name of selected user on loading
	useEffect(() => {
		navigation.setOptions({
			title: name,
		});
	}, []);

	// render UI
	return (
		<>
			{/* sorry text when no post is available to render */}
			{postList === null && (
				<View style={styles.textContainer}>
					<Text style={styles.noPostText}>
						{name.split(" ")[0]} has no post yet😢
					</Text>
				</View>
			)}
			{/* Scrollview to render post list */}
			{postList !== null && (
				<ScrollView style={{backgroundColor: "beige"}}>
					{/* iterating over post list */}
					{Object.values(postList).map((item) => {
						return (
							<PostView
								key={uuid.v4()}
								postText={item.postContent}
								date={item.postCreationDate}
							/>
						);
					})}
				</ScrollView>
			)}
		</>
	);
};

export default FriendsPostScreen;

const styles = StyleSheet.create({
	textContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "beige"
	},
	noPostText: {
		fontSize: 18,
		fontWeight: "bold",
		letterSpacing: 0.3,
	},
});
