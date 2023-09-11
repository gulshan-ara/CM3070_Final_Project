import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";

const SearchScreen = () => {
	const users = useSelector(state => state.user.allUsers);
	console.log(users);
	return (
		<View>
			<CustomButton buttonText="Yet to Develop" />
		</View>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({});
