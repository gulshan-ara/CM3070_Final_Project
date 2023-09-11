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
		// Scrollview to render post list
		<ScrollView>
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
	);
};

export default FriendsPostScreen;

const styles = StyleSheet.create({});
