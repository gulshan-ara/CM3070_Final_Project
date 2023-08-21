// import packages and libraries
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import InputField from "../components/authComponents/InputField";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { registerNewUser } from "../utils/authHandler";
import { addNewUserToDB } from "../utils/databaseHelper";

// component for sign up screen
const SignUpForm = ({ navigation }) => {
	// state variables
	const [securedText, setSecuredText] = useState(false);
	const [iconName, setIconName] = useState("eye-off");
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmedPassword, setConfirmedPassword] = useState(null);
	const [userId, setUserId] = useState(null);

	// identifies if password should be visible or not
	const handleVisibilityChange = () => {
		setSecuredText(!securedText);
		if (securedText === false) {
			setIconName("eye");
		} else {
			setIconName("eye-off");
		}
	};

	// handles submit action
	const handleSubmit = async () => {
		if (
			name !== null &&
			email !== null &&
			password !== null &&
			password === confirmedPassword
		) {
			// stores the user id
			const userId = email.split("@")[0];
			// adds new user in database
			registerNewUser(email, password);
			// stores info about new user in db
			await addNewUserToDB(name, email, userId);
			// makes userId publicly accessible
			setUserId(userId);
			console.log("added user!!");
		} else {
			console.log("try again");
		}
	};

	// once user signs up, user Id is created & taken to next page
	useEffect(() => {
		if (userId !== null && userId !== undefined) {
			navigation.navigate("Home", {
				screen: "I-do",
				params: { userId: userId },
			});
		}
	}, [userId]);

	return (
		// the main view
		<ScrollView>
			{/* Title of screen */}
			<Text style={styles.headline}>Create a new account</Text>
			{/* Name field */}
			<InputField
				label="Name"
				placeholder="Enter your name here"
				onChangeText={(text) => setName(text)}
			/>
			{/* Email field */}
			<InputField
				label="Email"
				placeholder="Enter your email here"
				onChangeText={(text) => setEmail(text)}
			/>
			{/* password field */}
			<InputField
				label="Password"
				placeholder="Type password here"
				IconFamily={Feather}
				icon={iconName}
				securedText={securedText}
				onChange={handleVisibilityChange}
				onChangeText={(text) => setPassword(text)}
			/>
			{/* confirm password field */}
			<InputField
				label="Confirm Password"
				placeholder="Retype password here"
				securedText={true}
				onChangeText={(text) => setConfirmedPassword(text)}
			/>
			{/* submit button */}
			<CustomButton buttonText="Sign Up" onPress={handleSubmit} />
			{/* link to switch to sign in form */}
			<TouchableOpacity
				style={styles.linkContainer}
				onPress={() => navigation.navigate("Sign In")}
			>
				<Text style={styles.linkText}>Switch to Login</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default SignUpForm;

const styles = StyleSheet.create({
	headline: {
		fontSize: 25,
		letterSpacing: 0.3,
		fontFamily: "specialBold",
		margin: 10,
		paddingHorizontal: 10,
	},
	linkText: {
		fontSize: 16,
		color: "dodgerblue",
	},
	linkContainer: {
		alignItems: "center",
	},
});
